import React from "react";
import { Link } from "react-router-dom";

export default function Impressum() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 text-emerald-900 flex items-center justify-center px-4 py-12">
      <div className="bg-white/80 backdrop-blur-lg border border-emerald-100 rounded-3xl shadow-2xl max-w-3xl w-full p-8 sm:p-12">
        {/* Titel */}
        <h1 className="text-4xl font-bold text-center text-emerald-800 mb-10">
          Impressum
        </h1>

        {/* Inhalt */}
        <div className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-xl font-semibold text-emerald-900 mb-2">
              Angaben gemäß § 5 TMG
            </h2>
            <p className="leading-relaxed">
              Nick Stuart Mitchell<br />
              Weißenseer Weg 12<br />
              10367 Berlin<br />
              Deutschland
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-emerald-900 mb-2">
              Kontakt
            </h2>
            <p className="leading-relaxed">
              Telefon: <span className="text-emerald-700">[Telefonnummer]</span><br />
              E-Mail:{" "}
              <a
                href="mailto:Nick9mitchell7@googlemail.com"
                className="text-emerald-700 hover:underline hover:text-emerald-800"
              >
                Nick9mitchell7@googlemail.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-emerald-900 mb-2">
              Redaktionell verantwortlich
            </h2>
            <p className="leading-relaxed">
              Nick Mitchell<br />
              Weißenseer Weg 12<br />
              10367 Berlin
            </p>
          </section>

          <section className="text-sm text-emerald-700 pt-6 border-t border-emerald-100">
            <p>Quelle: eRecht24 Impressum-Generator</p>
          </section>
        </div>

        {/* CTA Button */}
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
