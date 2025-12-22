import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Brain, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';

const Datenschutz = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-emerald-900">FocusFlow</span>
          </div>
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-10 h-10 text-emerald-600" />
            <h1 className="text-4xl font-bold text-emerald-900">Datenschutzerklärung</h1>
          </div>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-emerald-800 mb-3">1. Datenschutz auf einen Blick</h2>
              
              <h3 className="text-xl font-semibold text-emerald-700 mt-4 mb-2">Allgemeine Hinweise</h3>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten 
                passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie 
                persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen 
                Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-emerald-700 mb-2">Datenerfassung auf dieser Website</h3>
              <p className="mb-3">
                <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong>
              </p>
              <p>
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten 
                können Sie dem Impressum dieser Website entnehmen.
              </p>
              
              <p className="mt-4 mb-3">
                <strong>Wie erfassen wir Ihre Daten?</strong>
              </p>
              <p>
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um 
                Daten handeln, die Sie in ein Kontaktformular eingeben oder bei der Registrierung angeben (Name, E-Mail).
              </p>
              <p className="mt-3">
                Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere 
                IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder 
                Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
              </p>

              <p className="mt-4 mb-3">
                <strong>Wofür nutzen wir Ihre Daten?</strong>
              </p>
              <p>
                Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. 
                Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden, sofern Sie eingewilligt haben.
              </p>

              <p className="mt-4 mb-3">
                <strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong>
              </p>
              <p>
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer 
                gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder 
                Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, 
                können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter 
                bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-emerald-800 mb-3">2. Hosting</h2>
              <p>
                Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
              </p>
              
              <h3 className="text-xl font-semibold text-emerald-700 mt-4 mb-2">Vercel</h3>
              <p>
                Anbieter ist die Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA (nachfolgend "Vercel").
              </p>
              <p className="mt-3">
                Vercel ist ein Dienst zum Hosting von Webseiten. Wenn Sie unsere Website besuchen, erfasst Vercel 
                verschiedene Logfiles inklusive Ihrer IP-Adressen. Details entnehmen Sie der Datenschutzerklärung von 
                Vercel:{' '}
                <a 
                  href="https://vercel.com/legal/privacy-policy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-700 underline"
                >
                  https://vercel.com/legal/privacy-policy
                </a>
              </p>
              <p className="mt-3">
                Die Verwendung von Vercel erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein 
                berechtigtes Interesse an einer möglichst zuverlässigen Darstellung unserer Website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-emerald-800 mb-3">3. Allgemeine Hinweise und Pflichtinformationen</h2>
              
              <h3 className="text-xl font-semibold text-emerald-700 mt-4 mb-2">Datenschutz</h3>
              <p>
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre 
                personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie 
                dieser Datenschutzerklärung.
              </p>
              <p className="mt-3">
                Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene 
                Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende 
                Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, 
                wie und zu welchem Zweck das geschieht.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-emerald-800 mb-3">4. Datenerfassung auf dieser Website</h2>
              
              <h3 className="text-xl font-semibold text-emerald-700 mt-4 mb-2">Server-Log-Dateien</h3>
              <p>
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, 
                die Ihr Browser automatisch an uns übermittelt. Dies sind:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Browsertyp und Browserversion</li>
                <li>verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
              <p className="mt-3">
                Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser 
                Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes 
                Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website.
              </p>

              <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-2">Registrierung auf dieser Website</h3>
              <p>
                Sie können sich auf dieser Website registrieren, um zusätzliche Funktionen zu nutzen. Die dazu 
                eingegebenen Daten verwenden wir nur zum Zwecke der Nutzung des jeweiligen Angebotes oder Dienstes, 
                für den Sie sich registriert haben. Die bei der Registrierung abgefragten Pflichtangaben müssen 
                vollständig angegeben werden. Anderenfalls werden wir die Registrierung ablehnen.
              </p>
              <p className="mt-3">
                Für wichtige Änderungen etwa beim Angebotsumfang oder bei technisch notwendigen Änderungen nutzen wir 
                die bei der Registrierung angegebene E-Mail-Adresse, um Sie auf diesem Wege zu informieren.
              </p>
              <p className="mt-3">
                Die Verarbeitung der bei der Registrierung eingegebenen Daten erfolgt zum Zwecke der Durchführung des 
                durch die Registrierung begründeten Nutzungsverhältnisses und ggf. zur Anbahnung weiterer Verträge 
                (Art. 6 Abs. 1 lit. b DSGVO).
              </p>
              <p className="mt-3">
                Die bei der Registrierung erfassten Daten werden von uns gespeichert, solange Sie auf dieser Website 
                registriert sind und werden anschließend gelöscht. Gesetzliche Aufbewahrungsfristen bleiben unberührt.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-emerald-800 mb-3">5. Authentifizierung mit Supabase</h2>
              <p>
                Wir nutzen den Authentifizierungsdienst Supabase für die Benutzerregistrierung und -anmeldung. 
                Anbieter ist Supabase Inc., 970 Toa Payoh North #07-04, Singapore 318992.
              </p>
              <p className="mt-3">
                Bei der Registrierung werden folgende Daten an Supabase übermittelt und dort gespeichert:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>E-Mail-Adresse</li>
                <li>Name (optional)</li>
                <li>Verschlüsseltes Passwort</li>
              </ul>
              <p className="mt-3">
                Die Datenverarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung). 
                Details zur Datenverarbeitung durch Supabase finden Sie in deren Datenschutzerklärung:{' '}
                <a 
                  href="https://supabase.com/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-700 underline"
                >
                  https://supabase.com/privacy
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-emerald-800 mb-3">6. Lokale Datenspeicherung (LocalStorage)</h2>
              <p>
                Diese Website nutzt die LocalStorage-Funktion Ihres Browsers, um bestimmte Daten lokal auf Ihrem Gerät 
                zu speichern. Dabei handelt es sich um:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Ihre Lern-Statistiken (Fokuszeit, abgeschlossene Pausen)</li>
                <li>Timer-Einstellungen</li>
                <li>Rollenauswahl (Einzelnutzer/Lehrkraft)</li>
              </ul>
              <p className="mt-3">
                Diese Daten werden ausschließlich auf Ihrem Gerät gespeichert und nicht an unsere Server übermittelt. 
                Sie können diese Daten jederzeit durch Löschen der Browser-Daten entfernen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-emerald-800 mb-3">7. Ihre Rechte</h2>
              <p>
                Sie haben folgende Rechte:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li><strong>Auskunftsrecht:</strong> Sie können Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten verlangen.</li>
                <li><strong>Berichtigungsrecht:</strong> Sie können die Berichtigung unrichtiger Daten verlangen.</li>
                <li><strong>Löschungsrecht:</strong> Sie können die Löschung Ihrer personenbezogenen Daten verlangen.</li>
                <li><strong>Einschränkung der Verarbeitung:</strong> Sie können unter bestimmten Umständen die Einschränkung der Verarbeitung verlangen.</li>
                <li><strong>Datenübertragbarkeit:</strong> Sie können verlangen, dass wir Ihnen Ihre Daten in einem strukturierten Format aushändigen.</li>
                <li><strong>Widerspruchsrecht:</strong> Sie können der Verarbeitung Ihrer Daten widersprechen.</li>
                <li><strong>Beschwerderecht:</strong> Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.</li>
              </ul>
              <p className="mt-4">
                Für die Ausübung Ihrer Rechte wenden Sie sich bitte an die im Impressum angegebenen Kontaktdaten.
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Stand: {new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Datenschutz;
