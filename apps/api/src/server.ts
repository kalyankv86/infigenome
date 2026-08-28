import './env.js';
import Fastify from 'fastify';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import mysql from 'mysql2/promise';
import {z} from 'zod';

const app=Fastify({logger:true,trustProxy:true});
const PORT=Number(process.env.PORT||4000);
const HOST=process.env.HOST||'127.0.0.1';

const db=mysql.createPool({
  host:process.env.DATABASE_HOST||'127.0.0.1',
  port:Number(process.env.DATABASE_PORT||3306),
  user:process.env.DATABASE_USER,
  password:process.env.DATABASE_PASSWORD,
  database:process.env.DATABASE_NAME,
  waitForConnections:true,
  connectionLimit:10,
  queueLimit:0,
  charset:'utf8mb4'
});

const origins=(process.env.CORS_ORIGINS||'http://localhost:3000').split(',').map(s=>s.trim());
await app.register(helmet,{contentSecurityPolicy:false});
await app.register(cors,{origin:origins,methods:['GET','POST']});
await app.register(rateLimit,{max:100,timeWindow:'1 minute'});

const Lead=z.object({
  name:z.string().trim().min(2).max(100),
  email:z.string().trim().email().max(200),
  message:z.string().trim().min(5).max(5000)
});

app.get('/health',async(_req,reply)=>{
  try{
    await db.query('SELECT 1');
    return reply.send({status:'ok',service:'infigenome-api',database:'ok'});
  }catch(err){
    app.log.error(err,'Database health check failed');
    return reply.code(503).send({status:'error',service:'infigenome-api',database:'unavailable'});
  }
});

app.post('/api/leads',{config:{rateLimit:{max:10,timeWindow:'1 minute'}}},async(req,reply)=>{
  const parsed=Lead.safeParse(req.body);
  if(!parsed.success)return reply.code(400).send({error:'Invalid request'});
  const {name,email,message}=parsed.data;
  const ipAddress=req.ip||req.headers['x-forwarded-for']?.toString().split(',')[0].trim()||null;
  const userAgent=req.headers['user-agent']?.substring(0,500)||null;
  try{
    const [result]=await db.execute(
      'INSERT INTO leads (name, email, message, ip_address, user_agent) VALUES (?, ?, ?, ?, ?)',
      [name,email,message,ipAddress,userAgent]
    );
    app.log.info({leadId:(result as mysql.ResultSetHeader).insertId,emailDomain:email.split('@')[1]},'Lead received');
    return reply.code(202).send({ok:true,message:'Enquiry received'});
  }catch(err){
    app.log.error(err,'Failed to save lead');
    return reply.code(500).send({error:'Unable to process enquiry'});
  }
});

app.setErrorHandler(async(err,_req,reply)=>{app.log.error(err);return reply.code(500).send({error:'Internal server error'});});

const shutdown=async()=>{app.log.info('Shutting down');await app.close();await db.end();process.exit(0);};
process.on('SIGTERM',shutdown);
process.on('SIGINT',shutdown);

try{
  await app.listen({port:PORT,host:HOST});
}catch(err){
  app.log.error(err);
  await db.end();
  process.exit(1);
}
