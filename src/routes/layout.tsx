import { component$, Slot } from "@builder.io/qwik";
import { ContactCtaSection } from "../components/contact-cta-section";
import Layout, { head } from "../components/layout";

export default component$(() => {
  return (
    <Layout>
      <Slot />
      <ContactCtaSection q:slot="contactCta" />
    </Layout>
  );
});

export { head };
