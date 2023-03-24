import { component$ } from "@builder.io/qwik";
import { Section } from "./section";

export interface GalleryProject {
  title: string;
  description: string;
  image: string;
}

export interface ProjectsShowcaseSectionProps {
  projects: Array<GalleryProject>;
}

export const ProjectsShowcaseSection = component$(
  (props: ProjectsShowcaseSectionProps) => {
    return (
      <Section>
        <div class="grid gap-y-10 desktop:grid-cols-3 desktop:gap-8">
          {props.projects.map((project) => (
            <article
              key={project.title}
              class={[
                "group relative flex flex-col overflow-hidden rounded-2xl",
                "tablet:flex-row",
                "desktop:flex-col",
              ]}
            >
              <img
                class={[
                  "-z-10 object-cover transition-transform duration-500 group-hover:motion-safe:scale-105",
                  "tablet:is-1/2",
                  "desktop:is-full",
                ]}
                src={project.image}
                alt=""
                loading="lazy"
                width={700}
                height={640}
                decoding="async"
              />
              <div
                class={[
                  "flex flex-col items-center bg-cream p-8 text-center transition-colors duration-500 space-b-4",
                  "group-hover:bg-peach group-hover:text-white",
                  "tablet:flex-1 tablet:justify-center",
                ]}
              >
                <h3 class="text-h5 uppercase text-peach transition-colors duration-500 group-hover:text-white">
                  <a
                    href={`#${project.title}`}
                    class="after:absolute after:inset-0"
                  >
                    {project.title}
                  </a>
                </h3>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
    );
  }
);
