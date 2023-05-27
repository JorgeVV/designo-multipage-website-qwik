import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import auOfficeMapSquare from "~/assets/locations/desktop/image-map-australia.webp";
import caOfficeMapSquare from "~/assets/locations/desktop/image-map-canada.webp";
import ukOfficeMapSquare from "~/assets/locations/desktop/image-map-united-kingdom.webp";
import auOfficeMapRect from "~/assets/locations/tablet/image-map-australia.webp";
import caOfficeMapRect from "~/assets/locations/tablet/image-map-canada.webp";
import ukOfficeMapRect from "~/assets/locations/tablet/image-map-united-kingdom.webp";
import bgPattern from "~/assets/shared/desktop/bg-pattern-three-circles.svg";
import { Section } from "~/components/section";

export default component$(() => {
  return (
    <>
      <h1 class="sr-only">Locations</h1>
      <div class="flex flex-col space-b-10 tablet:space-b-32 desktop:space-b-8">
        {locations.map((location, index) => (
          <LocationCard
            key={location.key}
            location={location}
            variant={index % 2 === 1 ? "image-start" : "image-end"}
            imagePriority={index <= 1 ? "high" : undefined}
          />
        ))}
      </div>
    </>
  );
});

interface Location {
  key: string;
  country: string;
  office: string;
  address1: string;
  address2: string;
  phone: string;
  email: string;
  map: {
    rect: string;
    square: string;
  };
}

export const locations: Array<Location> = [
  {
    key: "CA",
    country: "Canada",
    office: "Designo Central Office",
    address1: "3886 Wellington Street",
    address2: "Toronto, Ontario M9C 3J5",
    phone: "+1 253-863-8967",
    email: "contact@designo.co",
    map: {
      rect: caOfficeMapRect,
      square: caOfficeMapSquare,
    },
  },
  {
    key: "AU",
    country: "Australia",
    office: "Designo AU Office",
    address1: "19 Balonne Street",
    address2: "New South Wales 2443",
    phone: "(02) 67209092",
    email: "contact@designo.au",
    map: {
      rect: auOfficeMapRect,
      square: auOfficeMapSquare,
    },
  },
  {
    key: "UK",
    country: "United Kingdom",
    office: "Designo UK Office",
    address1: "13 Colorado Way",
    address2: "Rhyd-y-fro SA8 9GA",
    phone: "078 3115 1400",
    email: "contact@designo.uk",
    map: {
      rect: ukOfficeMapRect,
      square: ukOfficeMapSquare,
    },
  },
];

export interface LocationCardProps {
  location: Location;
  variant?: "image-start" | "image-end";
  imagePriority?: "high";
}

export const LocationCard = component$((props: LocationCardProps) => {
  return (
    <Section variant="full">
      <div
        id={props.location.key}
        class={[
          "flex flex-col is-full",
          "tablet:space-b-8",
          "desktop:space-b-0 desktop:space-i-8",
          {
            "image-start": "desktop:flex-row",
            "image-end": "desktop:flex-row-reverse desktop:space-i-reverse",
          }[props.variant ?? "image-end"],
        ]}
      >
        <picture>
          <source
            srcSet={`${props.location.map.rect} 768w`}
            media="(min-width: 768px) and (max-width: 1439.9px)"
            width={689}
            height={326}
          />
          <img
            class="object-cover is-full tablet:rounded-2xl desktop:max-bs-[326px] desktop:is-auto"
            src={props.location.map.square}
            alt=""
            srcSet={`${props.location.map.square} 375w`}
            loading={props.imagePriority === "high" ? "eager" : "lazy"}
            width={375}
            height={320}
            decoding="async"
          />
        </picture>
        <div
          class={[
            "relative overflow-hidden bg-cream text-center plb-20 pli-6 space-b-6",
            "tablet:rounded-2xl tablet:text-start tablet:plb-20 tablet:pli-18",
            "desktop:flex-1 desktop:pli-24",
          ]}
        >
          <img
            class={[
              "absolute object-none object-left-top bs-full block-start-0 inline-start-0",
              "tablet:object-left-bottom",
            ]}
            src={bgPattern}
            alt=""
            width={584}
            height={584}
            decoding="async"
          />
          <h2 class="relative text-h3 text-peach tablet:text-h2">
            {props.location.country}
          </h2>
          <address
            class={[
              "relative flex flex-col text-body2 not-italic space-b-6",
              "tablet:flex-row tablet:text-body tablet:space-b-0 tablet:space-i-28",
            ]}
          >
            <p>
              <b>{props.location.office}</b>
              <br />
              {props.location.address1}
              <br />
              {props.location.address2}
            </p>
            <p>
              <b>Contact</b>
              <br />P :{" "}
              <a
                class="hover:underline active:underline"
                href={`tel:${props.location.phone.replace(/\s+|\(\)-/, "")}`}
              >
                {props.location.phone}
              </a>
              <br />M :{" "}
              <a
                class="hover:underline active:underline"
                href={`mailto:${props.location.email}`}
              >
                {props.location.email}
              </a>
            </p>
          </address>
        </div>
      </div>
    </Section>
  );
});

export const head: DocumentHead = () => {
  const [firstLocation, secondLocation] = locations;
  return {
    title: "Locations - Designo",
    links: [
      {
        rel: "preload",
        href: firstLocation.map.square,
        as: "image",
        media: "(max-width: 767.9px) or (min-width: 1440px)",
        fetchpriority: "high",
      },
      {
        rel: "preload",
        href: firstLocation.map.rect,
        as: "image",
        media: "(min-width: 768px) and (max-width: 1439.9px)",
        fetchpriority: "high",
      },
      {
        rel: "preload",
        href: secondLocation.map.square,
        as: "image",
        media: "(max-width: 767.9px) or (min-width: 1440px)",
        fetchpriority: "high",
      },
      {
        rel: "preload",
        href: secondLocation.map.rect,
        as: "image",
        media: "(min-width: 768px) and (max-width: 1439.9px)",
        fetchpriority: "high",
      },
      {
        rel: "preload",
        href: bgPattern,
        as: "image",
        fetchpriority: "high",
      },
    ],
  };
};
