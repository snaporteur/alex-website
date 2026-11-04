import { layer } from "../../lib/layer";

const languages = [
  { name: "C#", use: "Unity games and .NET apps" },
  { name: "C++", use: "Engines, graphics and performance" },
  { name: "Python", use: "Scripts, tools and automation" },
];

export default function AboutIntro() {
  return (
    <div className="tabpanel" id="tab-about">
      <p className="layer" style={layer(40, 1)}>
        Hi, I&apos;m <strong>Alexandre</strong>, a student developer from Ille-et-Vilaine, France. I&apos;m specialising
        in <strong>graphics programming</strong>: the code that turns geometry, light and shaders into pixels.
      </p>
      <p className="layer" style={layer(40, 2)}>
        I like building <strong>games</strong>, <strong>interactive 3D</strong>, <strong>apps and tools</strong>, and
        small <strong>scripts</strong> that automate the boring parts.
      </p>
      <div className="layer" style={layer(30, 3)}>
        <h3>Languages</h3>
        <ul className="list">
          {languages.map((l) => (
            <li key={l.name}>
              {l.name} <span>{l.use}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
