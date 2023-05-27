import { component$ } from "@builder.io/qwik";
import bgPatternMobile from "~/assets/shared/mobile/bg-pattern-design-pages-intro-mobile.svg";
import bgPatternTablet from "~/assets/shared/tablet/bg-pattern-design-pages-intro-tablet.svg";
import { Section } from "./section";

export interface DesignPageHeroProps {
  title: string;
  text: string;
  desktopDecoration: string;
  desktopClass?: string;
}

export const DesignPageHero = component$((props: DesignPageHeroProps) => {
  return (
    <Section variant="full">
      <div
        class={[
          "relative flex flex-col items-center bg-peach is-full plb-26 pli-6",
          "tablet:rounded-2xl tablet:plb-16 tablet:pli-14",
        ]}
      >
        <picture>
          <source
            srcSet={`${props.desktopDecoration} 1440w`}
            media="(min-width: 1440px)"
            width={876}
            height={584}
          />
          <source
            srcSet={`${bgPatternTablet} 768w`}
            media="(min-width: 768px)"
            width={876}
            height={584}
          />
          <img
            class={[
              "absolute inset-0 object-none object-right-top bs-full is-full",
              "tablet:object-[18%_center]",
              props.desktopClass,
            ]}
            src={bgPatternMobile}
            srcSet={`${bgPatternMobile} 375w`}
            alt=""
            width={876}
            height={584}
            loading="eager"
            decoding="async"
          />
        </picture>
        <div
          class={[
            "z-10 flex flex-col items-center text-center text-white",
            "tablet:max-is-xl",
          ]}
        >
          <h1 class="text-h3 tablet:text-h1">{props.title}</h1>
          <p
            class={[
              "text-body2 mbs-6",
              "tablet:text-body tablet:max-is-[444px] tablet:mbs-6",
            ]}
          >
            {props.text}
          </p>
        </div>
      </div>
    </Section>
  );
});

export const preloads = (desktopDecoration: string) => [
  {
    rel: "preload",
    href: bgPatternMobile,
    as: "image",
    media: "(max-width: 767.9px)",
    fetchpriority: "high",
  },
  {
    rel: "preload",
    href: bgPatternTablet,
    as: "image",
    media: "(min-width: 768px) and (max-width: 1439.9px)",
    fetchpriority: "high",
  },
  {
    rel: "preload",
    href: desktopDecoration,
    as: "image",
    media: "(min-width: 1440px)",
    fetchpriority: "high",
  },
];
