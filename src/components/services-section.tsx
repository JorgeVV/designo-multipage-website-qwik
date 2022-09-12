import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import clsx from "clsx";
import appDesignDesktop from "../assets/home/desktop/image-app-design.webp";
import graphicDesignDesktop from "../assets/home/desktop/image-graphic-design.webp";
import webDesignDesktop from "../assets/home/desktop/image-web-design-large.webp";
import appDesignMobile from "../assets/home/mobile/image-app-design.webp";
import graphicDesignMobile from "../assets/home/mobile/image-graphic-design.webp";
import webDesignMobile from "../assets/home/mobile/image-web-design.webp";
import appDesignTablet from "../assets/home/tablet/image-app-design.webp";
import graphicDesignTablet from "../assets/home/tablet/image-graphic-design.webp";
import webDesignTablet from "../assets/home/tablet/image-web-design.webp";
import { Section } from "./section";

export type ServiceType = "web-design" | "app-design" | "graphic-design";

export interface ServiceItem {
  key: ServiceType;
  title: string;
  path: string;
  images: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
}

export interface ServicesSectionProps {
  omitService?: ServiceType;
}

export const services: Array<ServiceItem> = [
  {
    key: "web-design",
    title: "Web Design",
    path: "/web-design",
    images: {
      mobile: webDesignMobile,
      tablet: webDesignTablet,
      desktop: webDesignDesktop,
    },
  },
  {
    key: "app-design",
    title: "App Design",
    path: "/app-design",
    images: {
      mobile: appDesignMobile,
      tablet: appDesignTablet,
      desktop: appDesignDesktop,
    },
  },
  {
    key: "graphic-design",
    title: "Graphic Design",
    path: "/graphic-design",
    images: {
      mobile: graphicDesignMobile,
      tablet: graphicDesignTablet,
      desktop: graphicDesignDesktop,
    },
  },
];

export const ServicesSection = component$((props: ServicesSectionProps) => {
  const { omitService } = props;
  const showAll = !omitService;
  const servicesToDisplay = showAll
    ? services
    : services.filter((service) => service.key !== omitService);
  return (
    <Section>
      <h2 class="sr-only">Our Services</h2>
      <ul
        class={clsx(
          "grid grid-cols-1 gap-y-6",
          "desktop:gap-x-7 desktop:grid-cols-2",
          showAll && "desktop:grid-rows-2 "
        )}
      >
        {servicesToDisplay.map((service, index) => {
          const expandItem = showAll && index === 0;
          return (
            <li
              key={service.path}
              class={clsx(
                "relative plb-24 rounded-2xl overflow-hidden flex-col uppercase group flex justify-center items-center",
                "tablet:plb-14",
                "desktop:plb-25",
                expandItem && "desktop:row-span-2"
              )}
            >
              <picture>
                <source
                  srcSet={`${service.images.desktop} 1440w`}
                  media="(min-width: 1440px)"
                  {...(expandItem
                    ? { width: 541, height: 640 }
                    : { width: 541, height: 308 })}
                />
                <source
                  srcSet={`${service.images.tablet} 768w`}
                  media="(min-width: 768px)"
                  width={689}
                  height={200}
                />
                <img
                  src={service.images.mobile}
                  alt=""
                  loading="lazy"
                  class={clsx("absolute inset-0 object-cover bs-full is-full")}
                  width={328}
                  height={250}
                />
              </picture>
              <div className="absolute inset-0 bg-trueblack/50 transition-colors duration-300 group-hover:bg-peach/80 group-active:bg-peach/80" />
              <Link
                prefetch
                href={service.path}
                class={clsx(
                  "text-white text-center space-b-3 after:absolute after:inset-0 z-10",
                  "tablet:space-b-6"
                )}
              >
                <h3 class={clsx("text-h3", "tablet:text-h2")}>
                  {service.title}
                </h3>
                <span class="flex text-h6 tracking-[5px] items-center justify-center">
                  View projects
                  <svg
                    width="7"
                    height="10"
                    class={clsx(
                      "text-peach transition-colors duration-300 group-hover:text-white group-active:text-white mis-4",
                      "tablet:mis-5"
                    )}
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 1l4 4-4 4"
                      stroke="currentColor"
                      stroke-width="2"
                      fill="none"
                      fill-rule="evenodd"
                    />
                  </svg>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
});
