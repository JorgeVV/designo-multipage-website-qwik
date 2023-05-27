import { component$ } from "@builder.io/qwik";
import bgPattern from "~/assets/shared/desktop/bg-pattern-call-to-action.svg";
import { LinkButton } from "./link-button";
import { Section } from "./section";

export const ContactCtaSection = component$(() => {
  return (
    <Section wrapperElement="aside" variant="full-bleed">
      <div class="relative -mbe-px mbs-32 tablet:mbs-17 desktop:mbs-40">
        <div
          class={[
            "absolute -z-10 bg-black bs-1/2 inset-inline-0 block-end-0",
            "tablet:bs-1/5",
          ]}
        />
        <div
          class={[
            "mli-auto pli-6",
            "tablet:max-is-screen-tablet tablet:pli-10",
            "desktop:max-is-screen-desktop desktop:pli-41",
          ]}
        >
          <div
            class={[
              "relative overflow-hidden rounded-2xl bg-peach text-white plb-16 pli-6",
              "tablet:plb-14 tablet:pli-16",
              "desktop:plb-18 desktop:pli-24",
            ]}
          >
            <img
              class={[
                "absolute inset-0 object-none object-[45%_center] bs-full",
                "tablet:object-[15%_center]",
                "desktop:object-right desktop:is-full",
              ]}
              src={bgPattern}
              alt=""
              width={876}
              height={584}
              loading="lazy"
              decoding="async"
            />
            <div
              class={[
                "relative flex flex-col items-center text-center space-b-8",
                "desktop:flex-row desktop:space-b-0",
                "desktop:text-start",
              ]}
            >
              <div class="flex flex-col items-center desktop:flex-1 desktop:items-start">
                <h2 class="text-h3 tablet:text-h2 tablet:max-is-sm">
                  Let's talk about your project
                </h2>
                <p class="text-body2 mbs-4 tablet:text-body tablet:max-is-md">
                  Ready to take it to the next level? Contact us today and find
                  out how our expertise can help your business grow.
                </p>
              </div>
              <div>
                <LinkButton href="/contact">Get in touch</LinkButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
});
