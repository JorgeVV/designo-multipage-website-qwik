import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import desktopDecoration from "~/assets/app-design/desktop/bg-pattern-intro-app.svg";
import projetImage1 from "~/assets/app-design/desktop/image-airfilter.webp";
import projetImage2 from "~/assets/app-design/desktop/image-eyecam.webp";
import projetImage3 from "~/assets/app-design/desktop/image-faceit.webp";
import projetImage5 from "~/assets/app-design/desktop/image-loopstudios.webp";
import projetImage4 from "~/assets/app-design/desktop/image-todo.webp";
import { DesignPageHero, preloads } from "~/components/design-page-hero";
import { ProjectsShowcaseSection } from "~/components/projects-showcase-section";
import { ServicesSection } from "~/components/services-section";

export const projects = [
  {
    title: "Airfilter",
    description:
      "Solving the problem of poor indoor air quality by filtering the air",
    image: projetImage1,
  },
  {
    title: "Eyecam",
    description:
      "Product that lets you edit your favorite photos and videos at any time",
    image: projetImage2,
  },
  {
    title: "Faceit",
    description:
      "Get to meet your favorite internet superstar with the faceit app",
    image: projetImage3,
  },
  {
    title: "Todo",
    description: "A todo app that features cloud sync with light and dark mode",
    image: projetImage4,
  },
  {
    title: "Loopstudios",
    description: "A VR experience app made for Loopstudios",
    image: projetImage5,
  },
];

export default component$(() => {
  return (
    <div class="flex flex-col space-b-32 desktop:space-b-40">
      <DesignPageHero
        title="App Design"
        text="Our mobile designs bring intuitive digital solutions to your customers right at their fingertips."
        desktopDecoration={desktopDecoration}
        desktopClass="desktop:object-[-25%_center]"
      />
      <ProjectsShowcaseSection projects={projects} />
      <ServicesSection omitService="app-design" />
    </div>
  );
});

export const head: DocumentHead = () => {
  return {
    title: "App Design - Designo",
    links: [...preloads(desktopDecoration)],
  };
};
