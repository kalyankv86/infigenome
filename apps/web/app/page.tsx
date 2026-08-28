import Image from 'next/image';
import Link from 'next/link';
import ContactForm from '../components/ContactForm';

const services=[
  ['Genetics and Genomics Solutions','DRY LAB facilities. WET LAB facilities.'],
  ['Trainings & Workshops','Trainings, workshops, webinars and other educational engagement programs.'],
  ['Dissertations & Projects','Dissertations, diploma and internship projects in genetic engineering, genomics, metagenomics & data analysis.'],
  ['Industry Exposure & Exhibition','One-on-one interaction and mentoring programs from prominent industry experts, emphasizing development of hands-on skills.']
];

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
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(11,111,164,.86),rgba(20,163,155,.72))]"/>
        <div className="container relative flex min-h-[560px] items-center py-24">
          <div className="max-w-3xl text-white">
            <div className="text-sm font-bold uppercase tracking-[.18em] text-cyan-100">An initiative of the Genetics &amp; Genomics centre, CUTM</div>
            <h1 className="display mt-5">Inspiring young minds for a better future.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-50">Infigenome provides hands-on trainings, internships and genomics &amp; metagenomics services to students, individuals &amp; institutions on molecular biology, plant tissue culture &amp; genetic engineering techniques.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/#services" className="btn bg-white text-slate-900">Explore services</Link>
              <Link href="/#contact" className="btn btn-light">Talk to our team</Link>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section">
        <div className="container grid items-center gap-14 lg:grid-cols-[1fr_.8fr]">
          <div>
            <div className="eyebrow">An initiative</div>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">Reducing the gap between knowing &amp; doing.</h2>
            <p className="lead mt-6">Infigenome is an initiative of the “Genetics &amp; Genomics centre, CUTM” to reduce the gap between knowing &amp; doing by making genomics &amp; metagenomics solutions &amp; expertise more accessible for students, individuals, researchers or anyone who aims to seek knowledge.</p>
            <p className="mt-4 leading-8 text-slate-600">Hands-on trainings, internships, and genomics &amp; metagenomics services delivered on molecular biology, plant tissue culture and genetic engineering techniques.</p>
          </div>
          <Image src="/images/about-infigenome.jpg" alt="Infigenome" width={487} height={510} className="w-full rounded-[30px] object-cover shadow-xl"/>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section bg-[#f3f9fc]">
        <div className="container">
          <div className="max-w-3xl"><div className="eyebrow">Our services</div><h2 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">What we offer.</h2></div>
          <div className="grid mt-12 md:grid-cols-2">
            {services.map(([t,d],i)=>(
              <article className="card flex gap-5" key={t}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-50 font-bold text-sky-700">{i+1}</div>
                <div><h3 className="text-xl font-bold">{t}</h3><p className="mt-2 leading-7 text-slate-600">{d}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Completed Programs */}
      <section id="programs" className="section">
        <div className="container">
          <div className="max-w-3xl"><div className="eyebrow">Completed programs</div><h2 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">Programs we have delivered.</h2></div>
          <div className="grid mt-12 md:grid-cols-3">
            {programs.map(([img,d])=>(
              <article className="card" key={img}>
                <Image src={'/images/'+img} alt={d} width={360} height={360} className="aspect-square w-full rounded-2xl object-cover"/>
                <p className="mt-5 leading-7 text-slate-600">{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Workshops */}
      <section id="workshops" className="section bg-[#f3f9fc]">
        <div className="container">
          <div className="max-w-3xl"><div className="eyebrow">Upcoming workshops</div><h2 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">Learn with us next.</h2></div>
          <div className="grid mt-12 md:grid-cols-3">
            {workshops.map(([img,t,href],i)=>(
              <article className="card" key={t}>
                <Image src={'/images/'+img} alt={t} width={400} height={260} className="aspect-[3/2] w-full rounded-2xl object-cover"/>
                <div className="mt-5 text-sm font-bold text-sky-700">Workshop {i+1}</div>
                <h3 className="mt-2 text-xl font-bold">{t}</h3>
                <a href={href} className="mt-4 inline-block font-semibold text-sky-700 hover:underline">Register →</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Lab */}
      <section id="lab" className="section">
        <div className="container">
          <div className="max-w-3xl"><div className="eyebrow">Our lab</div><h2 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">Inside the facility.</h2></div>
          <div className="grid mt-12 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {lab.map((img,i)=>(
              <Image key={img} src={'/images/'+img} alt={`Infigenome lab ${i+1}`} width={400} height={300} className="aspect-[4/3] w-full rounded-2xl object-cover"/>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="section bg-[#f3f9fc]">
        <div className="container">
          <div className="max-w-3xl"><div className="eyebrow">Our team</div><h2 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">The people behind Infigenome.</h2></div>
          <div className="grid mt-12 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map(([img,name,role])=>(
              <article className="card text-center" key={name}>
                <Image src={'/images/'+img} alt={name} width={270} height={312} className="mx-auto aspect-[27/31] w-40 rounded-2xl object-cover"/>
                <h3 className="mt-5 text-lg font-bold">{name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section">
        <div className="container grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <div className="eyebrow">Get in touch</div>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight">Let’s talk.</h2>
            <p className="mt-5 leading-7 text-slate-600">Tell us about your training, research, genomics or collaboration requirement. Enquiries are captured by a secure API and stored for follow-up by our team.</p>
            <div className="mt-6 grid gap-2 text-slate-600">
              <p>4th floor, Madhusudan Building, SoAS, CUTM, BBSR Campus</p>
              <p><a className="font-semibold text-sky-700" href="tel:+917077320293">+91 7077320293</a></p>
              <p><a className="font-semibold text-sky-700" href="mailto:infigenome@gmail.com">infigenome@gmail.com</a></p>
            </div>
          </div>
          <ContactForm/>
        </div>
      </section>
    </main>
  );
}
