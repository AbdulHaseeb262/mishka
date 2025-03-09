"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function LegalPage() {
  const path = usePathname();

  const getContent = () => {
    switch (path) {
      case "/impressum":
        return {
          title: "Impressum",
          content: (
            <>
              <h2 className="text-2xl font-bold mb-4">Angaben gemäß § 5 TMG</h2>
              <p className="mb-4">
                Alex am Naschmarkt GmbH
                <br />
                Naschmarkt 1
                <br />
                1060 Wien
                <br />
                Österreich
              </p>

              <h3 className="text-xl font-bold mb-2">Vertreten durch</h3>
              <p className="mb-4">
                Alexander Mustermann
                <br />
                Geschäftsführer
              </p>

              <h3 className="text-xl font-bold mb-2">Kontakt</h3>
              <p className="mb-4">
                Telefon: +43 1 234 567
                <br />
                E-Mail: info@alexamnaschmarkt.at
              </p>

              <h3 className="text-xl font-bold mb-2">Registereintrag</h3>
              <p className="mb-4">
                Handelsregister: Handelsgericht Wien
                <br />
                Registernummer: FN 123456a
              </p>

              <h3 className="text-xl font-bold mb-2">Umsatzsteuer-ID</h3>
              <p className="mb-4">
                Umsatzsteuer-Identifikationsnummer gemäß §27 a
                Umsatzsteuergesetz:
                <br />
                ATU12345678
              </p>
            </>
          ),
        };

      case "/datenschutz":
        return {
          title: "Datenschutzerklärung",
          content: (
            <>
              <h2 className="text-2xl font-bold mb-4">
                1. Datenschutz auf einen Blick
              </h2>
              <h3 className="text-xl font-bold mb-2">Allgemeine Hinweise</h3>
              <p className="mb-4">
                Die folgenden Hinweise geben einen einfachen Überblick darüber,
                was mit Ihren personenbezogenen Daten passiert, wenn Sie diese
                Website besuchen. Personenbezogene Daten sind alle Daten, mit
                denen Sie persönlich identifiziert werden können.
              </p>

              <h3 className="text-xl font-bold mb-2">
                Datenerfassung auf dieser Website
              </h3>
              <h4 className="text-lg font-bold mb-2">
                Wer ist verantwortlich für die Datenerfassung auf dieser
                Website?
              </h4>
              <p className="mb-4">
                Die Datenverarbeitung auf dieser Website erfolgt durch den
                Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum
                dieser Website entnehmen.
              </p>

              <h4 className="text-lg font-bold mb-2">
                Wie erfassen wir Ihre Daten?
              </h4>
              <p className="mb-4">
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese
                mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie
                in ein Kontaktformular eingeben.
              </p>

              <h2 className="text-2xl font-bold mb-4">
                2. Allgemeine Hinweise und Pflichtinformationen
              </h2>
              <h3 className="text-xl font-bold mb-2">Datenschutz</h3>
              <p className="mb-4">
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen
                Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten
                vertraulich und entsprechend der gesetzlichen
                Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              </p>
            </>
          ),
        };

      case "/agb":
        return {
          title: "Allgemeine Geschäftsbedingungen",
          content: (
            <>
              <h2 className="text-2xl font-bold mb-4">1. Geltungsbereich</h2>
              <p className="mb-4">
                Diese Allgemeinen Geschäftsbedingungen gelten für alle
                Geschäftsbeziehungen zwischen uns und unseren Kunden. Maßgeblich
                ist jeweils die zum Zeitpunkt des Vertragsschlusses gültige
                Fassung.
              </p>

              <h2 className="text-2xl font-bold mb-4">2. Vertragsschluss</h2>
              <p className="mb-4">
                Die Präsentation der Waren in unserem Online-Shop stellt kein
                bindendes Angebot dar. Erst die Bestellung einer Ware durch Sie
                ist ein bindendes Angebot nach § 145 BGB. Im Falle der Annahme
                dieses Angebotes versenden wir an Sie eine Auftragsbestätigung
                per E-Mail innerhalb von zwei Werktagen.
              </p>

              <h2 className="text-2xl font-bold mb-4">
                3. Preise und Zahlungsbedingungen
              </h2>
              <p className="mb-4">
                Alle Preise verstehen sich in Euro inklusive der gesetzlichen
                Mehrwertsteuer. Die Zahlung erfolgt per Vorauskasse, Kreditkarte
                oder Rechnung.
              </p>

              <h2 className="text-2xl font-bold mb-4">4. Lieferung</h2>
              <p className="mb-4">
                Die Lieferung erfolgt innerhalb Wiens. Die Lieferzeit beträgt in
                der Regel 1-2 Werktage. Wir behalten uns vor, eine Teillieferung
                vorzunehmen, sofern dies für Sie zumutbar ist.
              </p>
            </>
          ),
        };

      default:
        return {
          title: "404 - Seite nicht gefunden",
          content: <p>Die angeforderte Seite konnte nicht gefunden werden.</p>,
        };
    }
  };

  const { title, content } = getContent();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="glass-card p-8 rounded-2xl">
          <h1 className="text-4xl font-bold gradient-text mb-8">{title}</h1>
          <div className="text-gray-300">{content}</div>
        </div>
      </div>
    </div>
  );
}
/*     
    The  LegalPage  component is a simple functional component that renders the content of the legal pages based on the current path. The  usePathname  hook from the  next/navigation  package is used to get the current path. The  getContent  function returns the title and content of the legal page based on the current path. The content is then rendered inside a  glass-card  div with a gradient background. 
    The  LegalPage  component is used in the  _app.js  file to render the legal pages. 
    Step 5: Add the Legal Pages to the Navigation 
    The last step is to add the legal pages to the navigation menu. 
    Open the  Navigation.js  file in the  components  folder and add the following code: */
