import { component$ } from "@builder.io/qwik";
import clsx from "clsx";
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
    const { projects } = props;
    return (
      <Section>
        <div className="grid gap-y-10 desktop:grid-cols-3 desktop:gap-8">
          {projects.map((project) => (
            <article
              key={project.title}
              class={clsx(
                "relative flex flex-col rounded-2xl overflow-hidden group",
                "tablet:flex-row",
                "desktop:flex-col"
              )}
            >
              <img
                class={clsx(
                  "object-cover -z-10 group-hover:motion-safe:scale-105 transition-transform duration-500",
                  "tablet:is-1/2",
                  "desktop:is-full"
                )}
                src={project.image}
                alt=""
                width={700}
                height={640}
              />
              <div
                class={clsx(
                  "flex flex-col items-center space-b-4 bg-cream text-center p-8 transition-colors duration-500",
                  "group-hover:bg-peach group-hover:text-white",
                  "tablet:justify-center tablet:flex-1"
                )}
              >
                <h3 class="text-peach group-hover:text-white text-h5 uppercase transition-colors duration-500">
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
