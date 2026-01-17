import { Link } from "react-router-dom";

export default function Datenschutz() {
  return (
    <main style={{ padding: "2rem", maxWidth: 900, margin: "0 auto" }}>
      <nav style={{ marginBottom: "1.5rem" }}>
        <Link to="/">← Zurück zur Startseite</Link>
      </nav>

      <h1>Datenschutzerklärung</h1>

      <p>
        Diese Website ist ein privates Lern- und Entwicklungsprojekt.
      </p>

      <h2>1. Verantwortliche Stelle</h2>
      <p>
        <strong>Verantwortlich:</strong><br />
        Nick Mitchell<br />
        Weißenseer Weg 12<br />
        10367 Berlin<br />
        <strong>E-Mail:</strong> nick9mitchell7@googlemail.com
      </p>

      <h2>2. Hosting</h2>
      <p>
        Diese Website wird bei <strong>Vercel Inc.</strong> gehostet.
        Beim Aufruf der Website werden technisch notwendige Daten verarbeitet
        (z. B. IP-Adresse, Zeitpunkt des Zugriffs, Browsertyp),
        um den sicheren Betrieb der Website zu gewährleisten.
      </p>

      <p>
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
        (berechtigtes Interesse an einem sicheren und stabilen Betrieb).
      </p>

      <h2>3. Erhebung und Verarbeitung personenbezogener Daten</h2>
      <p>
        Personenbezogene Daten werden nur erhoben, wenn Sie diese freiwillig
        mitteilen, z. B. durch Kontaktaufnahme per E-Mail.
        Diese Daten werden ausschließlich zur Bearbeitung der Anfrage verwendet
        und nicht ohne Ihre Einwilligung weitergegeben.
      </p>

      <h2>4. Server-Log-Dateien</h2>
      <p>
        Der Hostinganbieter erhebt automatisch Informationen in sogenannten
        Server-Log-Dateien. Diese umfassen:
      </p>
      <ul>
        <li>Browsertyp und Browserversion</li>
        <li>Verwendetes Betriebssystem</li>
        <li>Referrer-URL</li>
        <li>Hostname des zugreifenden Rechners</li>
        <li>Uhrzeit der Serveranfrage</li>
        <li>IP-Adresse</li>
      </ul>

      <h2>5. Ihre Rechte</h2>
      <p>
        Sie haben jederzeit das Recht auf Auskunft über Ihre gespeicherten
        personenbezogenen Daten sowie auf Berichtigung oder Löschung dieser Daten.
        Zudem steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
      </p>

      <h2>6. Externe Dienste</h2>
      <p>
        Sofern auf dieser Website externe Dienste wie YouTube oder Spotify
        eingebunden werden, erfolgt dies nur nach Ihrer Einwilligung.
        Dabei können personenbezogene Daten an die jeweiligen Anbieter übermittelt werden.
      </p>

      <p style={{ marginTop: "3rem", fontSize: "0.9rem", color: "#666" }}>
        Stand: Januar 2026
      </p>
    </main>
  );
}
