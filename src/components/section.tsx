import { component$, Slot } from "@builder.io/qwik";
import clsx from "clsx";

export interface SectionProps {
  wrapperElement?: "section" | "aside";
  variant?: "with-padding" | "full" | "full-bleed";
}

export const Section = component$((props: SectionProps) => {
  const Wrapper = props.wrapperElement ?? "section";
  const variant = props.variant ?? "with-padding";

  return (
    <Wrapper
    >
      <Slot />
    </Wrapper>
  );
});
