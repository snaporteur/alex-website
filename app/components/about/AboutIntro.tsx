import { layer } from "../../lib/layer";
import type { Dict } from "../../lib/i18n";
import { rich } from "../../lib/rich";

export default function AboutIntro({ t }: { t: Dict }) {
  return (
    <div className="tabpanel" id="tab-about">
      {t.about.intro.map((text, i) => (
        <p key={i} className="layer" style={layer(40, i + 1)}>
          {rich(text)}
        </p>
      ))}
      <div className="layer" style={layer(30, 3)}>
        <h3>{t.about.languages}</h3>
        <ul className="list">
          {t.languages.map((l) => (
            <li key={l.name}>
              {l.name} <span>{l.use}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
