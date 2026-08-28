import Link from 'next/link';
import {Instagram, Facebook} from 'lucide-react';

export default function Footer(){
  return (
    <footer className="bg-[color:var(--brand-900)] text-white/85">
      <div className="container grid gap-10 py-16 md:grid-cols-3">
        <div>
          <div className="text-xl font-extrabold text-white">INFIGENOME</div>
          <p className="mt-3 max-w-sm leading-7">
            An initiative of the Genetics &amp; Genomics centre, CUTM — making genomics, metagenomics and
            molecular biology expertise more accessible through hands-on learning and services.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="https://instagram.com/infigenome" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-white/20"><Instagram size={18}/></a>
            <a href="https://facebook.com/infigenome" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-white/20"><Facebook size={18}/></a>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-white">Navigation</h3>
          <div className="mt-4 grid gap-2">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/#about" className="hover:text-white">About Us</Link>
            <Link href="/#services" className="hover:text-white">Services</Link>
            <Link href="/#contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-white">Get In Touch</h3>
          <div className="mt-4 grid gap-2 leading-7">
            <p>4th floor, Madhusudan Building, SoAS, CUTM, BBSR Campus</p>
            <p>Phone: <a href="tel:+917077320293" className="hover:text-white">+91 7077320293</a></p>
            <p>Email: <a href="mailto:infigenome@gmail.com" className="hover:text-white">infigenome@gmail.com</a></p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/15 py-5 text-center text-sm text-white/70">
        © Copyright {new Date().getFullYear()}. Infigenome. All Rights Reserved.
      </div>
    </footer>
  );
}
