import type { Metadata } from "next";
import Header from "@/components/Header";
import ContactUsComponent from "@/components/ContactUsComponent";

export const metadata: Metadata = {
  title: "Contact | 61C Studios",
  description: "Get in touch with 61C Studios — UK & India studios, social links, and enquiries.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <ContactUsComponent />
    </div>
  );
}
