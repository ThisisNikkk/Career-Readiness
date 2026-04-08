import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import WhyUs from "./components/WhyUs";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      <Header />
      <Hero />
      <WhyUs />
      <About />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
