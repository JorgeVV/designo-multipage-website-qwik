import { component$, Slot } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export interface LinkButtonProps {
  href: string;
  variant?: "dark" | "light";
}

export const LinkButton = component$((props: LinkButtonProps) => {
  return (
    <Link
      prefetch
      class={[
        "inline-block rounded-lg text-h6 uppercase transition-colors duration-300 plb-4 pli-6 hover:text-white active:text-white",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        {
          light:
            "bg-white text-dark-grey hover:bg-light-peach focus-visible:outline-white active:bg-light-peach",
          dark: "bg-peach text-white hover:bg-light-peach focus-visible:outline-peach active:bg-light-peach",
        }[props.variant ?? "light"],
      ]}
      href={props.href}
    >
      <Slot />
    </Link>
  );
});
