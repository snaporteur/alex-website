"use client"
import { Inter } from 'next/font/google';
import { useEffect, useRef } from 'react';

const inter = Inter({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function Page() {
    const redirectRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            redirectRef.current?.click();
        }, 500);
    }, []);

    return <main>
        <div className={`${inter.className} flex justify-center items-center h-screen`}>
            <h1 className="text-4xl font-bold">Redirecting to GitHub...</h1>
        </div>
        <div className="hidden">
            <a ref={redirectRef} href="https://github.com/snaporteur" rel="noopener noreferrer"></a>
        </div>
    </main>
}