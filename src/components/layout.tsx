import { component$, Slot } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import logoDark from "~/assets/shared/desktop/logo-dark.webp";
import { ContactCtaSection } from "./contact-cta-section";
import { Footer } from "./footer";
import { Header } from "./header";

export interface LayoutProps {
  showContactCta?: boolean;
}

export default component$((props: LayoutProps) => {
  return (
    <div class="flex flex-col min-bs-full">
      <Header />
      <main id="main-content" class="flex-1">
        <div class="relative is-full mli-auto tablet:max-is-screen-tablet desktop:max-is-screen-desktop">
          <div class="bg-layout" />
          <Slot />
        </div>
        {props.showContactCta && <ContactCtaSection />}
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
