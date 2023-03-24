import { component$ } from "@builder.io/qwik";
import bgPattern from "~/assets/shared/desktop/bg-pattern-small-circle.svg";
import auImage from "~/assets/shared/desktop/illustration-australia.svg";
import caImage from "~/assets/shared/desktop/illustration-canada.svg";
import ukImage from "~/assets/shared/desktop/illustration-united-kingdom.svg";
import { LinkButton } from "~/components/link-button";
import { Section } from "~/components/section";

export const locations = [
  { key: "CA", name: "Canada", image: caImage },
  { key: "AU", name: "Australia", image: auImage },
  { key: "UK", name: "United Kingdom", image: ukImage },
];

export const LocationsSection = component$(() => {
  return (
    <Section>
      <h2 class="sr-only">Locations</h2>
      <ul
        role="list"
        class="grid grid-cols-1 gap-y-12 tablet:gap-y-20 desktop:grid-cols-3"
      >
        {locations.map((location, index) => (
          <li key={location.key}>
            <article class="flex flex-col items-center space-b-12">
              <div class="relative">
                <img
                  class={[
                    "absolute -z-10",
                    index === 0 ? "rotate-90" : index === 2 ? "-rotate-90" : "",
                  ]}
                  src={bgPattern}
                  alt=""
                  width={200}
                  height={200}
                  loading="lazy"
                  decoding="async"
                />
                <img
                  src={location.image}
                  alt=""
                  loading="lazy"
                  width={200}
                  height={200}
                  decoding="async"
                />
              </div>
              <div class="flex flex-col items-center text-center space-b-8">
                <h3 class="text-h5 uppercase">{location.name}</h3>
                <LinkButton href={`/locations#${location.key}`} variant="dark">
                  See location
                </LinkButton>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
});
