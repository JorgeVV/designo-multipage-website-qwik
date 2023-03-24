import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import desktopDecoration from "~/assets/graphic-design/desktop/bg-pattern-intro-graphic.svg";
import projectImage2 from "~/assets/graphic-design/desktop/image-boxed-water.webp";
import projectImage1 from "~/assets/graphic-design/desktop/image-change.webp";
import projectImage3 from "~/assets/graphic-design/desktop/image-science.webp";
import { DesignPageHero, preloads } from "~/components/design-page-hero";
import { ProjectsShowcaseSection } from "~/components/projects-showcase-section";
import { ServicesSection } from "~/components/services-section";

export const projects = [
  {
    title: "Tim Brown",
    description: "A book cover designed for Tim Brown’s new release, ‘Change’",
    image: projectImage1,
  },
  {
    title: "Boxed Water",
    description: "A simple packaging concept made for Boxed Water",
    image: projectImage2,
  },
  {
    title: "Science!",
    description: "A poster made in collaboration with the Federal Art Project",
    image: projectImage3,
  },
];

export default component$(() => {
  return (
    <div class="flex flex-col space-b-32 desktop:space-b-40">
      <DesignPageHero
        title="Graphic Design"
        text="We deliver eye-catching branding materials that are tailored to meet your business objectives."
        desktopDecoration={desktopDecoration}
        desktopClass="desktop:object-[-25%_center]"
      />
      <ProjectsShowcaseSection projects={projects} />
      <ServicesSection omitService="graphic-design" />
    </div>
  );
});

export const head: DocumentHead = () => {
  return {
    title: "Graphic Design - Designo",
    links: [...preloads(desktopDecoration)],
  };
};
