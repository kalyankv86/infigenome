'use client';
import {useState} from 'react';

// Empty in production -> same-origin request to /api/leads (nginx proxies it).
// Set NEXT_PUBLIC_API_URL for local dev where the API is on another port.
const API=process.env.NEXT_PUBLIC_API_URL||'';
type Status={kind:'idle'|'sending'|'ok'|'error';message?:string};

export default function ContactForm(){
  const [status,setStatus]=useState<Status>({kind:'idle'});
  async function onSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const form=e.currentTarget;
    const data=new FormData(form);
    setStatus({kind:'sending'});
    try{
      const res=await fetch(`${API}/api/leads`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          name:data.get('name'),
          email:data.get('email'),
          message:data.get('message')
        })
      });
      if(!res.ok)throw new Error('bad status');
      form.reset();
      setStatus({kind:'ok',message:'Thanks — your enquiry has been received.'});
    }catch{
      setStatus({kind:'error',message:'Something went wrong. Please email us directly.'});
    }
  }
  return (
    <form className="card grid gap-5" onSubmit={onSubmit}>
      <label className="grid gap-2 font-semibold">Name
        <input className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-sky-500" name="name" required minLength={2}/>
      </label>
      <label className="grid gap-2 font-semibold">Email
        <input type="email" className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-sky-500" name="email" required/>
      </label>
      <label className="grid gap-2 font-semibold">Message
        <textarea className="min-h-36 rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-sky-500" name="message" required minLength={5}/>
      </label>
      <button className="btn btn-primary justify-center" type="submit" disabled={status.kind==='sending'}>
        {status.kind==='sending'?'Sending…':'Send enquiry'}
      </button>
      {status.message&&(
        <p role="status" className={status.kind==='error'?'text-sm text-red-600':'text-sm text-emerald-700'}>{status.message}</p>
      )}
    </form>
  );
}
