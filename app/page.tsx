import { CodeAlt, LocationBlank, Github } from '@boxicons/react';
import { Inter } from 'next/font/google';
import Home from './components/Home';
import AboutMe from './components/AboutMe';

const inter = Inter({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function Page() {
  return (
    <main className={`${inter.className} min-h-screen flex items-center`}> 
      <Home />
      {/* <AboutMe /> */}
    </main>
  );
}
