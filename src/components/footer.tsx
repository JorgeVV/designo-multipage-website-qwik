import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import fbIcon from "~/assets/shared/desktop/icon-facebook.svg";
import insIcon from "~/assets/shared/desktop/icon-instagram.svg";
import pinIcon from "~/assets/shared/desktop/icon-pinterest.svg";
import twIcon from "~/assets/shared/desktop/icon-twitter.svg";
import ytIcon from "~/assets/shared/desktop/icon-youtube.svg";
import logoLight from "~/assets/shared/desktop/logo-light.webp";

export const links = [
  { label: "Our Company", path: "/about" },
  { label: "Locations", path: "/locations" },
  { label: "Contact", path: "/contact" },
];

export const socials = [
  { label: "Facebook", icon: fbIcon, path: "#facebook" },
  { label: "Youtube", icon: ytIcon, path: "#youtube" },
  { label: "Twitter", icon: twIcon, path: "#twitter" },
  { label: "Pinterest", icon: pinIcon, path: "#pinterest" },
  { label: "Instagram", icon: insIcon, path: "#instagram" },
];

export const Footer = component$(() => {
  const location = useLocation();
  return (
    <footer class="bg-black">
      <div
        class={[
          "relative grid items-center gap-y-10 mli-auto plb-16 pli-6",
          "tablet:grid-cols-3 tablet:max-is-screen-tablet tablet:plb-20 tablet:pli-10",
          "desktop:max-is-screen-desktop desktop:plb-18 desktop:pli-41",
        ]}
      >
        <Link
          prefetch
          href="/"
          class={[
            "flex justify-center focus-visible:outline-offset-8 focus-visible:outline-white",
            "tablet:justify-start",
          ]}
          {...(location.url.pathname === "/"
            ? {
                "aria-current": "page",
              }
            : {})}
        >
          <span id="footer-title" class="sr-only">
            Designo
          </span>
          <img
            src={logoLight}
            loading="lazy"
            alt=""
            width={202}
            height={27}
            decoding="async"
          />
        </Link>

        <hr
          class={[
            "text-white/10 -mbs-2",
            "tablet:col-span-3 tablet:row-start-2 tablet:mbs-0",
          ]}
        />

        <ul
          role="list"
          aria-labelledby="footer-title"
          class={[
            "flex flex-col items-center text-body3 uppercase text-white -mbs-2 space-b-8",
            "tablet:col-span-2 tablet:flex-row tablet:justify-end tablet:mbs-0 tablet:space-b-0 tablet:space-i-10",
          ]}
        >
          {links.map((link) => (
            <li key={link.path}>
              <Link
                prefetch
                href={link.path}
                class={[
                  "-m-4 inline-block p-4 underline-offset-2 hover:underline active:underline",
                  "focus-visible:underline focus-visible:outline-white",
                ]}
                {...(location.url.pathname === link.path
                  ? {
                      "aria-current": "page",
                    }
                  : {})}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <address
          class={[
            "flex flex-col items-center text-center not-italic text-white/50 space-b-10",
            "tablet:col-span-2 tablet:flex-row tablet:text-start tablet:-mbs-2 tablet:space-b-0 tablet:space-i-10",
            "desktop:space-i-50",
          ]}
        >
          <p>
            <b>Designo Central Office</b>
            <br />
            3886 Wellington Street
            <br />
            Toronto, Ontario M9C 3J5
          </p>
          <p>
            <b>Contact Us (Central Office)</b>
            <br />P :{" "}
            <a
              class="hover:underline focus-visible:underline focus-visible:outline-white active:underline"
              href="tel:+12538638967"
            >
              +1 253-863-8967
            </a>
            <br />M :{" "}
            <a
              class="hover:underline focus-visible:underline focus-visible:outline-white active:underline"
              href="mailto:contact@designo.co"
            >
              contact@designo.co
            </a>
          </p>
        </address>

        <ul
          role="list"
          class="flex items-center justify-center space-i-4 tablet:justify-end tablet:self-end"
        >
          {socials.map((social) => (
            <li key={social.path}>
              <a
                href={social.path}
                class="-m-2 inline-block p-2 focus-visible:underline focus-visible:outline-white"
              >
                <span class="sr-only">{social.label}</span>
                <img
                  src={social.icon}
                  alt=""
                  width={24}
                  height={24}
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
});
