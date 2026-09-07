import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { Testimonials } from "@/components/Testimonials";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";
import { PortfolioTheme } from "@/components/PortfolioTheme";
import { Gallery } from "@/components/Gallery";
import { Experience } from "@/components/Experience";
import { getContent } from "@/lib/storage";
import config from "../../portfolio.config";

export default async function Home() {
  const { settings, hero, projects, testimonials, filters } = await getContent();
  const sortedProjects = [...projects].sort((a, b) => a.priority - b.priority);
  return (
    <PortfolioTheme palette={config.theme.palette} fonts={config.theme.fonts} customColors={config.theme.customColors}>
      <main id="main-content">
        <Navigation settings={settings} />
        {config.sections.hero && <Hero settings={settings} hero={hero} />}
        {config.sections.about && <About settings={settings} />}
        {config.sections.experience && <Experience items={config.experiences ?? []} />}
        {config.sections.services && <Services />}
        {config.sections.portfolio && <Portfolio projects={sortedProjects} filters={filters} />}
        {config.sections.gallery && <Gallery items={config.gallery ?? []} />}
        {config.sections.testimonials && <Testimonials testimonials={testimonials} />}
        {config.sections.contact && <ContactCTA settings={settings} />}
        <Footer settings={settings} />
      </main>
    </PortfolioTheme>
  );
}
