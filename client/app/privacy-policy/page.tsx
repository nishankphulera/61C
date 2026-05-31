import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Privacy & Cookies Policy | 61C Studios",
  description: "Privacy & Cookies Policy for 61C Studios UK LTD.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="relative min-h-screen bg-black text-white font-sans">
      <Header />

      <main className="relative mx-auto max-w-4xl px-6 pb-24 pt-[8rem] md:pt-[10rem] md:px-10">
        <h1 className="text-4xl font-extrabold uppercase tracking-tight text-[#F7E509] md:text-5xl lg:text-6xl">
          Privacy & Cookies Policy
        </h1>
        <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-white/50">
          Last Updated: May 2026
        </p>

        <div className="mt-12 space-y-6 text-lg leading-relaxed text-white/80">
          <p>
            At 61C Studios UK LTD, we are committed to protecting your privacy and handling your personal information responsibly, transparently, and securely.
          </p>
          <p>
            This Privacy & Cookies Policy explains how we collect, use, process, and protect your personal data when you interact with our website, services, productions, communications, and creative projects.
          </p>
          <p>
            By using our website or engaging with our services, you agree to the practices outlined in this policy.
          </p>
        </div>

        {/* Section 1 */}
        <section className="mt-16" aria-labelledby="section-1">
          <h2 id="section-1" className="border-b border-white/10 pb-3 text-2xl font-bold uppercase tracking-wide text-[#F7E509] md:text-3xl">
            1. Principles of Our Privacy Policy
          </h2>
          <div className="mt-8 space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-white">1.1 Privacy</h3>
              <p className="mt-2 text-white/80 leading-relaxed">
                We do not sell, rent, or trade personal information to third parties. Any sharing of data is limited to what is necessary for operational, contractual, legal, or production-related purposes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">1.2 Security</h3>
              <p className="mt-2 text-white/80 leading-relaxed">
                We implement appropriate technical and organisational safeguards to protect your information from unauthorised access, misuse, disclosure, loss, or alteration.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">1.3 Transparency</h3>
              <p className="mt-2 text-white/80 leading-relaxed">
                We are committed to being transparent about the information we collect and how it is used.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">1.4 Data Minimisation</h3>
              <p className="mt-2 text-white/80 leading-relaxed">
                We only collect personal data that is relevant and necessary for the purposes described in this policy.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">1.5 Your Rights</h3>
              <p className="mt-2 text-white/80 leading-relaxed">
                You have rights under UK GDPR and applicable data protection laws, including rights to access, update, correct, or request deletion of your personal data.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">1.6 Data Controller</h3>
              <p className="mt-2 text-white/80 leading-relaxed">
                61C Studios UK LTD acts as the data controller for personal information processed through our business operations and website.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mt-16" aria-labelledby="section-2">
          <h2 id="section-2" className="border-b border-white/10 pb-3 text-2xl font-bold uppercase tracking-wide text-[#F7E509] md:text-3xl">
            2. Company Information
          </h2>
          <div className="mt-6 text-lg leading-relaxed text-white/80">
            <p className="font-bold text-white">61C Studios UK LTD</p>
            <p>71-75 Shelton Street</p>
            <p>Covent Garden</p>
            <p>London WC2H 9JQ</p>
            <p>United Kingdom</p>
            <p className="mt-4">
              Email:{" "}
              <a href="mailto:admin@61cstudios.com" className="text-[#F7E509] underline hover:text-[#F7E509]/80 transition-colors">
                admin@61cstudios.com
              </a>
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mt-16" aria-labelledby="section-3">
          <h2 id="section-3" className="border-b border-white/10 pb-3 text-2xl font-bold uppercase tracking-wide text-[#F7E509] md:text-3xl">
            3. What Information We Collect
          </h2>
          <p className="mt-6 text-lg text-white/80 leading-relaxed">
            The information we collect depends on how you interact with us.
          </p>
          <div className="mt-8 space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-white">3.1 Website Enquiries & Contact Forms</h3>
              <p className="mt-2 text-white/80">
                When you contact us through our website, email, or enquiry forms, we may collect:
              </p>
              <ul className="mt-3 list-disc pl-6 space-y-1.5 text-white/80">
                <li>Name</li>
                <li>Email address</li>
                <li>Telephone number</li>
                <li>Company name</li>
                <li>Project information</li>
                <li>Budget information</li>
                <li>Creative requirements</li>
                <li>Any information voluntarily submitted by you</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">3.2 Client & Business Information</h3>
              <p className="mt-2 text-white/80">
                When working with clients, collaborators, agencies, suppliers, or partners, we may process:
              </p>
              <ul className="mt-3 list-disc pl-6 space-y-1.5 text-white/80">
                <li>Contact information</li>
                <li>Billing information</li>
                <li>Business addresses</li>
                <li>Contracts and agreements</li>
                <li>Production schedules</li>
                <li>Creative briefs</li>
                <li>Project communications</li>
                <li>Payment information</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">3.3 Website Usage & Analytics</h3>
              <p className="mt-2 text-white/80">
                We may automatically collect technical information including:
              </p>
              <ul className="mt-3 list-disc pl-6 space-y-1.5 text-white/80">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Device information</li>
                <li>Operating system</li>
                <li>Website pages visited</li>
                <li>Time spent on pages</li>
                <li>Referral sources</li>
                <li>General location data</li>
              </ul>
              <p className="mt-3 text-white/70 text-base">
                This helps us improve website performance, functionality, and marketing effectiveness.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="mt-16" aria-labelledby="section-4">
          <h2 id="section-4" className="border-b border-white/10 pb-3 text-2xl font-bold uppercase tracking-wide text-[#F7E509] md:text-3xl">
            4. Photography, Film & Content Production Privacy Notice
          </h2>
          <p className="mt-6 text-lg text-white/80 leading-relaxed">
            As a creative production company, 61C Studios UK LTD may capture, process, store, edit, and distribute photography, video, audio, and related media content during the delivery of our services.
          </p>
          <p className="mt-4 text-lg text-white/80 leading-relaxed">
            This section explains how personal data may be processed within productions, shoots, campaigns, events, and creative projects.
          </p>
          <div className="mt-8 space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-white">4.1 Production Content We May Capture</h3>
              <p className="mt-2 text-white/80">
                Depending on the nature of the project, we may capture:
              </p>
              <ul className="mt-3 list-disc pl-6 space-y-1.5 text-white/80">
                <li>Photographs</li>
                <li>Video footage</li>
                <li>Audio recordings</li>
                <li>Behind-the-scenes content</li>
                <li>Interviews and testimonials</li>
                <li>Event coverage</li>
                <li>Social media content</li>
                <li>Livestream content</li>
                <li>Drone footage (where applicable and legally permitted)</li>
              </ul>
              <p className="mt-3 text-white/70 text-base">
                This may include identifiable individuals, employees, guests, customers, contributors, performers, or members of the public.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">4.2 Purpose of Captured Content</h3>
              <p className="mt-2 text-white/80">
                Captured content may be used for purposes including:
              </p>
              <ul className="mt-3 list-disc pl-6 space-y-1.5 text-white/80">
                <li>Client deliverables</li>
                <li>Commercial campaigns</li>
                <li>Advertising and marketing</li>
                <li>Social media content</li>
                <li>Editorial and promotional use</li>
                <li>Portfolio and showreel use</li>
                <li>Website publication</li>
                <li>Press and PR activity</li>
                <li>Internal presentations</li>
                <li>Award submissions</li>
                <li>Archival documentation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">4.3 Legal Basis for Processing</h3>
              <p className="mt-2 text-white/80">
                We process production-related personal data based on one or more of the following lawful bases:
              </p>
              <ul className="mt-3 list-disc pl-6 space-y-1.5 text-white/80">
                <li>Contractual necessity</li>
                <li>Legitimate business interests</li>
                <li>Consent</li>
                <li>Legal obligations</li>
                <li>Public interest where applicable</li>
              </ul>
              <p className="mt-3 text-white/75 text-base">
                Where consent is required, we will seek appropriate permission directly or through the client, production organiser, agency, venue, or event organiser.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">4.4 Client Responsibility</h3>
              <p className="mt-2 text-white/80 leading-relaxed">
                Where clients engage 61C Studios UK LTD to capture content involving employees, talent, attendees, customers, or participants, clients may be responsible for ensuring that appropriate permissions, notices, releases, or consents have been obtained where legally required.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">4.5 Public & Event Photography</h3>
              <p className="mt-2 text-white/80 leading-relaxed">
                For public events, hospitality environments, launches, activations, exhibitions, or large-scale productions, photography and filming may take place in areas where individuals are incidentally captured.
              </p>
              <p className="mt-3 text-white/80 leading-relaxed">
                Reasonable efforts may be made to display signage or provide notice where appropriate.
              </p>
              <p className="mt-3 text-white/80 leading-relaxed">
                Individuals who do not wish to appear in captured content may contact production staff where reasonably practical.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">4.6 Talent, Contributors & Model Releases</h3>
              <p className="mt-2 text-white/80 leading-relaxed">
                For commercial campaigns, branded productions, interviews, or featured appearances, we may use model releases, contributor agreements, or appearance consent forms where appropriate.
              </p>
              <p className="mt-3 text-white/80 leading-relaxed">
                These agreements may grant rights for usage, distribution, editing, publication, and promotional use of captured content.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">4.7 Content Storage & Retention</h3>
              <p className="mt-2 text-white/80 leading-relaxed">
                Production files, photographs, raw footage, edited deliverables, and related media assets may be securely stored for operational, archival, backup, portfolio, legal, or contractual purposes.
              </p>
              <p className="mt-3 text-white/85">
                Retention periods may vary depending on:
              </p>
              <ul className="mt-2 list-disc pl-6 space-y-1.5 text-white/80">
                <li>Client agreements</li>
                <li>Licensing terms</li>
                <li>Legal requirements</li>
                <li>Project type</li>
                <li>Archival or creative needs</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">4.8 Third-Party Platforms & Distribution</h3>
              <p className="mt-2 text-white/80 leading-relaxed">
                Content created by 61C Studios UK LTD may be published or distributed through:
              </p>
              <ul className="mt-3 list-disc pl-6 space-y-1.5 text-white/80">
                <li>Client platforms</li>
                <li>Social media platforms</li>
                <li>Streaming services</li>
                <li>Advertising platforms</li>
                <li>Broadcast platforms</li>
                <li>Websites</li>
                <li>Press and media outlets</li>
              </ul>
              <p className="mt-3 text-white/75 text-base">
                Once published externally, control over content may be subject to the policies and terms of those third-party platforms.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">4.9 AI, Editing & Creative Processing</h3>
              <p className="mt-2 text-white/80 leading-relaxed">
                Creative content may undergo editing, colour grading, retouching, resizing, formatting, transcription, enhancement, or other post-production processing.
              </p>
              <p className="mt-3 text-white/80 leading-relaxed">
                Certain workflows may involve cloud-based production, collaboration, or AI-assisted creative tools where appropriate and lawful.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="mt-16" aria-labelledby="section-5">
          <h2 id="section-5" className="border-b border-white/10 pb-3 text-2xl font-bold uppercase tracking-wide text-[#F7E509] md:text-3xl">
            5. How We Use Your Information
          </h2>
          <p className="mt-4 text-white/80">
            We may use personal data to:
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-1.5 text-white/80">
            <li>Respond to enquiries</li>
            <li>Provide quotations and proposals</li>
            <li>Deliver creative and production services</li>
            <li>Manage projects and communications</li>
            <li>Process payments and contracts</li>
            <li>Improve our website and services</li>
            <li>Send marketing communications</li>
            <li>Maintain business records</li>
            <li>Protect against fraud, misuse, or security threats</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="mt-16" aria-labelledby="section-6">
          <h2 id="section-6" className="border-b border-white/10 pb-3 text-2xl font-bold uppercase tracking-wide text-[#F7E509] md:text-3xl">
            6. Marketing Communications
          </h2>
          <p className="mt-4 text-white/80">
            Where legally permitted, we may send information about:
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-1.5 text-white/80">
            <li>Services</li>
            <li>New projects</li>
            <li>Creative work</li>
            <li>Case studies</li>
            <li>Promotions</li>
            <li>Industry updates</li>
          </ul>
          <p className="mt-6 text-white/80">
            You may opt out at any time by contacting:{" "}
            <a href="mailto:admin@61cstudios.com" className="text-[#F7E509] underline hover:text-[#F7E509]/80 transition-colors">
              admin@61cstudios.com
            </a>
          </p>
        </section>

        {/* Section 7 */}
        <section className="mt-16" aria-labelledby="section-7">
          <h2 id="section-7" className="border-b border-white/10 pb-3 text-2xl font-bold uppercase tracking-wide text-[#F7E509] md:text-3xl">
            7. Sharing Your Information
          </h2>
          <p className="mt-4 text-white/80">
            We may share personal information with trusted third parties where necessary, including:
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-1.5 text-white/80">
            <li>Production partners</li>
            <li>Freelancers and contractors</li>
            <li>Cloud storage providers</li>
            <li>Website and IT providers</li>
            <li>Editing and post-production teams</li>
            <li>Legal and financial advisers</li>
            <li>Marketing and analytics providers</li>
          </ul>
          <p className="mt-4 text-white/70 text-base">
            All third parties are expected to handle personal information securely and lawfully.
          </p>
        </section>

        {/* Section 8 */}
        <section className="mt-16" aria-labelledby="section-8">
          <h2 id="section-8" className="border-b border-white/10 pb-3 text-2xl font-bold uppercase tracking-wide text-[#F7E509] md:text-3xl">
            8. Cookies
          </h2>
          <p className="mt-4 text-white/80">
            Our website may use cookies and related technologies to:
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-1.5 text-white/80">
            <li>Improve user experience</li>
            <li>Analyse website traffic</li>
            <li>Monitor website performance</li>
            <li>Support marketing and advertising activity</li>
          </ul>
          <p className="mt-4 text-white/80">
            You can manage or disable cookies through your browser settings.
          </p>
        </section>

        {/* Section 9 */}
        <section className="mt-16" aria-labelledby="section-9">
          <h2 id="section-9" className="border-b border-white/10 pb-3 text-2xl font-bold uppercase tracking-wide text-[#F7E509] md:text-3xl">
            9. Data Security
          </h2>
          <p className="mt-4 text-white/80">
            We implement appropriate safeguards to protect personal information and production assets from:
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-1.5 text-white/80">
            <li>Unauthorised access</li>
            <li>Accidental loss</li>
            <li>Misuse</li>
            <li>Disclosure</li>
            <li>Alteration</li>
            <li>Destruction</li>
          </ul>
          <p className="mt-4 text-white/70 text-base">
            However, no digital transmission or storage method can be guaranteed to be completely secure.
          </p>
        </section>

        {/* Section 10 */}
        <section className="mt-16" aria-labelledby="section-10">
          <h2 id="section-10" className="border-b border-white/10 pb-3 text-2xl font-bold uppercase tracking-wide text-[#F7E509] md:text-3xl">
            10. International Data Transfers
          </h2>
          <p className="mt-4 text-white/80 leading-relaxed">
            Some service providers or platforms used by 61C Studios UK LTD may process data outside the United Kingdom or EEA.
          </p>
          <p className="mt-3 text-white/80 leading-relaxed">
            Where this occurs, appropriate legal safeguards will be implemented in accordance with UK GDPR requirements.
          </p>
        </section>

        {/* Section 11 */}
        <section className="mt-16" aria-labelledby="section-11">
          <h2 id="section-11" className="border-b border-white/10 pb-3 text-2xl font-bold uppercase tracking-wide text-[#F7E509] md:text-3xl">
            11. Data Retention
          </h2>
          <p className="mt-4 text-white/80">
            We retain personal data only for as long as reasonably necessary to:
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-1.5 text-white/80">
            <li>Deliver our services</li>
            <li>Fulfil contractual obligations</li>
            <li>Meet legal or accounting requirements</li>
            <li>Maintain archives and backups</li>
            <li>Protect legitimate business interests</li>
          </ul>
        </section>

        {/* Section 12 */}
        <section className="mt-16" aria-labelledby="section-12">
          <h2 id="section-12" className="border-b border-white/10 pb-3 text-2xl font-bold uppercase tracking-wide text-[#F7E509] md:text-3xl">
            12. Your Rights
          </h2>
          <p className="mt-4 text-white/80">
            Under UK GDPR, you may have the right to:
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-1.5 text-white/80">
            <li>Access your personal data</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion</li>
            <li>Restrict processing</li>
            <li>Object to processing</li>
            <li>Withdraw consent</li>
            <li>Request portability of your data</li>
            <li>Lodge a complaint with the Information Commissioner’s Office (ICO)</li>
          </ul>
          <p className="mt-6 text-white/80">
            To exercise your rights, contact:{" "}
            <a href="mailto:admin@61cstudios.com" className="text-[#F7E509] underline hover:text-[#F7E509]/80 transition-colors">
              admin@61cstudios.com
            </a>
          </p>
          <p className="mt-3 text-white/80">
            ICO Website:{" "}
            <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-[#F7E509] underline hover:text-[#F7E509]/80 transition-colors">
              https://ico.org.uk
            </a>
          </p>
        </section>

        {/* Section 13 */}
        <section className="mt-16" aria-labelledby="section-13">
          <h2 id="section-13" className="border-b border-white/10 pb-3 text-2xl font-bold uppercase tracking-wide text-[#F7E509] md:text-3xl">
            13. Changes to This Policy
          </h2>
          <p className="mt-4 text-white/80 leading-relaxed">
            We may update this Privacy & Cookies Policy periodically to reflect operational, legal, or regulatory changes.
          </p>
          <p className="mt-3 text-white/80 leading-relaxed">
            Updated versions will be published on this page with a revised effective date.
          </p>
        </section>

        {/* Section 14 */}
        <section className="mt-16" aria-labelledby="section-14">
          <h2 id="section-14" className="border-b border-white/10 pb-3 text-2xl font-bold uppercase tracking-wide text-[#F7E509] md:text-3xl">
            14. Contact Information
          </h2>
          <div className="mt-6 text-lg leading-relaxed text-white/80">
            <p className="font-bold text-white">For questions regarding this policy or how your information is handled, please contact:</p>
            <p className="mt-3 font-semibold text-white">61C Studios UK LTD</p>
            <p>71-75 Shelton Street</p>
            <p>Covent Garden</p>
            <p>London WC2H 9JQ</p>
            <p>United Kingdom</p>
            <p className="mt-4">
              Email:{" "}
              <a href="mailto:admin@61cstudios.com" className="text-[#F7E509] underline hover:text-[#F7E509]/80 transition-colors">
                admin@61cstudios.com
              </a>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
