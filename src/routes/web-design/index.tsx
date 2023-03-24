import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import desktopDecoration from "~/assets/web-design/desktop/bg-pattern-intro-web.svg";
import projectImage5 from "~/assets/web-design/desktop/image-blogr.webp";
import projectImage4 from "~/assets/web-design/desktop/image-builder.webp";
import projectImage6 from "~/assets/web-design/desktop/image-camp.webp";
import projectImage1 from "~/assets/web-design/desktop/image-express.webp";
import projectImage3 from "~/assets/web-design/desktop/image-photon.webp";
import projectImage2 from "~/assets/web-design/desktop/image-transfer.webp";
import { DesignPageHero, preloads } from "~/components/design-page-hero";
import { ProjectsShowcaseSection } from "~/components/projects-showcase-section";
import { ServicesSection } from "~/components/services-section";

export const projects = [
  {
    title: "Express",
    description: "A multi-carrier shipping website for ecommerce businesses",
    image: projectImage1,
  },
  {
    title: "Transfer",
    description:
      "Site for low-cost money transfers and sending money within seconds",
    image: projectImage2,
  },
  {
    title: "Photon",
    description:
      "A state-of-the-art music player with high-resolution audio and DSP effects",
    image: projectImage3,
  },
  {
    title: "Builder",
    description:
      "Connects users with local contractors based on their location",
    image: projectImage4,
  },
  {
    title: "Blogr",
    description:
      "Blogr is a platform for creating an online blog or publication",
    image: projectImage5,
  },
  {
    title: "Camp",
    description:
      "Get expert training in coding, data, design, and digital marketing",
    image: projectImage6,
  },
];

export default component$(() => {
  return (
    <div class="flex flex-col space-b-32 desktop:space-b-40">
      <DesignPageHero
        title="Web Design"
        text="We build websites that serve as powerful marketing tools and bring memorable brand experiences."
        desktopDecoration={desktopDecoration}
        desktopClass="desktop:object-right"
      />
      <ProjectsShowcaseSection projects={projects} />
      <ServicesSection omitService="web-design" />
    </div>
  );
});

export const head: DocumentHead = () => {
  return {
    title: "Web Design - Designo",
    links: [...preloads(desktopDecoration)],
  };
};
