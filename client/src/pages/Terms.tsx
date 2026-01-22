import { CONTACT_EMAIL, WEBSITE_URL, EFFECTIVE_DATE } from "@/lib/config";
import { Link } from "wouter";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-primary hover:opacity-80">
            Tutor Atlas
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
          <h1 className="text-4xl font-bold mb-2">Terms of Use</h1>

          <p className="text-sm text-muted-foreground mb-8">
            <strong>Effective date:</strong> {EFFECTIVE_DATE}
          </p>

          <p className="mb-8">
            These Terms of Use ("Terms") govern your access to and use of the Tutor Atlas website at <strong>{WEBSITE_URL}</strong> (the "Site"). By accessing or using the Site, you agree to these Terms.
          </p>

          <p className="mb-8 font-semibold">
            If you do not agree, please do not use the Site.
          </p>

          <hr className="my-8" />

          <h2 className="text-2xl font-bold mt-10 mb-4">1. About Tutor Atlas</h2>
          <p className="mb-6">Tutor Atlas is currently in concept validation and early access stage. The Site provides information about Tutor Atlas and allows you to submit your details for early access, interviews, and related updates.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">2. Use of the Site</h2>
          <p className="mb-4">You agree to use the Site lawfully and not to:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Submit false or misleading information</li>
            <li>Attempt to disrupt or compromise the Site (e.g., hacking, scraping, spamming)</li>
            <li>Upload or transmit malicious code</li>
          </ul>
          <p className="mb-6">We may restrict access to the Site or its forms if we suspect misuse.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">3. Early access and interviews</h2>
          <p className="mb-6">Submitting your details does not guarantee admission into any early access program. We may select participants based on availability and research needs.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">4. Intellectual property</h2>
          <p className="mb-6">All content on the Site (including text, logos, and designs) is owned by or licensed to Tutor Atlas and is protected by applicable laws. You may not reproduce or distribute Site content without our permission, except for personal, non-commercial viewing.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">5. No professional advice</h2>
          <p className="mb-6">The Site is provided for general informational purposes only. Nothing on the Site constitutes professional advice.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">6. Disclaimers</h2>
          <p className="mb-4">The Site is provided on an "as is" and "as available" basis. To the maximum extent permitted by law:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>We do not warrant that the Site will be uninterrupted, secure, or error-free</li>
            <li>We do not warrant that any information on the Site is complete, accurate, or up to date</li>
          </ul>
          <p className="mb-6">Where the Site references commute estimates (e.g., in product descriptions), such estimates are illustrative and may vary based on real-world conditions and third-party data sources.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">7. Limitation of liability</h2>
          <p className="mb-6">To the maximum extent permitted by law, Tutor Atlas will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenue, arising from or related to your use of the Site.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">8. Privacy</h2>
          <p className="mb-6">Your submission of personal data is governed by our Privacy Policy / Data Protection Notice at <Link href="/privacy" className="text-primary hover:underline">/privacy</Link>, which is incorporated into these Terms by reference.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">9. Changes to the Site and Terms</h2>
          <p className="mb-6">We may update the Site and these Terms from time to time. The updated Terms will be posted on the Site with a new effective date. Your continued use of the Site after changes means you accept the updated Terms.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">10. Governing law</h2>
          <p className="mb-6">These Terms are governed by the laws of Singapore. You agree to submit to the exclusive jurisdiction of the Singapore courts.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">11. Contact</h2>
          <p className="mb-4">If you have questions about these Terms, contact us at:</p>
          <p className="font-mono text-sm bg-muted p-4 rounded mb-8">
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>

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
          <p>&copy; 2025 Tutor Atlas. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
