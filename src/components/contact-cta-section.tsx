import { component$ } from "@builder.io/qwik";
import bgPattern from "../assets/shared/desktop/bg-pattern-call-to-action.svg";
import { LinkButton } from "./link-button";
import { Section } from "./section";

export const ContactCtaSection = component$(() => {
  return (
    <Section wrapperElement="aside" variant="full-bleed">
      <div class="relative mbs-32 -mbe-px tablet:mbs-17 desktop:mbs-40">
        <div
          class={[
            "absolute bg-black block-end-0 inset-inline-0 bs-1/2 -z-10",
            "tablet:bs-1/5",
          ]}
        />
        <div
          class={[
            "mli-auto pli-6",
            "tablet:pli-10 tablet:max-is-screen-tablet",
            "desktop:pli-41 desktop:max-is-screen-desktop",
          ]}
        >
          <div
            class={[
              "relative bg-peach text-white rounded-2xl pli-6 plb-16 overflow-hidden",
              "tablet:pli-16 tablet:plb-14",
              "desktop:pli-24 desktop:plb-18",
            ]}
          >
            <img
              class={[
                "absolute inset-0 bs-full object-none object-[45%_center]",
                "tablet:object-[15%_center]",
                "desktop:is-full desktop:object-right",
              ]}
              src={bgPattern}
              alt=""
              width={876}
              height={584}
              loading="lazy"
            />
            <div
              class={[
                "relative flex flex-col items-center space-b-8 text-center",
                "desktop:flex-row desktop:space-b-0",
                "desktop:text-start",
              ]}
            >
              <div class="flex flex-col items-center desktop:flex-1 desktop:items-start">
                <h2 class="text-h3 tablet:text-h2 tablet:max-is-sm">
                  Let's talk about your project
                </h2>
                <p class="mbs-4 text-body2 tablet:text-body tablet:max-is-md">
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
