import { component$, Slot } from "@builder.io/qwik";

export interface SectionProps {
  wrapperElement?: "section" | "aside";
  variant?: "with-padding" | "full" | "full-bleed";
}

export const Section = component$((props: SectionProps) => {
  const Wrapper = props.wrapperElement ?? "section";
  const variant = props.variant ?? "with-padding";

  return (
    <Wrapper
      class={[
        "items-center",
        "tablet:first:pbs-8",
        variant !== "full-bleed" ? "tablet:pli-10 desktop:pli-41" : "",
        {
          "full-bleed": "",
          "with-padding": "pli-6",
          full: "is-full",
        }[variant],
      ]}
    >
      <Slot />
    </Wrapper>
  );
});
