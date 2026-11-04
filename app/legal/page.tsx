import type { Metadata } from "next";
import Link from "next/link";
import { external } from "../lib/layer";
import { GITHUB_URL } from "../lib/projects";
import { BackIcon } from "../components/ui/icons";

export const metadata: Metadata = {
  title: "Mentions légales · Alexandre J.",
  description: "Mentions légales et informations RGPD du site d'Alexandre J.",
};

const UPDATED = "4 novembre 2026";

export default function LegalPage() {
  return (
    <main className="legal" lang="fr">
      <div className="legal-wrap">
        <Link className="btn" href="/">
          <BackIcon />
          Retour
        </Link>

        <h1 className="title">Mentions légales</h1>
        <p className="legal-updated">Dernière mise à jour : {UPDATED}</p>

        <section>
          <h2>Éditeur du site</h2>
          <p>
            Ce site est un portfolio personnel, non commercial, édité par <strong>Alexandre J.</strong>, particulier
            résidant en Ille-et-Vilaine (France).
          </p>
          <p>
            Conformément à l&apos;article 6, III, 2 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans
            l&apos;économie numérique (LCEN), l&apos;éditeur, agissant à titre non professionnel, a choisi de ne pas
            publier ses coordonnées personnelles ; celles-ci ont été communiquées à l&apos;hébergeur.
          </p>
          <p>
            Contact :{" "}
            <a href={GITHUB_URL} {...external}>
              github.com/snaporteur
            </a>
          </p>
          <p>Directeur de la publication : Alexandre J.</p>
        </section>

        <section>
          <h2>Hébergement</h2>
          <p>
            Le site est hébergé par <strong>Cloudflare Pages</strong>, service de Cloudflare, Inc., 101 Townsend St,
            San Francisco, CA 94107, États-Unis —{" "}
            <a href="https://www.cloudflare.com" {...external}>
              cloudflare.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2>Nom de domaine</h2>
          <p>
            Le nom de domaine est enregistré auprès d&apos;<strong>OVHcloud</strong> (OVH SAS), 2 rue Kellermann, 59100
            Roubaix, France —{" "}
            <a href="https://www.ovhcloud.com" {...external}>
              ovhcloud.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2>Propriété intellectuelle</h2>
          <p>
            Les textes et éléments graphiques de ce site sont la propriété d&apos;Alexandre J., sauf mention contraire.
            Le code source est disponible sur{" "}
            <a href={`${GITHUB_URL}/alex-website`} {...external}>
              GitHub
            </a>
            . Les noms et logos cités (GitHub, etc.) appartiennent à leurs propriétaires respectifs.
          </p>
        </section>

        <h1 className="title legal-h1">Données personnelles (RGPD)</h1>

        <section>
          <h2>Aucun traceur</h2>
          <p>
            À ce jour, ce site <strong>n&apos;utilise aucun cookie, aucun traceur, aucun outil de mesure
            d&apos;audience</strong> et aucun service publicitaire. Aucun bandeau de consentement n&apos;est donc
            nécessaire.
          </p>
          <p>
            Le site ne contient aucun formulaire et ne collecte aucune donnée personnelle de manière active. Les
            polices de caractères sont hébergées avec le site : aucune requête n&apos;est envoyée à Google Fonts ou à
            un autre service tiers lors de votre visite.
          </p>
        </section>

        <section>
          <h2>Journaux techniques de l&apos;hébergeur</h2>
          <p>
            Comme pour tout site web, l&apos;hébergeur Cloudflare traite des données techniques strictement
            nécessaires à l&apos;acheminement des pages et à la sécurité du service (adresse IP, date et heure de la
            requête, navigateur utilisé). Ces données sont traitées par Cloudflare en tant que sous-traitant, sur le
            fondement de l&apos;intérêt légitime (sécurité et bon fonctionnement du site), et peuvent être traitées
            hors de l&apos;Union européenne dans le cadre du Data Privacy Framework UE–États-Unis. L&apos;éditeur
            n&apos;exploite pas ces données. Pour en savoir plus :{" "}
            <a href="https://www.cloudflare.com/privacypolicy/" {...external}>
              politique de confidentialité de Cloudflare
            </a>
            .
          </p>
        </section>

        <section>
          <h2>Liens externes</h2>
          <p>
            Les liens vers GitHub ouvrent un site tiers, soumis à sa propre politique de confidentialité.
          </p>
        </section>

        <section>
          <h2>Vos droits</h2>
          <p>
            Conformément au Règlement (UE) 2016/679 (RGPD) et à la loi « Informatique et Libertés », vous disposez
            d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, d&apos;opposition et de limitation du
            traitement des données vous concernant. Vous pouvez exercer ces droits en contactant l&apos;éditeur via
            le lien ci-dessus, et introduire une réclamation auprès de la{" "}
            <a href="https://www.cnil.fr" {...external}>
              CNIL
            </a>
            .
          </p>
          <p>
            Si un outil de mesure d&apos;audience ou un traceur venait à être ajouté, cette page serait mise à jour et
            votre consentement serait demandé lorsque la loi l&apos;exige.
          </p>
        </section>
      </div>
    </main>
  );
}
