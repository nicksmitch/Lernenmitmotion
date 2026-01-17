import React from "react";

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="container mx-auto px-4 py-10">
        <div className="glass rounded-3xl p-6 sm:p-10 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-emerald-900 mb-6">
            Datenschutzerklärung
          </h1>

          <div className="space-y-8 text-emerald-900 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Datenschutz auf einen Blick</h2>

              <h3 className="text-lg font-semibold mt-4 mb-2">Allgemeine Hinweise</h3>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
                passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
                persönlich identifiziert werden können.
              </p>

              <h3 className="text-lg font-semibold mt-4 mb-2">Datenerfassung auf dieser Website</h3>
              <p>
                <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können
                Sie dem Abschnitt „Hinweis zur verantwortlichen Stelle“ entnehmen.
              </p>
              <p>
                <strong>Wie erfassen wir Ihre Daten?</strong><br />
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Andere Daten werden automatisch
                oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst (v. a. technische Daten).
              </p>
              <p>
                <strong>Wofür nutzen wir Ihre Daten?</strong><br />
                Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere
                Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
              </p>
              <p>
                <strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong><br />
                Sie haben jederzeit das Recht auf unentgeltliche Auskunft, Berichtigung oder Löschung Ihrer gespeicherten
                personenbezogenen Daten sowie weitere Rechte (siehe unten).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Hosting</h2>

              <h3 className="text-lg font-semibold mt-4 mb-2">Externes Hosting</h3>
              <p>
                Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden,
                werden auf den Servern der Hoster gespeichert.
              </p>

              <h3 className="text-lg font-semibold mt-4 mb-2">Wir setzen folgende Hoster ein</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Supabase, Inc., 65 Chulia Street #38-02/03, OCBC Centre, 049513 Singapore
                </li>
                <li>
                  Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, United States
                </li>
              </ul>

              <p className="mt-4">
                Mit den genannten Anbietern besteht ein Vertrag über Auftragsverarbeitung (AVV).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Allgemeine Hinweise und Pflichtinformationen</h2>

              <h3 className="text-lg font-semibold mt-4 mb-2">Hinweis zur verantwortlichen Stelle</h3>
              <p>
                Verantwortliche Stelle ist:<br />
                Nick Mitchell<br />
                Weißenseer Weg 12<br />
                10367 Berlin<br />
                Telefon: <span className="text-emerald-700">[Telefonnummer der verantwortlichen Stelle]</span><br />
                E-Mail:{" "}
                <a
                  className="text-emerald-700 underline hover:text-emerald-900"
                  href="mailto:Nick9mitchell7@googlemail.com"
                >
                  Nick9mitchell7@googlemail.com
                </a>
              </p>

              <h3 className="text-lg font-semibold mt-4 mb-2">Speicherdauer</h3>
              <p>
                Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre
                personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt.
              </p>

              <h3 className="text-lg font-semibold mt-4 mb-2">Widerruf Ihrer Einwilligung</h3>
              <p>
                Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine
                bereits erteilte Einwilligung jederzeit widerrufen.
              </p>

              <h3 className="text-lg font-semibold mt-4 mb-2">Beschwerderecht</h3>
              <p>
                Im Falle von Verstößen gegen die DSGVO steht Ihnen ein Beschwerderecht bei einer Aufsichtsbehörde zu.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Datenerfassung auf dieser Website</h2>

              <h3 className="text-lg font-semibold mt-4 mb-2">Cookies</h3>
              <p>
                Unsere Internetseiten verwenden Cookies. Cookies richten auf Ihrem Endgerät keinen Schaden an. Sie werden
                entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft gespeichert.
              </p>

              <h3 className="text-lg font-semibold mt-4 mb-2">Server-Log-Dateien</h3>
              <p>
                Der Provider erhebt und speichert automatisch Informationen in Server-Log-Dateien, die Ihr Browser
                automatisch übermittelt (z. B. Browsertyp, Betriebssystem, Referrer-URL, Uhrzeit der Anfrage, IP-Adresse).
              </p>

              <h3 className="text-lg font-semibold mt-4 mb-2">Anfrage per E-Mail / Telefon</h3>
              <p>
                Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden
                personenbezogenen Daten zum Zwecke der Bearbeitung gespeichert und verarbeitet.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Plugins und Tools</h2>

              <h3 className="text-lg font-semibold mt-4 mb-2">YouTube (erweiterter Datenschutz)</h3>
              <p>
                Diese Website bindet Videos von YouTube ein. Wenn Sie eine Seite mit eingebettetem YouTube-Video besuchen,
                wird eine Verbindung zu Servern von YouTube hergestellt. Details entnehmen Sie der vollständigen Erklärung.
              </p>

              <h3 className="text-lg font-semibold mt-4 mb-2">Spotify</h3>
              <p>
                Auf dieser Website sind Funktionen des Musik-Dienstes Spotify eingebunden. Dabei kann eine direkte
                Verbindung zwischen Ihrem Browser und dem Spotify-Server hergestellt werden. Spotify erhält dadurch u. a.
                die Information, dass Sie diese Website besucht haben.
              </p>

              <p className="text-sm text-emerald-700 mt-4">
                Quelle: eRecht24 Datenschutzerklärung
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
