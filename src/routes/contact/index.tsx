import { component$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import clsx from "clsx";
import bgPattern from "../../assets/shared/desktop/bg-pattern-two-circles.svg";
import { LocationsSection } from "../../components/locations-section";
import { Section } from "../../components/section";

export default component$(() => {
  return (
    <div class="flex flex-col space-b-32 pbe-32 desktop:pbe-40 desktop:space-b-40">
      <ContactForm />
      <LocationsSection />
    </div>
  );
});

export const ContactForm = component$(() => {
  return (
    <Section variant="full">
      <div
        class={clsx(
          "relative flex flex-col pli-6 plb-18 bg-peach text-white",
          "tablet:plb-18 tablet:pli-14 tablet:rounded-2xl",
          "desktop:flex-row desktop:pli-24 desktop:plb-14"
        )}
      >
        <img
          class="absolute is-full block-start-0 inline-start-0 object-none object-top"
          src={bgPattern}
          alt=""
        />
        <div class="relative flex flex-col text-center space-b-6 tablet:text-start tablet:space-b-8 desktop:flex-1">
          <h1 class="text-h3 tablet:text-h1">Contact Us</h1>
          <p class="text-body2 tablet:text-body">
            Ready to take it to the next level? Let's talk about your project or
            idea and find out how we can help your business grow. If you are
            looking for unique digital experiences that's relatable to your
            users, drop us a line.
          </p>
        </div>

        <form class="relative flex flex-col space-b-10 mbs-12 desktop:mbs-0 desktop:flex-1 desktop:mis-32">
          <div class="flex flex-col space-b-6">
            <Input label="Name" name="name" required />
            <Input
              label="Email Address"
              name="email"
              type="email"
              required
              inputMode="email"
              autoComplete="email"
            />
            <Input
              label="Phone"
              name="phone"
              type="tel"
              required
              inputMode="tel"
              autoComplete="tel"
            />
          </div>
          <button
            class={clsx(
              "uppercase text-h6 pli-6 plb-4 rounded-lg transition-colors duration-300 hover:text-white active:text-white self-center",
              "bg-white text-dark-grey hover:bg-light-peach active:bg-light-peach",
              "tablet:self-end"
            )}
          >
            Submit
          </button>
        </form>
      </div>
    </Section>
  );
});

interface InputProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  inputMode?: "email" | "tel" | "text";
  autoComplete?: string;
}

export const Input = component$((props: InputProps) => {
  const {
    label,
    name,
    type = "text",
    required,
    inputMode,
    autoComplete,
  } = props;
  return (
    <div class="relative z-0">
      <input
        type={type}
        name={name}
        id={name}
        class="block plb-3 pli-4 is-full border-white text-white bg-transparent border-0 border-be appearance-none focus:outline-none focus:ring-0 focus:border-white focus:border-be-2 peer"
        placeholder=" "
        required={required}
        inputMode={inputMode}
        autoComplete={autoComplete}
      />
      <label
        htmlFor={name}
        class="absolute duration-300 translate-x-4 -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-white/50 peer-focus:scale-75 peer-focus:text-white peer-focus:-translate-y-6"
      >
        {label}
      </label>
    </div>
  );
});

export const head: DocumentHead = () => {
  return {
    title: "Contact Us - Designo",
    links: [
      {
        rel: "preload",
        href: bgPattern,
        as: "image",
        fetchpriority: "high",
      },
    ],
  };
};
