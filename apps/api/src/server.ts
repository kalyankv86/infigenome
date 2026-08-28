import './env.js';
import Fastify from 'fastify';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import {Pool} from 'pg';
import {z} from 'zod';

const app=Fastify({logger:true,trustProxy:true});
const pool=new Pool({connectionString:process.env.DATABASE_URL});

const origins=(process.env.CORS_ORIGINS||'http://localhost:3000').split(',').map(s=>s.trim());
await app.register(helmet,{contentSecurityPolicy:false});
await app.register(cors,{origin:origins,methods:['GET','POST']});
await app.register(rateLimit,{max:100,timeWindow:'1 minute'});

app.get('/health',async(_req,reply)=>{
  try{await pool.query('SELECT 1');return {status:'ok',service:'infigenome-api',db:'up'};}
  catch{return reply.code(503).send({status:'degraded',service:'infigenome-api',db:'down'});}
});

const Lead=z.object({
  name:z.string().min(2).max(100),
  email:z.string().email().max(200),
  message:z.string().min(5).max(5000)
});

app.post('/api/leads',{config:{rateLimit:{max:10,timeWindow:'1 minute'}}},async(req,reply)=>{
  const parsed=Lead.safeParse(req.body);
  if(!parsed.success)return reply.code(400).send({error:'Invalid request'});
  const {name,email,message}=parsed.data;
  try{
    await pool.query(
      'INSERT INTO leads (name,email,message,source,ip,user_agent) VALUES ($1,$2,$3,$4,$5,$6)',
      [name,email,message,'website',req.ip,req.headers['user-agent']??null]
    );
  }catch(err){
    app.log.error(err,'failed to persist lead');
    return reply.code(500).send({error:'Internal server error'});
  }
  app.log.info({emailDomain:email.split('@')[1]},'lead received');
  return reply.code(202).send({ok:true,message:'Enquiry received'});
});

app.setErrorHandler(async(_err,_req,reply)=>reply.code(500).send({error:'Internal server error'}));

const close=async()=>{await app.close();await pool.end();process.exit(0);};
process.on('SIGTERM',close);
process.on('SIGINT',close);

app.listen({port:Number(process.env.PORT||4000),host:'0.0.0.0'}).catch(err=>{app.log.error(err);process.exit(1);});
