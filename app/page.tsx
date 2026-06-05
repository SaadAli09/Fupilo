import { globalStyles } from "@/components/styles";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Dashboard from "@/components/Dashboard";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
    <style>{globalStyles}</style>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Dashboard />
      </main>
      <Footer />
    </>
  );
}