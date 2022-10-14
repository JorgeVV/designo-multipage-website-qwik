import {
  $,
  component$,
  createContext,
  useClientEffect$,
  useContext,
  useContextProvider,
  useSignal,
  useStore,
  useWatch$,
} from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import bgPatternTablet from "~/assets/contact/desktop/bg-pattern-hero-desktop.svg";
import bgPatternMobile from "~/assets/contact/mobile/bg-pattern-hero-contact-mobile.svg";
import { LocationsSection } from "~/components/locations-section";
import { Section } from "~/components/section";

export default component$(() => {
  return (
    <div class="flex flex-col space-b-32 pbe-32 desktop:pbe-40 desktop:space-b-40">
      <ContactForm />
      <LocationsSection />
    </div>
  );
});

export const formContext = createContext<{
  noValidate: boolean;
  triedSubmit: boolean;
}>("contactFormContext");

export const BgImage = component$(() => (
  <picture>
    <source
      srcSet={`${bgPatternTablet} 768w`}
      media="(min-width: 768px)"
      width={640}
      height={640}
    />
    <img
      class={[
        "absolute bs-full is-full block-start-0 inset-inline-0 object-none object-[20%_top]",
        "tablet:bs-[640px] tablet:is-[640px] tablet:-translate-x-[19%] tablet:-translate-y-[12%] tablet:object-contain",
        "desktop:translate-x-0 desktop:translate-y-0 desktop:block-end-0 desktop:block-start-auto",
      ]}
      src={bgPatternMobile}
      width={876}
      height={990}
      loading="eager"
      alt=""
    />
  </picture>
));

export const ContactForm = component$(() => {
  const store = useStore({ noValidate: false, triedSubmit: false });
  useContextProvider(formContext, store);
  const formRef = useSignal<HTMLFormElement>();

  useClientEffect$(() => {
    store.noValidate = true;
    const form = formRef.value;
    const handleSubmit = (e: SubmitEvent) => {
      store.triedSubmit = true;
      const form = e.target as HTMLFormElement;
      const anyElementIsInvalid = Array.from(form.elements).find(
        (el) => !(el as HTMLInputElement).validity.valid
      );
      if (anyElementIsInvalid) {
        e.preventDefault();
      }
    };
    form?.addEventListener("submit", handleSubmit);
    return () => form?.removeEventListener("submit", handleSubmit);
  });

  return (
    <Section variant="full">
      <div
        class={[
          "relative flex flex-col pli-6 plb-18 bg-peach text-white overflow-hidden",
          "tablet:plb-18 tablet:pli-14 tablet:rounded-2xl",
          "desktop:flex-row desktop:pli-24 desktop:plb-14",
        ]}
      >
        <BgImage />
        <div class="relative flex flex-col text-center space-b-6 tablet:text-start tablet:space-b-8 desktop:flex-1 desktop:justify-center">
          <h1 class="text-h3 tablet:text-h1">Contact Us</h1>
          <p class="text-body2 tablet:text-body">
            Ready to take it to the next level? Let's talk about your project or
            idea and find out how we can help your business grow. If you are
            looking for unique digital experiences that's relatable to your
            users, drop us a line.
          </p>
        </div>

        <form
          ref={formRef}
          class="relative flex flex-col space-b-10 mbs-8 desktop:mbs-0 desktop:flex-1 desktop:mis-24"
          noValidate={store.noValidate}
        >
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
              inputMode="tel"
              autoComplete="tel"
            />
            <Input
              label="Your Message"
              name="message"
              type="textarea"
              required
            />
          </div>
          <button
            type="submit"
            class={[
              "uppercase min-is-[152px] text-h6 pli-6 plb-4 rounded-lg transition-colors duration-300 hover:text-white active:text-white self-center",
              "bg-white text-dark-grey hover:bg-light-peach active:bg-light-peach",
              "tablet:self-end",
            ]}
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
  type?: "textarea" | string;
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
  const isBlurred = useSignal(false);
  const errorMessage = useSignal("");
  const form = useContext(formContext);
  const inputRef = useSignal<HTMLInputElement | HTMLTextAreaElement>();
  const isTextArea = type === "textarea";
  const Component = isTextArea ? "textarea" : "input";
  const errorMessageId = `${name}-error`;
  const showError =
    (isBlurred.value || form.triedSubmit) && !!errorMessage.value;

  const handleInput = $(() => {
    const inputEl = inputRef.value!;
    const { validity, validationMessage } = inputEl;
    const { valid, typeMismatch, valueMissing } = validity;
    errorMessage.value = valid
      ? ""
      : typeMismatch
      ? "Please use a valid email address"
      : valueMissing
      ? "Can't be empty"
      : validationMessage;
  });

  useWatch$(({ track }) => {
    const triedSubmit = track(() => form.triedSubmit);
    if (triedSubmit) {
      handleInput();
    }
  });

  return (
    <div class="relative z-0 flex items-baseline">
      <Component
        ref={inputRef}
        name={name}
        id={name}
        class={[
          "block pbe-3 pli-4 is-full text-white bg-transparent border-none appearance-none peer resize-none mbs-3",
          "focus:outline-none focus:ring-0",
        ]}
        placeholder=" "
        required={required}
        inputMode={inputMode}
        autoComplete={autoComplete}
        maxLength={250}
        onBlur$={() => {
          isBlurred.value = true;
        }}
        onInput$={handleInput}
        {...(isTextArea
          ? {
              rows: 3,
              spellCheck: "true",
            }
          : { type })}
        {...(showError
          ? {
              "aria-invalid": "true",
              "aria-errormessage": errorMessageId,
            }
          : {})}
      />
      <label
        for={name}
        class={[
          "absolute motion-safe:duration-300 translate-x-4 scale-90 -z-10 origin-[0] transition-transform",
          "peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-white/50 peer-focus:scale-90 peer-focus:text-white",
          isTextArea
            ? "block-start-4 -translate-y-6 peer-focus:-translate-y-6"
            : "block-end-3 -translate-y-4 peer-focus:-translate-y-4",
        ]}
      >
        {label}
        {required && <small> (required)</small>}
      </label>
      <p
        id={errorMessageId}
        key={errorMessage.value || undefined}
        role="alert"
        class={[
          "hidden select-none items-end space-i-2 shrink-0 animate-fadeIn italic text-body3 text-[12px] tracking-normal",
          showError ? "peer-invalid:flex" : "",
        ]}
      >
        <span>{errorMessage.value}</span>
        <ErrorIcon />
      </p>
      <div class="absolute block-end-0 bs-px is-full bg-white peer-focus:bs-[3px]" />
    </div>
  );
});

export function ErrorIcon() {
  return (
    <svg width="20" height="20" aria-hidden="true">
      <g fill="none" fill-rule="evenodd">
        <circle cx="10" cy="10" r="10" fill="#FFF" />
        <path fill="#E7816B" d="M11 14v2H9v-2h2zm0-9v7H9V5h2z" />
      </g>
    </svg>
  );
}

export const head: DocumentHead = () => {
  return {
    title: "Contact Us - Designo",
    links: [
      {
        rel: "preload",
        href: bgPatternMobile,
        media: "(max-width: 767.9px)",
        as: "image",
        fetchpriority: "high",
      },
      {
        rel: "preload",
        href: bgPatternTablet,
        media: "(min-width: 768px)",
        as: "image",
        fetchpriority: "high",
      },
    ],
  };
};
