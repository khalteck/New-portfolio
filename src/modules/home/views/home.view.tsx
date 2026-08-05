import { AboutSection } from "../components/about-section";
import { ContactFooter } from "../components/contact-footer";
import { ExperienceSection } from "../components/experience-section";
import { HeroSection } from "../components/hero-section";
import { PhilosophyStatement } from "../components/philosophy-statement";
import { SelectedProjectsSection } from "../components/selected-projects-section";
import { TechnologyStackSection } from "../components/technology-stack-section";

export function HomeView() {
  return (
    <>
      <main id="main-content">
        <HeroSection />
        <PhilosophyStatement />
        <AboutSection />
        <TechnologyStackSection />
        <ExperienceSection />
        <SelectedProjectsSection />
      </main>
      <ContactFooter />
    </>
  );
}

export default HomeView;
