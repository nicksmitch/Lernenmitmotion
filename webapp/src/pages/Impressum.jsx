import { Link } from "react-router-dom";

export default function Impressum() {
  return (
    <main style={{ padding: "2rem", maxWidth: 900, margin: "0 auto" }}>
      <nav style={{ marginBottom: "1.5rem" }}>
        <Link to="/">← Zurück zur Startseite</Link>
      </nav>

      <h1>Impressum</h1>

      <p>Angaben gemäß § 5 TMG</p>

      <p>
        <strong>Nick Mitchell</strong><br />
        Weißenseer Weg 12<br />
        10367 Berlin<br />
        Deutschland
      </p>

      <p>
        <strong>E-Mail:</strong> nick9mitchell7@googlemail.com
      </p>

      <p>
        Privates Lern- und Entwicklungsprojekt.
      </p>
    </main>
  );
}
