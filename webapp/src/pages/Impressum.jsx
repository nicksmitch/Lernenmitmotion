import React from "react";

export default function Impressum() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="container mx-auto px-4 py-10">
        <div className="glass rounded-3xl p-6 sm:p-10 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-emerald-900 mb-6">
            Impressum
          </h1>

          <div className="space-y-6 text-emerald-900">
            <section>
              <h2 className="text-xl font-semibold mb-2">Angaben gemäß § 5 TMG</h2>
              <p className="leading-relaxed">
                Nick Stuart Mitchell<br />
                Weißenseer Weg 12<br />
                10367 Berlin
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Kontakt</h2>
              <p className="leading-relaxed">
                Telefon: <span className="text-emerald-700">[Telefonnummer]</span><br />
                E-Mail:{" "}
                <a
                  className="text-emerald-700 underline hover:text-emerald-900"
                  href="mailto:Nick9mitchell7@googlemail.com"
                >
                  Nick9mitchell7@googlemail.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Redaktionell verantwortlich</h2>
              <p className="leading-relaxed">
                Nick Mitchell<br />
                Weißenseer Weg 12<br />
                10367 Berlin
              </p>
            </section>

            <section className="text-sm text-emerald-700">
              <p>
                Quelle: eRecht24 Impressum-Generator
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
