'use client';
import Link from 'next/link';
import Image from 'next/image';
import {Menu,X} from 'lucide-react';
import {useState} from 'react';

const links=[['Home','/'],['About Us','/#about'],['Services','/#services'],['Contact','/#contact']];

export default function Header(){
  const [open,setOpen]=useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-white/95 backdrop-blur">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/infigenome-logo.jpg" alt="Infigenome" width={859} height={262} className="h-11 w-auto object-contain" priority/>
          <span className="hidden text-lg font-extrabold tracking-tight text-[color:var(--ink)] sm:block">INFIGENOME</span>
        </Link>
        <nav className="hidden items-center gap-9 md:flex">
          {links.map(([n,h])=>(
            <Link key={h} href={h} className="text-[15px] font-semibold text-[color:var(--ink)] transition hover:text-[color:var(--brand)]">{n}</Link>
          ))}
          <Link href="/#contact" className="btn btn-primary">Get in touch</Link>
        </nav>
        <button className="text-[color:var(--ink)] md:hidden" onClick={()=>setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>{open?<X/>:<Menu/>}</button>
      </div>
      {open&&(
        <nav className="border-t border-[color:var(--line)] bg-white px-5 py-4 md:hidden">
          {links.map(([n,h])=>(
            <Link onClick={()=>setOpen(false)} className="block py-3 font-semibold text-[color:var(--ink)]" key={h} href={h}>{n}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}
