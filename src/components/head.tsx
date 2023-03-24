import { component$ } from "@builder.io/qwik";
import type { DocumentLink } from "@builder.io/qwik-city";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";
import jost500 from "~/assets/fonts/jost/jost-v14-latin-500.woff2";
import jostRegular from "~/assets/fonts/jost/jost-v14-latin-regular.woff2";

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const Head = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  const links: Array<DocumentLink> = [
    ...[jost500, jostRegular].map((font) => ({
      rel: "preload",
      href: font,
      as: "font",
      type: "font/woff2",
      crossorigin: "",
    })),
    ...head.links,
  ];

  return (
    <>
      <meta charSet="utf-8" />
      <link rel="manifest" href="/manifest.json" />
      <title>
        {head.title
          ? head.title
          : "Designo - Award-winning custom designs and digital branding solutions"}
      </title>
      <meta
        name="description"
        content="With over 10 years in the industry, we are experienced in creating fully responsive websites, app design, and engaging brand experiences"
      />
      <link rel="canonical" href={loc.url.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/png" href="/favicon.png" />

      {links.map((l) => (
        <link key={l.key} {...l} />
      ))}

      {head.meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}

      {head.styles.map((s) => (
        <style key={s.key} {...s.props} dangerouslySetInnerHTML={s.style} />
      ))}
    </>
  );
});
