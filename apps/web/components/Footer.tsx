import Link from 'next/link';
import {Instagram, Facebook, MapPin, Phone, Mail} from 'lucide-react';

export default function Footer(){
  return (
    <footer id="contact-details" className="border-t bg-[#f5fafc]">
      <div className="container grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="text-xl font-extrabold">INFIGENOME</div>
          <p className="mt-3 max-w-sm leading-7 text-slate-600">An initiative of the Genetics &amp; Genomics centre, CUTM — making genomics, metagenomics and molecular biology expertise more accessible through hands-on training and services.</p>
          <div className="mt-5 flex gap-4">
            <a href="https://instagram.com/infigenome" aria-label="Instagram" className="text-slate-500 hover:text-sky-700"><Instagram/></a>
            <a href="https://facebook.com/infigenome" aria-label="Facebook" className="text-slate-500 hover:text-sky-700"><Facebook/></a>
          </div>
        </div>
        <div>
          <h3 className="font-bold">Navigation</h3>
          <div className="mt-4 grid gap-2 text-slate-600">
            <Link href="/">Home</Link>
            <Link href="/#about">About Us</Link>
            <Link href="/#services">Services</Link>
            <Link href="/#contact">Contact</Link>
          </div>
        </div>
        <div>
          <h3 className="font-bold">Get in touch</h3>
          <div className="mt-4 grid gap-3 text-slate-600">
            <p className="flex gap-3"><MapPin className="mt-1 shrink-0" size={18}/>4th floor, Madhusudan Building, SoAS, CUTM, BBSR Campus</p>
            <p className="flex gap-3"><Phone className="shrink-0" size={18}/><a href="tel:+917077320293">+91 7077320293</a></p>
            <p className="flex gap-3"><Mail className="shrink-0" size={18}/><a href="mailto:infigenome@gmail.com">infigenome@gmail.com</a></p>
          </div>
        </div>
      </div>
      <div className="border-t py-5 text-center text-sm text-slate-500">© Copyright {new Date().getFullYear()}. Infigenome. All Rights Reserved.</div>
    </footer>
  );
}
