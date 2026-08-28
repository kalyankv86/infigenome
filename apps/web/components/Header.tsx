'use client';
import Link from 'next/link';
import Image from 'next/image';
import {Menu,X} from 'lucide-react';
import {useState} from 'react';

const links=[['Home','/'],['About Us','/#about'],['Services','/#services'],['Contact','/#contact']];

export default function Header(){
  const [open,setOpen]=useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/infigenome-logo.jpg" alt="Infigenome" width={859} height={262} className="h-11 w-auto object-contain" priority/>
          <span className="hidden font-bold tracking-tight text-slate-700 sm:block">INFIGENOME</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map(([n,h])=><Link key={h} href={h} className="text-sm font-semibold text-slate-600 transition hover:text-sky-700">{n}</Link>)}
          <Link href="/#contact" className="btn btn-primary text-sm">Get in touch</Link>
        </nav>
        <button className="md:hidden" onClick={()=>setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>{open?<X/>:<Menu/>}</button>
      </div>
      {open&&<nav className="border-t bg-white px-5 py-4 md:hidden">{links.map(([n,h])=><Link onClick={()=>setOpen(false)} className="block py-3 font-semibold" key={h} href={h}>{n}</Link>)}</nav>}
    </header>
  );
}
