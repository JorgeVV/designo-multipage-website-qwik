import { component$, Slot } from "@builder.io/qwik";
import Layout, { head } from "~/components/layout";

export default component$(() => {
  return (
    <Layout>
      <Slot />
    </Layout>
  );
});

export { head };
