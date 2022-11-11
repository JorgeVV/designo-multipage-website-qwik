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
        "inline-block uppercase text-h6 pli-6 plb-4 rounded-lg transition-colors duration-300 hover:text-white active:text-white",
        "focus-visible:outline-offset-2 focus-visible:outline focus-visible:outline-2",
        {
          light:
            "bg-white text-dark-grey hover:bg-light-peach active:bg-light-peach focus-visible:outline-white",
          dark: "bg-peach text-white hover:bg-light-peach active:bg-light-peach focus-visible:outline-peach",
        }[props.variant ?? "light"],
      ]}
      href={props.href}
    >
      <Slot />
    </Link>
  );
});
