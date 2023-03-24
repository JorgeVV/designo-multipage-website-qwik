import type { QRL, Signal } from "@builder.io/qwik";
import {
  $,
  component$,
  useOnDocument,
  useOnWindow,
  useSignal,
  useVisibleTask$,
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

export const NAV_TOGGLE_ID = "nav-toggle";

export const Header = component$(() => {
  const isShadowVisible = useSignal(false);
  const interactiveContainerRef = useSignal<HTMLElement>();
  const isMenuOpen = useSignal(false);
  const location = useLocation();

  const closeMenu = $(() => {
    isMenuOpen.value = false;
  });

  return (
    <header
      class={[
        "sticky z-50 bg-white bs-full is-full inset-inline-0 block-start-0 tablet:-block-start-8",
        "before:absolute before:inset-0 before:-z-10 before:shadow-sm before:transition-opacity before:duration-300",
        isShadowVisible.value ? "before:opacity-100" : "before:opacity-0",
      ]}
      window:onScroll$={() => {
        isShadowVisible.value = window.scrollY > 60;
      }}
    >
      <div class="mli-auto tablet:max-is-screen-tablet desktop:max-is-screen-desktop">
        <a
          class={[
            "skip-link fixed bg-white p-2 underline underline-offset-2 mis-6 block-start-24",
            "focus-visible:outline-1 focus-visible:outline-black",
            "tablet:-translate-y-1/2 tablet:mis-10 tablet:block-start-8 tablet:focus-visible:outline-peach",
            "desktop:mis-41",
          ]}
          href="#main-content"
        >
          Skip to main content
        </a>
        <div
          ref={interactiveContainerRef}
          class={[
            "flex items-center pli-6 plb-8",
            "tablet:pli-10 tablet:pbs-16",
            "desktop:pli-41",
          ]}
        >
          <Link
            class="focus-visible:outline-offset-8 focus-visible:outline-peach"
            prefetch
            href="/"
            onClick$={closeMenu}
            {...(location.url.pathname === "/"
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
              decoding="async"
            />
          </Link>
          <input
            id={NAV_TOGGLE_ID}
            type="checkbox"
            class="peer sr-only tablet:hidden"
            checked={isMenuOpen.value}
            onClick$={(event) => {
              isMenuOpen.value = (event.target as HTMLInputElement).checked;
            }}
          />
          <NavMenu
            containerRef={interactiveContainerRef}
            isMenuOpen={isMenuOpen.value}
            onCloseMenu={closeMenu}
          />
          <NavMenuToggleLabel action="open" />
          <NavMenuToggleLabel action="close" />
        </div>
      </div>
    </header>
  );
});

interface NavMenuToggleLabelProps {
  action: "open" | "close";
}

export const NavMenuToggleLabel = component$(
  (props: NavMenuToggleLabelProps) => {
    const isOpen = props.action === "open";
    const peerSelectorClass = isOpen
      ? "peer-checked:hidden"
      : "peer-[:not(:checked)]:hidden";
    const label = `${isOpen ? "Open" : "Close"} navigation menu`;

    return (
      <label
        for={NAV_TOGGLE_ID}
        class={[
          "rounded-sm text-black outline-offset-4 outline-peach mis-auto",
          "peer-focus-visible:outline",
          "tablet:hidden",
          peerSelectorClass,
        ]}
      >
        <span class="sr-only">{label}</span>
        <svg width="20" height="20" aria-hidden="true">
          <path
            d={
              isOpen
                ? "M0 0h24v4H0zM0 8h24v4H0zM0 16h24v4H0z"
                : "M17.071.1L19.9 2.93l-7.071 7.07 7.071 7.072-2.828 2.828L10 12.828l-7.071 7.071L.1 17.071 7.17 10 .102 2.929 2.929.1l7.07 7.07 7.072-7.07z"
            }
            fill="currentColor"
            fill-rule="evenodd"
          />
        </svg>
      </label>
    );
  }
);

interface NavMenuProps {
  onCloseMenu: QRL<VoidFunction>;
  containerRef: Signal<HTMLElement | undefined>;
  isMenuOpen: boolean;
}

export const NavMenu = component$((props: NavMenuProps) => {
  const location = useLocation();

  useVisibleTask$(({ track }) => {
    const container = track(() => props.containerRef.value!);
    const isOpen = track(() => props.isMenuOpen);

    if (isOpen) {
      disableBodyScroll(document.body, { reserveScrollBarGap: true });
      focusTrap.on(container);
      const undoHide = hideOthers(container);

      return () => {
        undoHide();
        focusTrap.off(container);
        enableBodyScroll(document.body);
      };
    }
  });

  useOnWindow(
    "resize",
    $(() => {
      if (window.innerWidth >= 768) {
        props.onCloseMenu();
      }
    })
  );
  useOnDocument(
    "onkeydown",
    $((event: Event) => {
      if ((event as KeyboardEvent).key === "Escape") {
        props.onCloseMenu();
      }
    })
  );

  return (
    <div
      class={[
        "invisible fixed opacity-0 duration-[0.0001ms] min-bs-screen inset-inline-0 block-start-[92px]",
        "tablet:visible tablet:static tablet:flex tablet:opacity-100 tablet:min-bs-min tablet:mis-auto",
        "max-tablet:peer-checked:visible max-tablet:peer-checked:opacity-100 max-tablet:peer-checked:transition-visibility max-tablet:peer-checked:duration-300",
      ]}
    >
      <div
        class="absolute inset-0 -z-10 bg-trueblack/50 tablet:hidden"
        onClick$={props.onCloseMenu}
      />
      <nav
        role="navigation"
        aria-labelledby="header-title"
        class={[
          "bg-black -mbs-px pli-6 plb-12",
          "tablet:bg-transparent tablet:mbs-0 tablet:pli-0 tablet:plb-0",
        ]}
      >
        <ul
          class={[
            "flex flex-col text-h4 uppercase text-white space-b-8",
            "tablet:flex tablet:flex-row tablet:items-center tablet:text-body3 tablet:uppercase tablet:text-black tablet:space-b-0 tablet:space-i-10",
            "desktop:space-i-11",
          ]}
        >
          {links.map((link) => (
            <li key={link.path} onClick$={props.onCloseMenu}>
              <Link
                prefetch
                href={link.path}
                class={[
                  "block underline-offset-2 is-full -mlb-4 plb-4 hover:underline active:underline",
                  "focus-visible:underline focus-visible:outline-offset-4 focus-visible:outline-white",
                  "tablet:-m-4 tablet:inline-block tablet:p-4 tablet:is-max",
                  "tablet:focus-visible:outline-offset-0 tablet:focus-visible:outline-peach",
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
      </nav>
    </div>
  );
});
