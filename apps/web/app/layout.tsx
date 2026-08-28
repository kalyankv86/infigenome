import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
export const metadata: Metadata = {
  metadataBase: new URL('https://infigenome.com'),
  title: { default: 'Infigenome | Genomics, Training & Research Services', template: '%s | Infigenome' },
  description: 'Genomics, metagenomics, molecular biology training, internships, research support and data-driven life-science solutions.',
  alternates: { canonical: 'https://infigenome.com' },
  openGraph: { type: 'website', siteName: 'Infigenome', title: 'Infigenome | Genomics, Training & Research Services', description: 'Accessible genomics expertise, hands-on training and research services.' }
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Header/>{children}<Footer/></body></html>}
