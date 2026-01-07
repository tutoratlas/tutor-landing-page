import { CONTACT_EMAIL, DPO_EMAIL, WEBSITE_URL, EFFECTIVE_DATE } from "@/lib/config";
import { Link } from "wouter";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-primary hover:opacity-80">
            TutorAtlas
          </Link>
          <nav className="flex gap-6">
            <Link href="/" className="text-sm hover:text-primary transition-colors">
              Back to Home
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-16 max-w-3xl">
        <article className="prose prose-sm max-w-none">
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">
            Data Protection Notice (Singapore)
          </p>

          <p className="text-sm text-muted-foreground mb-8">
            <strong>Effective date:</strong> {EFFECTIVE_DATE}
          </p>

          <p className="mb-6">
            TutorAtlas ("we", "us", or "our") respects your privacy. This Privacy Policy / Data Protection Notice explains how we collect, use, disclose and protect your personal data when you visit our website at <strong>{WEBSITE_URL}</strong> and when you submit your details for early access, interviews, or updates.
          </p>

          <p className="mb-8 text-sm italic">
            This notice is intended to meet Singapore Personal Data Protection Act ("PDPA") requirements. It is written for clarity and does not affect your legal rights.
          </p>

          <hr className="my-8" />

          <h2 className="text-2xl font-bold mt-10 mb-4">1. What personal data we collect</h2>
          <p className="mb-4">When you submit a form on our site, we may collect:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Identity and contact information:</strong> your name, WhatsApp number, email address</li>
            <li><strong>Basic profile information you choose to provide:</strong> teaching hours (range), commuting hours (range), biggest pain point (selection), subjects you teach (free text), and any optional notes</li>
            <li><strong>Technical information:</strong> device type, browser information, pages viewed, and traffic attribution (e.g., UTM parameters), where available</li>
          </ul>
          <p className="mb-6">We do <strong>not</strong> ask for sensitive student personal data (e.g., full student home addresses, NRIC).</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">2. How we use your personal data</h2>
          <p className="mb-4">We collect, use and disclose your personal data for the following purposes:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>To <strong>contact you</strong> about early access, founding cohort participation, and user interviews</li>
            <li>To <strong>schedule and administer</strong> interviews and early access onboarding</li>
            <li>To <strong>understand tutor needs</strong> and improve our product concept and roadmap</li>
            <li>To respond to your enquiries and provide support</li>
            <li>To maintain website security and prevent misuse (e.g., spam prevention)</li>
          </ul>
          <p className="mb-6">If we wish to use your personal data for a new purpose not listed above, we will notify you and, where required, obtain your consent.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">3. Disclosure of your personal data</h2>
          <p className="mb-4">We may disclose your personal data:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>To our <strong>service providers</strong> who help us operate our website and systems (e.g., form processing, analytics, cloud hosting, CRM tools), only on a need-to-know basis</li>
            <li>If required by law, regulation, or legal process</li>
          </ul>
          <p className="mb-6">We do not sell your personal data.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">4. Marketing messages (optional)</h2>
          <p className="mb-6">If we offer an optional "receive updates" checkbox and you opt in, we may send you product updates. You may opt out at any time using the method provided in the message or by contacting us (see Section 9). If you do not opt in, we will only contact you for early access, interviews, and related administrative purposes.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">5. How we protect your personal data</h2>
          <p className="mb-4">We maintain reasonable security arrangements to protect your personal data, which may include:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Encryption in transit (HTTPS)</li>
            <li>Access controls and least-privilege access to stored leads</li>
            <li>Monitoring and basic anti-spam protections</li>
          </ul>
          <p className="mb-6">We may describe these as "industry-standard safeguards." We do not claim any specific certification unless formally obtained.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">6. Retention of your personal data</h2>
          <p className="mb-6">We retain personal data only for as long as necessary to fulfill the purposes described in this notice (or as required by law). When it is no longer needed, we will delete or anonymise it.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">7. Transfers outside Singapore</h2>
          <p className="mb-6">Our service providers may store or process personal data on servers located outside Singapore. Where applicable, we will take steps to ensure that your personal data receives a standard of protection comparable to that under the PDPA.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">8. Accuracy</h2>
          <p className="mb-6">If you provide personal data to us, please ensure it is accurate and complete, as this helps us contact you and administer your request.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">9. Your rights: access, correction, and withdrawal of consent</h2>
          <p className="mb-4">You may:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Request <strong>access</strong> to the personal data we hold about you</li>
            <li>Request <strong>correction</strong> of inaccuracies</li>
            <li><strong>Withdraw consent</strong> for our collection, use, or disclosure of your personal data</li>
          </ul>
          <p className="mb-4">To do so, please contact our Data Protection Officer ("DPO") at:</p>
          <p className="mb-6 font-mono text-sm bg-muted p-4 rounded">
            <strong>DPO Email:</strong> {DPO_EMAIL}
            <br />
            (Please include your name and the contact details you used when submitting the form.)
          </p>
          <p className="mb-6">If you withdraw consent, we may not be able to continue contacting you for early access or interviews, and we will inform you of any likely consequences.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">10. Cookies and analytics</h2>
          <p className="mb-6">We may use cookies or similar technologies for basic analytics and site performance. You can control cookies through your browser settings. If analytics are blocked, the site will still work.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">11. Third-party links</h2>
          <p className="mb-6">Our website may contain links to third-party sites. We are not responsible for their privacy practices.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">12. Updates to this notice</h2>
          <p className="mb-6">We may update this notice from time to time. The latest version will be posted on our website with the effective date.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">13. Contact</h2>
          <p className="mb-4">For questions about this notice, please contact:</p>
          <div className="bg-muted p-4 rounded mb-8">
            <p className="mb-2">
              <strong>TutorAtlas Contact Email:</strong> <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a>
            </p>
            <p>
              <strong>Data Protection Officer:</strong> <a href={`mailto:${DPO_EMAIL}`} className="text-primary hover:underline">{DPO_EMAIL}</a>
            </p>
          </div>

          <hr className="my-8" />

          <div className="mt-12 text-center">
            <Link href="/" className="text-primary hover:underline">
              ← Back to Home
            </Link>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 mt-16">
        <div className="container text-center text-sm">
          <p>&copy; 2025 TutorAtlas. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
