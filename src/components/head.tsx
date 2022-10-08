import { component$ } from "@builder.io/qwik";
import type { DocumentLink } from "@builder.io/qwik-city";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";
import favicon from "~/assets/favicon.png";
import jost500 from "~/assets/fonts/jost/jost-v14-latin-500.woff2";
import jostRegular from "~/assets/fonts/jost/jost-v14-latin-regular.woff2";

export const Head = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  const links: Array<DocumentLink> = [
    { rel: "icon", href: favicon, type: "image/png" },
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
      <title>
        {head.title
          ? head.title
          : "Designo - Award-winning custom designs and digital branding solutions"}
      </title>
      <meta
        name="description"
        content="With over 10 years in the industry, we are experienced in creating fully responsive websites, app design, and engaging brand experiences"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={loc.href} />

      {links.map((l) => (
        <link {...l} />
      ))}

      {head.meta.map((m) => (
        <meta {...m} />
      ))}

      {head.styles.map((s) => (
        <style {...s.props} dangerouslySetInnerHTML={s.style} />
      ))}
    </>
  );
});
