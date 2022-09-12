import { component$, Slot } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import clsx from "clsx";

export interface LinkButtonProps {
  href: string;
  variant?: "dark" | "light";
}

export const LinkButton = component$((props: LinkButtonProps) => {
  const { href, variant = "light" } = props;
  return (
    <Link
      prefetch
      class={clsx(
        "inline-block uppercase text-h6 pli-6 plb-4 rounded-lg transition-colors duration-300 hover:text-white active:text-white",
        variant === "light" &&
          "bg-white text-dark-grey hover:bg-light-peach active:bg-light-peach",
        variant === "dark" &&
          "bg-peach text-white hover:bg-light-peach active:bg-light-peach"
      )}
      href={href}
    >
      <Slot />
    </Link>
  );
});
