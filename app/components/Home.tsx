import TitleText from "./TitleText"
import TextWithIcons from "./TextWithIcons";
import { CodeAlt, LocationBlank, Github } from '@boxicons/react';
import Link from "next/dist/client/link";

export default function Home() {
    return <div className="w-full max-w-7xl mx-auto px-8 flex items-center gap-12">
        <section className="w-1/2 flex items-start flex-col">
            <TitleText text="Alexandre J." />
            <TextWithIcons icon={LocationBlank} text="France, Ille-et-Vilaine" />
            <TextWithIcons icon={CodeAlt} text="C#, C++, Python" />
            <div className="flex items-center gap-4">
                <button className="mt-4 px-6 py-2 rounded-md border border-black hover:bg-gray-100 cursor-pointer transition-colors">About Me</button>
                <Link href="/github" className="mt-4 p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors"><Github /></Link>
            </div>
        </section>
        <aside className="hidden md:flex w-1/2 items-center justify-center">
            <img src="black.gif" alt="A rotating black animation" className="dark:hidden" />
            <img src="white.gif" alt="A rotating white animation" className="hidden dark:block" />
        </aside>
    </div>
}