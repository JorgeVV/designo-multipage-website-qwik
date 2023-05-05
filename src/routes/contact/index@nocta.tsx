import {
  $,
  component$,
  createContextId,
  useContext,
  useContextProvider,
  useId,
  useSignal,
  useStore,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import bgPatternTablet from "~/assets/contact/desktop/bg-pattern-hero-desktop.svg";
import bgPatternMobile from "~/assets/contact/mobile/bg-pattern-hero-contact-mobile.svg";
import { LocationsSection } from "~/components/locations-section";
import { Section } from "~/components/section";

export default component$(() => {
  return (
    <div class="flex flex-col pbe-32 space-b-32 desktop:pbe-40 desktop:space-b-40">
      <ContactPage />
      <LocationsSection />
    </div>
  );
});

export const formContext = createContextId<{
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
        "absolute object-none object-[20%_top] bs-full is-full inset-inline-0 block-start-0",
        "tablet:-translate-x-[19%] tablet:-translate-y-[12%] tablet:object-contain tablet:bs-[640px] tablet:is-[640px]",
        "desktop:translate-x-0 desktop:translate-y-0 desktop:block-end-0 desktop:block-start-auto",
      ]}
      src={bgPatternMobile}
      width={876}
      height={990}
      loading="eager"
      alt=""
      decoding="async"
    />
  </picture>
));

export const ContactForm = component$(() => {
  const store = useStore({
    noValidate: false,
    triedSubmit: false,
  });
  useContextProvider(formContext, store);

  useVisibleTask$(() => {
    store.noValidate = true;
  });

  return (
    <form
      class="relative flex flex-col mbs-8 space-b-10 desktop:flex-1 desktop:mbs-0 desktop:mis-24"
      noValidate={store.noValidate}
      preventdefault:submit
      onSubmit$={(_event, form) => {
        store.triedSubmit = true;
        const anyElementIsInvalid = Array.from(form.elements).some(
          (el) => !(el as HTMLInputElement).validity.valid
        );
        if (!anyElementIsInvalid) {
          form.submit();
        }
      }}
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
        <Input label="Your Message" name="message" type="textarea" required />
      </div>
      <button
        type="submit"
        class={[
          "self-center rounded-lg text-h6 uppercase transition-colors duration-300 min-is-[152px] plb-4 pli-6 hover:text-white active:text-white",
          "bg-white text-dark-grey hover:bg-light-peach active:bg-light-peach",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
          "tablet:self-end",
        ]}
      >
        Submit
      </button>
    </form>
  );
});

export const ContactPage = component$(() => {
  return (
    <Section variant="full">
      <div
        class={[
          "relative flex flex-col overflow-hidden bg-peach text-white plb-18 pli-6",
          "tablet:rounded-2xl tablet:plb-18 tablet:pli-14",
          "desktop:flex-row desktop:plb-14 desktop:pli-24",
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
        <ContactForm />
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
  const isBlurred = useSignal(false);
  const errorMessage = useSignal("");
  const form = useContext(formContext);
  const inputRef = useSignal<HTMLInputElement | HTMLTextAreaElement>();
  const isTextArea = props.type === "textarea";
  const Component = isTextArea ? "textarea" : "input";
  const id = useId();
  const errorMessageId = `${props.name}-error-${id}`;
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

  useTask$(({ track }) => {
    const triedSubmit = track(() => form.triedSubmit);
    if (triedSubmit) {
      handleInput();
    }
  });

  return (
    <div class="relative z-0 flex items-baseline">
      <Component
        ref={inputRef}
        name={props.name}
        id={props.name}
        class={[
          "peer block resize-none appearance-none border-none bg-transparent text-white is-full mbs-3 pli-4 pbe-3",
          "focus:outline-none focus:ring-0",
          isTextArea ? "form-textarea" : "form-input",
        ]}
        placeholder=" "
        required={props.required}
        inputMode={props.inputMode}
        autoComplete={props.autoComplete}
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
          : { type: props.type })}
        {...(showError
          ? {
              "aria-invalid": "true",
              "aria-errormessage": errorMessageId,
            }
          : {})}
      />
      <label
        for={props.name}
        class={[
          "absolute -z-10 origin-[0] translate-x-4 scale-90 transition-transform motion-safe:duration-300",
          "peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-white/50 peer-focus:left-0 peer-focus:scale-90 peer-focus:text-white",
          isTextArea
            ? "-translate-y-6 block-start-4 peer-focus:-translate-y-6"
            : "-translate-y-4 block-end-3 peer-focus:-translate-y-4",
        ]}
      >
        {props.label}
        {props.required && <small> (required)</small>}
      </label>
      <p
        id={errorMessageId}
        key={errorMessage.value || undefined}
        role="alert"
        class={[
          "hidden shrink-0 animate-fadeIn select-none items-end text-[12px] text-body3 italic tracking-normal space-i-2",
          showError ? "peer-invalid:flex" : "",
        ]}
      >
        <span>{errorMessage.value}</span>
        <ErrorIcon />
      </p>
      <div class="absolute bg-white bs-px is-full block-end-0 peer-focus:bs-[3px]" />
    </div>
  );
});

export const ErrorIcon = component$(() => {
  return (
    <svg width="20" height="20" aria-hidden="true">
      <g fill="none" fill-rule="evenodd">
        <circle cx="10" cy="10" r="10" fill="#FFF" />
        <path fill="#E7816B" d="M11 14v2H9v-2h2zm0-9v7H9V5h2z" />
      </g>
    </svg>
  );
});

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
