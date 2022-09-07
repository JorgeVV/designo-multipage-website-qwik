import { component$, Slot } from "@builder.io/qwik";
import clsx from "clsx";

export interface SectionProps {
  variant?: "with-padding" | "full" | "full-bleed";
}

export const Section = component$((props: SectionProps) => {
  const variant = props.variant ?? "with-padding";
  return (
    <section
      class={clsx("items-center", "tablet:first:pbs-8", {
        "tablet:pli-10 desktop:pli-41": variant !== "full-bleed",
        "pli-6": variant === "with-padding",
        "is-full": variant === "full",
      })}
    >
      <Slot />
    </section>
  );
});
