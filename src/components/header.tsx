import {
  $,
  component$,
  QRL,
  useClientEffect$,
  useOnWindow,
  useRef,
  useStore,
} from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { hideOthers } from "aria-hidden";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import logoDark from "~/assets/shared/desktop/logo-dark.webp";
import focusTrap from "~/utils/focus-trap";

export const links = [
  { label: "Our Company", path: "/about" },
  { label: "Locations", path: "/locations" },
  { label: "Contact", path: "/contact" },
];

export const Header = component$(() => {
  const state = useStore({ shadowVisible: false, menuOpen: false });
  const location = useLocation();
  const toggleMenu = $(() => {
    state.menuOpen = !state.menuOpen;
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
        class={[
          "is-full bs-full sticky block-start-0 inset-inline-0 tablet:-block-start-8 z-50 bg-white",
          "before:absolute before:-z-10 before:inset-0 before:shadow-sm before:transition-opacity before:duration-300",
          state.shadowVisible ? "before:opacity-100" : "before:opacity-0",
        ]}
        window:onScroll$={() => {
          state.shadowVisible = window.scrollY > 60;
        }}
      >
        <div class="mli-auto tablet:max-is-screen-tablet desktop:max-is-screen-desktop">
          <div
            class={[
              "flex pli-6 plb-8 items-center",
              "tablet:pli-10 tablet:pbs-16",
              "desktop:pli-41",
            ]}
          >
            <Link
              prefetch
              href="/"
              {...(location.pathname === "/"
                ? {
                    "aria-current": "page",
                  }
                : {})}
            >
              <span id="header-title" class="sr-only">
                Designo
              </span>
              <img
                src={logoDark}
                alt=""
                width={202}
                height={27}
                loading="eager"
              />
            </Link>
            <div class="mis-auto flex">
              <nav
                role="navigation"
                aria-labelledby="header-title"
                class="hidden tablet:block"
              >
                <ul
                  role="list"
                  class="tablet:flex tablet:items-center tablet:space-i-10 tablet:uppercase tablet:text-body3 desktop:space-i-11"
                >
                  {links.map((link) => (
                    <li key={link.path}>
                      <Link
                        prefetch
                        href={link.path}
                        class="inline-block hover:underline hover:underline-offset-2 p-4 -m-4"
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
              </nav>
              <button
                class={[
                  "outline-offset-8 tablet:hidden text-black",
                  state.menuOpen ? "hidden" : "",
                ]}
                onClick$={toggleMenu}
              >
                <span class="sr-only">Open navigation menu</span>
                <svg width="20" height="20" aria-hidden="true">
                  <path
                    d="M0 0h24v4H0zM0 8h24v4H0zM0 16h24v4H0z"
                    fill="currentColor"
                    fill-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {state.menuOpen && <MobileMenu onCloseMenu$={toggleMenu} />}
      </header>
    </>
  );
});

interface MobileMenuProps {
  onCloseMenu$: QRL<VoidFunction>;
}

export const MobileMenu = component$((props: MobileMenuProps) => {
  const { onCloseMenu$ } = props;
  const menuRef = useRef<HTMLElement>();
  const location = useLocation();

  useClientEffect$(() => {
    const menu = menuRef.current!;
    disableBodyScroll(document.body, { reserveScrollBarGap: true });
    focusTrap.on(menu);
    const undoHidden = hideOthers(menu);

    return () => {
      undoHidden();
      focusTrap.off(menu);
      enableBodyScroll(document.body);
    };
  });

  useOnWindow(
    "resize",
    $(() => {
      if (window.innerWidth >= 768) {
        onCloseMenu$();
      }
    })
  );

  return (
    <div
      ref={menuRef}
      class="fixed block-start-[92px] inset-inline-0 min-bs-screen animate-fadeIn tablet:hidden"
      document:onKeyDown$={(event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onCloseMenu$();
        }
      }}
    >
      <div
        class="absolute bg-trueblack/50 inset-0 -z-10"
        onClick$={onCloseMenu$}
      />
      <button
        class="outline-offset-8 text-black absolute block-start-0 inline-end-0 -translate-y-14 -translate-x-6"
        onClick$={onCloseMenu$}
      >
        <span class="sr-only">Close navigation menu</span>
        <svg width="20" height="20" aria-hidden="true">
          <path
            d="M17.071.1L19.9 2.93l-7.071 7.07 7.071 7.072-2.828 2.828L10 12.828l-7.071 7.071L.1 17.071 7.17 10 .102 2.929 2.929.1l7.07 7.07 7.072-7.07z"
            fill="currentColor"
            fill-rule="evenodd"
          />
        </svg>
      </button>
      <nav
        role="navigation"
        aria-labelledby="header-title"
        class="bg-black pli-6 plb-12 -mbs-px"
      >
        <ul class="flex flex-col uppercase space-b-8 text-white text-h4">
          {links.map((link) => (
            <li key={link.path} onClick$={onCloseMenu$}>
              <Link
                prefetch
                href={link.path}
                class="hover:underline hover:underline-offset-2 block is-full plb-4 -mlb-4"
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
      </nav>
    </div>
  );
});
