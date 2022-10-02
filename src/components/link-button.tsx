import { component$, Slot } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export interface LinkButtonProps {
  href: string;
  variant?: "dark" | "light";
}

export const LinkButton = component$((props: LinkButtonProps) => {
  const { href, variant = "light" } = props;
  return (
    <Link
      prefetch
      class={[
        "inline-block uppercase text-h6 pli-6 plb-4 rounded-lg transition-colors duration-300 hover:text-white active:text-white",
        {
          light:
            "bg-white text-dark-grey hover:bg-light-peach active:bg-light-peach",
          dark: "bg-peach text-white hover:bg-light-peach active:bg-light-peach",
        }[variant],
      ]}
      href={href}
    >
      <Slot />
    </Link>
  );
});
