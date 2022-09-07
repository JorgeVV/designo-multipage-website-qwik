import {
  $,
  component$,
  useClientEffect$,
  useOnDocument,
  useOnWindow,
  useRef,
  useStore,
} from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import clsx from "clsx";
import logoDark from "../assets/shared/desktop/logo-dark.webp";
import focusTrap from "../utils/focus-trap";

export const links = [
  { label: "Our Company", path: "/about" },
  { label: "Locations", path: "/locations" },
  { label: "Contact", path: "/contact" },
];

export const Header = component$(() => {
  const state = useStore({ shadowVisible: false, menuOpen: false });
  const menuRef = useRef<HTMLElement>();
  const toggleMenu = $(() => {
    state.menuOpen = !state.menuOpen;
  });

  useOnDocument(
    "scroll",
    $(() => {
      state.shadowVisible = window.scrollY > 60 ?? false;
    })
  );

  useOnWindow(
    "resize",
    $(() => {
      if (state.menuOpen && window.innerWidth >= 768) {
        toggleMenu();
      }
    })
  );

  useOnDocument(
    "keydown",
    $((event: Event) => {
      if (state.menuOpen && (event as KeyboardEvent).key === "Escape") {
        toggleMenu();
      }
    })
  );

  useClientEffect$(({ track }) => {
    const isOpen = track(state, "menuOpen");
    const menu = menuRef.current!;
    if (isOpen && menu) {
      disableBodyScroll(document.body, { reserveScrollBarGap: true });
      focusTrap.on(menu);
      return () => {
        focusTrap.off(menu);
        enableBodyScroll(document.body);
      };
    }
  });

  return (
    <>
      <a
        class="skip-link p-2 bg-white fixed block-start-24 underline underline-offset-2"
        href="#main-content"
      >
        Skip to main content
      </a>
      <header
        class={clsx(
          "is-full bs-full sticky block-start-0 inset-inline-0 tablet:-block-start-8 z-50 bg-white",
          "before:absolute before:-z-10 before:inset-0 before:shadow-sm before:transition-opacity before:duration-300",
          state.shadowVisible ? "before:opacity-100" : "before:opacity-0"
        )}
      >
        <div class="mli-auto tablet:max-is-screen-tablet desktop:max-is-screen-desktop">
          <div
            class={clsx(
              "flex pli-6 plb-8 items-center",
              "tablet:pli-10 tablet:pbs-16",
              "desktop:pli-41"
            )}
          >
            <Link href="/">
              <span class="sr-only">Designo</span>
              <img
                src={logoDark}
                alt=""
                width={202}
                height={27}
                loading="eager"
              />
            </Link>
            <div class="mis-auto flex">
              <nav role="navigation" class="hidden tablet:block">
                <ul
                  role="list"
                  class="tablet:flex tablet:items-center tablet:space-i-10 tablet:uppercase tablet:text-body3 desktop:space-i-11"
                >
                  {links.map((link) => (
                    <li key={link.path}>
                      <Link
                        href={link.path}
                        class="hover:underline hover:underline-offset-2"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              {!state.menuOpen && (
                <button
                  class="outline-offset-8 tablet:hidden text-black"
                  onClick$={toggleMenu}
                >
                  <span class="sr-only">Open menu</span>
                  <svg
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 0h24v4H0zM0 8h24v4H0zM0 16h24v4H0z"
                      fill="currentColor"
                      fill-rule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
        {state.menuOpen && (
          <div
            ref={menuRef}
            class="fixed block-start-[92px] inset-inline-0 min-bs-screen animate-fadeIn tablet:hidden"
          >
            <div
              class="absolute bg-trueblack/50 inset-0 -z-10"
              onClick$={toggleMenu}
            />
            <button
              class="outline-offset-8 text-black absolute block-start-0 inline-end-0 -translate-y-14 -translate-x-6"
              onClick$={toggleMenu}
            >
              <span class="sr-only">Close menu</span>
              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M17.071.1L19.9 2.93l-7.071 7.07 7.071 7.072-2.828 2.828L10 12.828l-7.071 7.071L.1 17.071 7.17 10 .102 2.929 2.929.1l7.07 7.07 7.072-7.07z"
                  fill="currentColor"
                  fill-rule="evenodd"
                />
              </svg>
            </button>
            <nav class="bg-black pli-6 plb-12 -mbs-px">
              <ul class="flex flex-col uppercase space-b-8 text-white text-h4">
                {links.map((link) => (
                  <li key={link.path} onClick$={toggleMenu}>
                    <Link class="block is-full plb-4 -mlb-4" href={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </header>
    </>
  );
});
