import { CodeAlt, CPlusPlus, CSharp, LocationBlank, Python } from '@boxicons/react';
import { Inter } from 'next/font/google';

const inter = Inter({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function Home() {
  return (
    <main className={`${inter.className} min-h-screen flex items-center`}> 
      <div className="w-full max-w-7xl mx-auto px-8 flex items-center gap-12">
        <section className="w-1/2 flex items-start flex-col">
          <h1 className="m-0 text-5xl md:text-7xl font-extrabold leading-tight whitespace-nowrap">Alexandre J.</h1>
          <p className="mt-3 text-lg md:text-xl bottom-text font-medium flex items-center"><LocationBlank className="mr-2 w-5 h-5"/>France, Ille-et-Vilaine</p>
          <p className="mt-3 text-lg md:text-xl bottom-text font-medium flex items-center">
            <CodeAlt className="mr-2 w-5 h-5" />
            C#, C++, Python
          </p>
        </section>
        <aside className="hidden md:flex w-1/2 items-center justify-center">
          <img src="black.gif" alt="A rotating black animation" className="dark:hidden"/>
          <img src="white.gif" alt="A rotating white animation" className="hidden dark:block"/>
        </aside>
      </div>
    </main>
  );
}
