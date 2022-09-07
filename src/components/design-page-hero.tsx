import { component$ } from "@builder.io/qwik";
import clsx from "clsx";
import bgPatternMobile from "../assets/shared/mobile/bg-pattern-design-pages-intro-mobile.svg";
import bgPatternTablet from "../assets/shared/tablet/bg-pattern-design-pages-intro-tablet.svg";
import { Section } from "./section";

export interface DesignPageHeroProps {
  title: string;
  text: string;
  desktopDecoration: string;
  desktopClass?: string;
}

export const DesignPageHero = component$((props: DesignPageHeroProps) => {
  const { title, text, desktopDecoration, desktopClass } = props;
  return (
    <Section variant="full">
      <div
        class={clsx(
          "relative bg-peach is-full flex flex-col pli-6 items-center plb-26",
          "tablet:rounded-2xl tablet:plb-16 tablet:pli-14"
        )}
      >
        <picture>
          <source
            srcSet={`${desktopDecoration} 1440w`}
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
            class={clsx(
              "absolute inset-0 bs-full is-full object-none object-right-top",
              "tablet:object-[18%_center]",
              desktopClass
            )}
            src={bgPatternMobile}
            srcSet={`${bgPatternMobile} 375w`}
            alt=""
            width={876}
            height={584}
            loading="eager"
          />
        </picture>
        <div
          class={clsx(
            "flex flex-col items-center text-white text-center z-10",
            "tablet:max-is-xl"
          )}
        >
          <h1 class="text-h3 tablet:text-h1">{title}</h1>
          <p
            class={clsx(
              "text-body2 mbs-6",
              "tablet:mbs-6 tablet:text-body tablet:max-is-[444px]"
            )}
          >
            {text}
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
