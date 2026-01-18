import React from "react";
import { Link } from "react-router-dom";

export default function Datenschutzerklaerung() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 text-emerald-900 flex items-center justify-center px-4 py-12">
      <div className="bg-white/80 backdrop-blur-lg border border-emerald-100 rounded-3xl shadow-2xl max-w-4xl w-full p-8 sm:p-12 overflow-y-auto">
        <h1 className="text-4xl font-bold text-center text-emerald-800 mb-10">
          Datenschutzerklärung
        </h1>

        <div className="space-y-10 text-gray-800 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-emerald-900 mb-4">
              1. Datenschutz auf einen Blick
            </h2>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert,
              wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert
              werden können.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-900 mb-4">
              2. Verantwortliche Stelle
            </h2>
            <p>
              <strong>Verantwortlich für die Datenverarbeitung:</strong><br />
              Nick Mitchell<br />
              Weißenseer Weg 12<br />
              10367 Berlin<br />
              E-Mail:{" "}
              <a
                href="mailto:Nick9mitchell7@googlemail.com"
                className="text-emerald-700 hover:underline"
              >
                Nick9mitchell7@googlemail.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-900 mb-4">
              3. Hosting
            </h2>
            <p>
              Diese Website wird auf Servern von Supabase und Vercel gehostet. Eine Datenübermittlung in Drittländer (z. B. USA, Singapur) erfolgt auf Grundlage von Standardvertragsklauseln gemäß Art. 46 DSGVO.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-900 mb-4">
              4. Datenerfassung auf dieser Website
            </h2>
            <p>
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen (z. B. durch Registrierung oder Kontaktaufnahme). Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst (z. B. IP-Adresse, Browsertyp, Uhrzeit des Zugriffs).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-900 mb-4">
              5. Zweck der Datenverarbeitung
            </h2>
            <p>
              Ein Teil der Daten wird zur fehlerfreien Bereitstellung der Website benötigt. Weitere Daten verarbeiten wir, soweit dies zur Bereitstellung von Funktionen (z. B. Nutzerkonto, Fortschrittsspeicherung) erforderlich ist.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-900 mb-4">
              6. Ihre Rechte
            </h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>Auskunft, Berichtigung und Löschung (Art. 15–17 DSGVO)</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
              <li>Beschwerderecht bei der Aufsichtsbehörde</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-900 mb-4">
              7. Cookies & Local Storage
            </h2>
            <p>
              Diese Website verwendet ausschließlich technisch notwendige Cookies und Local-Storage-Einträge zur Bereitstellung
              der Funktionen (z. B. Authentifizierung, Timer-Status, Fortschrittsspeicherung).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-900 mb-4">
              8. Drittanbieter-Integrationen
            </h2>
            <p>
              Diese Website nutzt Spotify-Funktionen zur Wiedergabe von Audioinhalten. Anbieter ist Spotify AB, Stockholm.
              Weitere Informationen:{" "}
              <a
                href="https://www.spotify.com/de/legal/privacy-policy/"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-700 hover:underline"
              >
                https://www.spotify.com/de/legal/privacy-policy/
              </a>
            </p>
          </section>

          <section className="text-sm text-emerald-700 border-t border-emerald-100 pt-6">
            <p>Quelle: eRecht24 Datenschutzerklärung (angepasst & erweitert)</p>
          </section>
        </div>

        <div className="text-center mt-12">
          <Link
            to="/"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
          >
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
