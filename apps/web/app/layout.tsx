import type { Metadata } from 'next';
import { Assistant } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const assistant = Assistant({ subsets: ['latin'], weight: ['400','500','600','700','800'], display: 'swap', variable: '--font-assistant' });

export const metadata: Metadata = {
  metadataBase: new URL('https://infigenome.com'),
  title: { default: 'Genetics and Genomics Solutions | Infigenome', template: '%s | Infigenome' },
  description: 'Infigenome — an initiative of the Genetics & Genomics centre, CUTM. Hands-on trainings, internships and genomics & metagenomics services in molecular biology, plant tissue culture and genetic engineering.',
  alternates: { canonical: '/' },
  openGraph: { type: 'website', siteName: 'Infigenome', title: 'Genetics and Genomics Solutions | Infigenome', description: 'Inspiring young minds for a better future — accessible genomics expertise, hands-on training and research services.' }
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en" className={assistant.variable}><body><Header/>{children}<Footer/></body></html>;
}
