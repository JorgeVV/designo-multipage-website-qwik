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
          "relative grid mli-auto pli-6 plb-16 gap-y-10 items-center",
          "tablet:max-is-screen-tablet tablet:pli-10 tablet:plb-20 tablet:grid-cols-3",
          "desktop:max-is-screen-desktop desktop:pli-41 desktop:plb-18",
        ]}
      >
        <Link
          prefetch
          href="/"
          class={["flex justify-center focus-visible:outline-white focus-visible:outline-offset-8", "tablet:justify-start"]}
          {...(location.pathname === "/"
            ? {
                "aria-current": "page",
              }
            : {})}
        >
          <span id="footer-title" class="sr-only">
            Designo
          </span>
          <img src={logoLight} loading="lazy" alt="" width={202} height={27} />
        </Link>

        <hr
          class={[
            "-mbs-2 text-white/10",
            "tablet:row-start-2 tablet:col-span-3 tablet:mbs-0",
          ]}
        />

        <ul
          role="list"
          aria-labelledby="footer-title"
          class={[
            "flex flex-col items-center space-b-8 text-white text-body3 uppercase -mbs-2",
            "tablet:col-span-2 tablet:mbs-0 tablet:flex-row tablet:justify-end tablet:space-b-0 tablet:space-i-10",
          ]}
        >
          {links.map((link) => (
            <li key={link.path}>
              <Link
                prefetch
                href={link.path}
                class={[
                  "inline-block p-4 -m-4 hover:underline active:underline underline-offset-2",
                  "focus-visible:underline focus-visible:outline-white",
                ]}
                {...(location.pathname === link.path
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
            "flex flex-col space-b-10 text-white/50 not-italic items-center text-center",
            "tablet:flex-row tablet:space-b-0 tablet:space-i-10 tablet:col-span-2 tablet:text-start tablet:-mbs-2",
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
              class="hover:underline active:underline focus-visible:underline focus-visible:outline-white"
              href="tel:+12538638967"
            >
              +1 253-863-8967
            </a>
            <br />M :{" "}
            <a class="hover:underline active:underline focus-visible:underline focus-visible:outline-white" href="mailto:contact@designo.co">
              contact@designo.co
            </a>
          </p>
        </address>

        <ul
          role="list"
          class="flex justify-center items-center space-i-4 tablet:self-end tablet:justify-end"
        >
          {socials.map((social) => (
            <li key={social.path}>
              <a
                href={social.path}
                class="inline-block p-2 -m-2 focus-visible:underline focus-visible:outline-white"
              >
                <span class="sr-only">{social.label}</span>
                <img
                  src={social.icon}
                  alt=""
                  width={24}
                  height={24}
                  loading="lazy"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
});
