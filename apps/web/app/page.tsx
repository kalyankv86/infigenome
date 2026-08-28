import Image from 'next/image';
import Link from 'next/link';
import { Dna, GraduationCap, NotebookPen, Briefcase } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const services=[
  [Dna,'Genetics and Genomics Solutions','DRY LAB facilities. WET LAB facilities.'],
  [GraduationCap,'Trainings & Workshops','Trainings, workshops, webinars and other educational engagement programs.'],
  [NotebookPen,'Dissertations & Projects','Dissertations, diploma and internship projects in genetic engineering, genomics, metagenomics & data analysis.'],
  [Briefcase,'Industry Exposure & Exhibition','One-on-one interaction and mentoring programs from prominent industry experts, emphasizing development of hands-on skills.']
] as const;

const programs=[
  ['program-1.png','6-day hands-on training on basic techniques and tools of molecular biology.'],
  ['program-2.png','One month summer internship, 2022.'],
  ['program-3.png','3-day hands-on training on plant tissue culture techniques.']
];

const workshops=[
  ['workshop-1.png','Introduction to Gene Editing Using CRISPR','https://workshop.cutm.ac.in/'],
  ['workshop-2.png','Basics of PCR & Its Applications','https://workshop.cutm.ac.in/'],
  ['workshop-3.png','Oxford Nanopore Sequencing & Data Analysis','https://workshop.cutm.ac.in/']
];

const lab=Array.from({length:11},(_,i)=>`lab-${i+1}.jpg`);

const team=[
  ['team-rukmini.jpg','Dr. Rukmini Mishra','Associate Professor; Head, Department of Botany, SoAS, CUTM, BBSR Campus'],
  ['team-jatindranath.jpg','Dr. Jatindranath Mohanty','Assistant Professor, Department of Botany, SoAS'],
  ['team-satyabrata.jpg','Dr. Satyabrata Nanda','Assistant Professor, Department of Biotechnology, SoAS, CUTM, Parlakhemundi'],
  ['team-madhusmita.jpg','Dr. Madhusmita Barik','Assistant Professor, Department of Botany'],
  ['team-debasmita.jpg','Ms. Debasmita Das','Ph.D. Scholar, Department of Botany'],
  ['team-sunanya.jpg','Ms. Sunanya Das','Ph.D. Scholar, Department of Botany'],
  ['team-archita.jpg','Ms. Archita Patra','Junior Research Fellow, Department of Botany'],
  ['team-sonupriya.jpg','Ms. Sonupriya Sahu','Ph.D. Scholar, Department of Botany'],
  ['team-dibyashree.jpg','Mr. Dibyashree Soumyakanta Jena','Research Intern, Centre for Genetics and Genomics'],
  ['team-shubham.jpg','Mr. Shubham Jyoti Sahoo','Research Intern, Centre for Genetics and Genomics']
];

export default function Home(){
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image src="/images/hero-bg.jpg" alt="" fill priority className="object-cover" sizes="100vw"/>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,77,81,.92)0%,rgba(22,150,159,.78)60%,rgba(22,150,159,.55)100%)]"/>
        <div className="container relative flex min-h-[560px] items-center py-24">
          <div className="max-w-3xl text-white">
            <p className="text-sm font-bold uppercase tracking-[.2em] text-white/85">An initiative of the Genetics &amp; Genomics centre, CUTM</p>
            <h1 className="mt-5 text-4xl font-extrabold uppercase leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl">
              Inspiring young minds<br/>for a better future <span className="text-white/70">......</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/90">
              Infigenome provides hands-on trainings, internships and genomics &amp; metagenomics services to
              students, individuals &amp; institutions on molecular biology, plant tissue culture &amp; genetic
              engineering techniques.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/#services" className="btn btn-primary bg-white !text-[color:var(--brand-900)] hover:!bg-white/90">Explore services</Link>
              <Link href="/#contact" className="btn btn-ghost">Talk to our team</Link>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section">
        <div className="container grid items-center gap-14 lg:grid-cols-[1fr_.82fr]">
          <div>
            <p className="eyebrow">An initiative</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-[38px]">Reducing the gap between knowing &amp; doing</h2>
            <div className="sec-rule !mx-0"/>
            <p className="mt-6 text-lg leading-8">
              Infigenome is an initiative of the “Genetics &amp; Genomics centre, CUTM” to reduce the gap between
              knowing &amp; doing by making genomics &amp; metagenomics solutions &amp; expertise more accessible
              for students, individuals, researchers or anyone who aims to seek knowledge.
            </p>
            <p className="mt-4 leading-8 text-[color:var(--muted)]">
              Hands-on trainings, internships, and genomics &amp; metagenomics services delivered on molecular
              biology, plant tissue culture and genetic engineering techniques.
            </p>
          </div>
          <Image src="/images/about-infigenome.jpg" alt="Infigenome" width={487} height={510} className="w-full rounded-[10px] object-cover shadow-lg"/>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section section-soft">
        <div className="container">
          <div className="sec-head">
            <h2>Our Services</h2>
            <div className="sec-rule"/>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(([Icon,t,d])=>(
              <article className="card iconbox" key={t}>
                <div className="ic"><Icon size={32} strokeWidth={1.6}/></div>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Completed Programs */}
      <section id="programs" className="section">
        <div className="container">
          <div className="sec-head"><h2>Completed Programs</h2><div className="sec-rule"/></div>
          <div className="grid gap-7 md:grid-cols-3">
            {programs.map(([img,d])=>(
              <article className="card overflow-hidden" key={img}>
                <Image src={'/images/'+img} alt={d} width={480} height={360} className="aspect-[4/3] w-full object-cover"/>
                <p className="px-6 py-6 text-center leading-7 text-[color:var(--muted)]">{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Workshops */}
      <section id="workshops" className="section section-soft">
        <div className="container">
          <div className="sec-head"><h2>Up Coming Workshops</h2><div className="sec-rule"/></div>
          <div className="grid gap-7 md:grid-cols-3">
            {workshops.map(([img,t,href],i)=>(
              <article className="card overflow-hidden text-center" key={t}>
                <Image src={'/images/'+img} alt={t} width={480} height={300} className="aspect-[8/5] w-full object-cover"/>
                <div className="px-6 py-6">
                  <div className="text-xs font-bold uppercase tracking-[.16em] text-[color:var(--brand)]">Workshop {i+1}</div>
                  <h3 className="mt-2 text-lg font-bold">{t}</h3>
                  <a href={href} className="mt-4 inline-block text-sm font-bold text-[color:var(--brand)] hover:text-[color:var(--brand-900)]">Register →</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Lab */}
      <section id="lab" className="section">
        <div className="container">
          <div className="sec-head"><h2>Our Lab</h2><div className="sec-rule"/></div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {lab.map((img,i)=>(
              <Image key={img} src={'/images/'+img} alt={`Infigenome lab ${i+1}`} width={400} height={300} className="aspect-[4/3] w-full rounded-[10px] object-cover"/>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="section section-soft">
        <div className="container">
          <div className="sec-head"><h2>Our Team</h2><div className="sec-rule"/></div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map(([img,name,role])=>(
              <article className="text-center" key={name}>
                <Image src={'/images/'+img} alt={name} width={270} height={312} className="mx-auto aspect-[27/31] w-44 rounded-[10px] object-cover shadow-md"/>
                <h3 className="mt-5 text-lg font-bold">{name}</h3>
                <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section">
        <div className="container">
          <div className="sec-head"><h2>Get In Touch</h2><div className="sec-rule"/></div>
          <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
            <div>
              <p className="leading-7 text-[color:var(--muted)]">
                Tell us about your training, research, genomics or collaboration requirement. Enquiries are
                captured by a secure API and stored for follow-up by our team.
              </p>
              <div className="mt-6 grid gap-2">
                <p><strong className="text-[color:var(--ink)]">Address:</strong> 4th floor, Madhusudan Building, SoAS, CUTM, BBSR Campus</p>
                <p><strong className="text-[color:var(--ink)]">Phone:</strong> <a className="font-semibold text-[color:var(--brand)]" href="tel:+917077320293">+91 7077320293</a></p>
                <p><strong className="text-[color:var(--ink)]">Email:</strong> <a className="font-semibold text-[color:var(--brand)]" href="mailto:infigenome@gmail.com">infigenome@gmail.com</a></p>
              </div>
            </div>
            <ContactForm/>
          </div>
        </div>
      </section>
    </main>
  );
}
