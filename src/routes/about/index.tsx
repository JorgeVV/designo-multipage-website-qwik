import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import heroDecorationTablet from "~/assets/about/desktop/bg-pattern-hero-about-desktop.svg";
import heroImageDesktop from "~/assets/about/desktop/image-about-hero.webp";
import realDealImageDesktop from "~/assets/about/desktop/image-real-deal.webp";
import wordClassImageDesktop from "~/assets/about/desktop/image-world-class-talent.webp";
import heroDecorationMobile from "~/assets/about/mobile/bg-pattern-hero-about-mobile.svg";
import heroImageMobile from "~/assets/about/mobile/image-about-hero.webp";
import realDealImageMobile from "~/assets/about/mobile/image-real-deal.webp";
import wordClassImageMobile from "~/assets/about/mobile/image-world-class-talent.webp";
import heroImageTablet from "~/assets/about/tablet/image-about-hero.webp";
import realDealImageTablet from "~/assets/about/tablet/image-real-deal.webp";
import wordClassImageTablet from "~/assets/about/tablet/image-world-class-talent.webp";
import bgPattern from "~/assets/shared/desktop/bg-pattern-three-circles.svg";
import { LocationsSection } from "~/components/locations-section";
import { Section } from "~/components/section";

export default component$(() => {
  return (
    <div class="flex flex-col space-b-32 desktop:space-b-40">
      <Hero />
      <WorldClassTalentSection />
      <LocationsSection />
      <RealDealSection />
    </div>
  );
});

export const Hero = component$(() => {
  return (
    <Section variant="full">
      <div
        class={[
          "flex flex-col overflow-hidden tablet:rounded-2xl",
          "desktop:flex-row-reverse",
        ]}
      >
        <picture>
          <source
            srcSet={`${heroImageDesktop} 1440w`}
            media="(min-width: 1440px)"
            width={476}
            height={480}
          />
          <source
            srcSet={`${heroImageTablet} 768w`}
            media="(min-width: 768px)"
            width={689}
            height={320}
          />
          <img
            class={[
              "object-cover bs-full is-full",
              "tablet:max-bs-[50%]",
              "desktop:bs-full desktop:max-bs-[480px] desktop:is-auto",
            ]}
            src={heroImageMobile}
            srcSet={`${heroImageMobile} 375w`}
            alt=""
            width={375}
            height={320}
            loading="eager"
            decoding="async"
          />
        </picture>
        <div
          class={[
            "relative overflow-hidden bg-peach is-full plb-20 pli-6",
            "tablet:plb-16 tablet:pli-14",
            "tablet:flex-1 desktop:flex-row desktop:plb-32 desktop:pie-20 desktop:pis-24",
          ]}
        >
          <picture>
            <source
              srcSet={`${heroDecorationTablet} 768w`}
              media="(min-width: 768px)"
              width={640}
              height={640}
            />
            <img
              class={[
                "absolute inset-0 object-none object-[100%_28%]",
                "tablet:object-cover tablet:object-center tablet:-block-start-[440px] tablet:-inline-start-28",
                "desktop:block-end-0 desktop:block-start-auto desktop:inline-end-0 desktop:inline-start-auto",
              ]}
              src={heroDecorationMobile}
              srcSet={`${heroDecorationMobile} 375w`}
              alt=""
              width={876}
              height={946}
              loading="eager"
              decoding="async"
            />
          </picture>
          <div
            class={[
              "relative flex flex-col items-center text-center text-white",
              "desktop:items-start desktop:text-start",
            ]}
          >
            <h1 class="text-h3 tablet:text-h1">About Us</h1>
            <p
              class={[
                "text-body2 mbs-3.5",
                "tablet:text-body tablet:max-is-xl tablet:mbs-6",
                "desktop:max-is-none-is-md desktop:mbs-8",
              ]}
            >
              Founded in 2010, we are a creative agency that produces lasting
              results for our clients. We've partnered with many startups,
              corporations, and nonprofits alike to craft designs that make real
              impact. We're always looking forward to creating brands, products,
              and digital experiences that connect with our clients' audiences.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
});

export const WorldClassTalentSection = component$(() => {
  return (
    <Section variant="full">
      <Card
        title="World-class talent"
        texts={[
          "We are a crew of strategists, problem-solvers, and technologists. Every design is thoughtfully crafted from concept to launch, ensuring success in its given market. We are constantly updating our skills in a myriad of platforms.",
          "Our team is multi-disciplinary and we are not merely interested in form — content and meaning are just as important. We give great importance to craftsmanship, service, and prompt delivery. Clients have always been impressed with our high-quality outcomes that encapsulates their brand’s story and mission.",
        ]}
        images={{
          desktop: wordClassImageDesktop,
          mobile: wordClassImageMobile,
          tablet: wordClassImageTablet,
        }}
      />
    </Section>
  );
});

export const RealDealSection = component$(() => {
  return (
    <Section variant="full">
      <Card
        variant="image-end"
        title="The real deal"
        texts={[
          "As strategic partners in our clients' businesses, we are ready to take on any challenge as our own. Solving real problems require empathy and collaboration, and we strive to bring a fresh perspective to every opportunity. We make design and technology more accessible and give you tools to measure success.",
          "We are visual storytellers in appealing and captivating ways. By combining business and marketing strategies, we inspire audiences to take action and drive real results.",
        ]}
        images={{
          desktop: realDealImageDesktop,
          mobile: realDealImageMobile,
          tablet: realDealImageTablet,
        }}
      />
    </Section>
  );
});

export interface CardProps {
  title: string;
  texts: Array<string>;
  images: { mobile: string; tablet: string; desktop: string };
  variant?: "image-start" | "image-end";
}

export const Card = component$((props: CardProps) => {
  return (
    <div
      class={[
        "flex flex-col overflow-hidden tablet:rounded-2xl",
        "desktop:max-bs-min",
        {
          "image-start": "desktop:flex-row",
          "image-end": "desktop:flex-row-reverse",
        }[props.variant ?? "image-start"],
      ]}
    >
      <picture>
        <source
          srcSet={`${props.images.desktop} 1440w`}
          media="(min-width: 1440px)"
          width={476}
          height={640}
        />
        <source
          srcSet={`${props.images.tablet} 768w`}
          media="(min-width: 768px)"
          width={689}
          height={320}
        />
        <img
          class={[
            "object-cover bs-full is-full",
            "tablet:max-bs-[50%]",
            "desktop:basis-full desktop:bs-full desktop:max-bs-[none] desktop:min-is-full",
          ]}
          src={props.images.mobile}
          srcSet={`${props.images.mobile} 375w`}
          alt=""
          width={375}
          height={320}
          loading="lazy"
          decoding="async"
        />
      </picture>
      <div
        class={[
          "relative bg-cream text-center plb-20 pli-6",
          "tablet:plb-17 tablet:pli-17",
          "desktop:text-start desktop:max-is-[58%] desktop:plb-36 desktop:pli-24",
        ]}
      >
        <img
          class={[
            "absolute object-none object-left-top bs-full block-start-0 inline-start-0",
            "tablet:object-[95%_120%] tablet:is-full",
            "desktop:object-[-225%_bottom]",
          ]}
          src={bgPattern}
          alt=""
          width={584}
          height={584}
          decoding="async"
        />
        <div class="relative flex flex-col text-body2 space-b-6 tablet:text-body">
          <h2 class="text-h3 text-peach tablet:text-h2">{props.title}</h2>
          {props.texts.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = () => {
  return {
    title: "About Us - Designo",
    links: [
      {
        rel: "preload",
        href: heroImageMobile,
        as: "image",
        media: "(max-width: 767.9px)",
        fetchpriority: "high",
      },
      {
        rel: "preload",
        href: heroImageTablet,
        as: "image",
        media: "(min-width: 768px) and (max-width: 1439.9px)",
        fetchpriority: "high",
      },
      {
        rel: "preload",
        href: heroImageDesktop,
        as: "image",
        media: "(min-width: 1440px)",
        fetchpriority: "high",
      },
      {
        rel: "preload",
        href: heroDecorationMobile,
        as: "image",
        media: "(max-width: 767.9px)",
        fetchpriority: "high",
      },
      {
        rel: "preload",
        href: heroDecorationTablet,
        as: "image",
        media: "(min-width: 768px)",
        fetchpriority: "high",
      },
    ],
  };
};
