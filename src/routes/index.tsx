import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import friendlyImage from "~/assets/home/desktop/illustration-friendly.svg";
import passionateImage from "~/assets/home/desktop/illustration-passionate.svg";
import resourcefulImage from "~/assets/home/desktop/illustration-resourceful.svg";
import heroImg from "~/assets/home/desktop/image-hero-phone.webp";
import bgPattern from "~/assets/shared/desktop/bg-pattern-small-circle.svg";
import { LinkButton } from "~/components/link-button";
import { Section } from "~/components/section";
import { ServicesSection } from "~/components/services-section";

export default component$(() => {
  return (
    <div class="flex flex-col space-b-32 desktop:space-b-40">
      <Hero />
      <ServicesSection />
      <WhyDesignoSection />
    </div>
  );
});

export const HeroBackgroundPattern = component$(() => {
  return (
    <svg
      class={[
        "absolute inset-block-25 inline-start-0",
        "tablet:-inline-end-32 tablet:inline-start-auto",
        "desktop:bs-full desktop:min-is-min desktop:inset-block-0 desktop:inline-end-0",
      ]}
      width="640"
      height="639"
      viewBox="0 0 640 639"
      aria-hidden="true"
    >
      <defs>
        <linearGradient x1="0%" y1="50%" x2="100%" y2="50%" id="a">
          <stop stop-color="#5D0202" stop-opacity="0" offset="0%" />
          <stop stop-color="#5D0202" stop-opacity=".498" offset="100%" />
        </linearGradient>
      </defs>
      <circle
        fill="url(#a)"
        transform="matrix(0 -1 -1 0 640 640)"
        cx="320"
        cy="320"
        r="320"
        fill-rule="evenodd"
        opacity=".309"
      />
    </svg>
  );
});

export const Hero = component$(() => {
  return (
    <Section variant="full">
      <div
        class={[
          "relative flex flex-col items-center overflow-hidden bg-peach is-full pli-6 pbs-20",
          "tablet:rounded-2xl tablet:pli-14 tablet:pbs-14",
          "desktop:flex-row desktop:plb-36 desktop:pli-24",
        ]}
      >
        <HeroBackgroundPattern />
        <div
          class={[
            "z-10 flex flex-col items-center text-center text-white",
            "tablet:max-is-xl desktop:items-start desktop:text-start",
          ]}
        >
          <h1 class="text-h3 tablet:text-h1">
            Award-winning custom designs and digital branding solutions
          </h1>
          <p
            class={[
              "text-body2 mbs-3.5",
              "tablet:text-body tablet:max-is-[444px] tablet:mbs-6",
            ]}
          >
            With over 10 years in the industry, we are experienced in creating
            fully responsive websites, app design, and engaging brand
            experiences. Find out more about our services.
          </p>
          <div class="mbs-6 tablet:mbs-5 desktop:mbs-10">
            <LinkButton href="/about">
              Learn more <span class="sr-only">about us</span>
            </LinkButton>
          </div>
        </div>
        <div
          class={[
            "relative bs-93 mli-auto mbs-20",
            "tablet:bs-96 tablet:mbs-17",
            "desktop:bs-[16rem]",
          ]}
        >
          <img
            class="drop-shadow-hero is-full max-is-max desktop:-translate-y-24"
            src={heroImg}
            alt=""
            width={280}
            height={573}
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </Section>
  );
});

export const WhyDesignoSection = component$(() => {
  const reasons = [
    {
      title: "Passionate",
      description:
        "Each project starts with an in-depth brand research to ensure we only create products that serve a purpose. We merge art, design, and technology into exciting new solutions.",
      image: passionateImage,
    },
    {
      title: "Resourceful",
      description:
        "Everything that we do has a strategic purpose. We use an agile approach in all of our projects and value customer collaboration. It guarantees superior results that fulfill our clients' needs.",
      image: resourcefulImage,
    },
    {
      title: "Friendly",
      description:
        "We are a group of enthusiastic folks who know how to put people first. Our success depends on our customers, and we strive to give them the best experience a company can provide.",
      image: friendlyImage,
    },
  ];
  return (
    <Section>
      <div>
        <h2 class="sr-only">Why Designo</h2>
        <ul
          class={[
            "flex flex-col items-center text-center space-b-20",
            "tablet:text-start",
            "desktop:flex-row desktop:text-center desktop:space-b-0 desktop:space-i-8",
          ]}
        >
          {reasons.map((reason, index) => (
            <li
              key={reason.title}
              class={[
                "flex flex-col space-b-12",
                "tablet:flex-row tablet:items-center tablet:space-b-0 tablet:space-i-12",
                "desktop:flex-1 desktop:flex-col desktop:space-b-12 desktop:space-i-0",
              ]}
            >
              <div class={["relative flex justify-center", "tablet:shrink-0"]}>
                <img
                  class={[
                    "absolute -z-10",
                    index === 1 ? "-rotate-90" : index === 2 ? "rotate-90" : "",
                  ]}
                  src={bgPattern}
                  alt=""
                  width={200}
                  height={200}
                  loading="lazy"
                  decoding="async"
                />
                <img
                  src={reason.image}
                  alt=""
                  width={200}
                  height={200}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div
                class={["space-b-8", "tablet:space-b-4", "desktop:space-b-8"]}
              >
                <h3 class="text-h5 uppercase">{reason.title}</h3>
                <p class="">{reason.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
});

export const head: DocumentHead = () => {
  return {
    links: [
      { rel: "preload", href: heroImg, as: "image", fetchpriority: "high" },
    ],
  };
};
