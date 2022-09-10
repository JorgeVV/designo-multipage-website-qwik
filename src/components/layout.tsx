import { component$, Slot } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Footer } from "./footer";
import { Header } from "./header";
import logoDark from "../assets/shared/desktop/logo-dark.webp";

export default component$(() => {
  return (
    <div class="min-bs-full flex flex-col">
      <Header />
      <main id="main-content" class="flex-1">
        <div class="relative mli-auto tablet:max-is-screen-tablet desktop:max-is-screen-desktop is-full">
          <div class="bg-layout absolute inset-0" />
          <Slot />
        </div>
        <Slot name="contactCta" />
      </main>
      <Footer />
    </div>
  );
});

export const head: DocumentHead = () => {
  return {
    links: [
      { rel: "preload", href: logoDark, as: "image", fetchpriority: "high" },
    ],
  };
};
