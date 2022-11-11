import {
  $,
  component$,
  QRL,
  Signal,
  useClientEffect$,
  useOnWindow,
  useSignal,
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
        "is-full bs-full sticky block-start-0 inset-inline-0 tablet:-block-start-8 z-50 bg-white",
        "before:absolute before:-z-10 before:inset-0 before:shadow-sm before:transition-opacity before:duration-300",
        isShadowVisible.value ? "before:opacity-100" : "before:opacity-0",
      ]}
      window:onScroll$={() => {
        isShadowVisible.value = window.scrollY > 60;
      }}
    >
      <div class="mli-auto tablet:max-is-screen-tablet desktop:max-is-screen-desktop">
        <a
          class={[
            "skip-link p-2 bg-white fixed block-start-24 underline underline-offset-2 mis-6",
            "focus-visible:outline-black focus-visible:outline-1",
            "tablet:focus-visible:outline-peach tablet:mis-10 tablet:block-start-8 tablet:-translate-y-1/2",
            "desktop:mis-41",
          ]}
          href="#main-content"
        >
          Skip to main content
        </a>
        <div
          ref={interactiveContainerRef}
          class={[
            "flex pli-6 plb-8 items-center",
            "tablet:pli-10 tablet:pbs-16",
            "desktop:pli-41",
          ]}
        >
          <Link
            class="focus-visible:outline-peach focus-visible:outline-offset-8"
            prefetch
            href="/"
            onClick$={closeMenu}
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
          <input
            id={NAV_TOGGLE_ID}
            type="checkbox"
            class="peer sr-only"
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
    const { action } = props;
    const isOpen = action === "open";
    const peerSelectorClass = isOpen
      ? "peer-checked:hidden"
      : "peer-[:not(:checked)]:hidden";
    const label = `${isOpen ? "Open" : "Close"} navigation menu`;

    return (
      <label
        for={NAV_TOGGLE_ID}
        class={[
          "outline-offset-4 text-black mis-auto outline-peach rounded-sm",
          "peer-focus-visible:outline",
          "tablet:hidden",
          peerSelectorClass,
        ]}
      >
        <span class="sr-only">{label}</span>
        <svg width="20" height="20" aria-hidden="true">
          {isOpen ? (
            <path
              d="M0 0h24v4H0zM0 8h24v4H0zM0 16h24v4H0z"
              fill="currentColor"
              fill-rule="evenodd"
            />
          ) : (
            <path
              d="M17.071.1L19.9 2.93l-7.071 7.07 7.071 7.072-2.828 2.828L10 12.828l-7.071 7.071L.1 17.071 7.17 10 .102 2.929 2.929.1l7.07 7.07 7.072-7.07z"
              fill="currentColor"
              fill-rule="evenodd"
            />
          )}
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
  const { onCloseMenu, containerRef } = props;
  const location = useLocation();

  useClientEffect$(({ track }) => {
    const container = track(() => containerRef.value!);
    const isOpen = track(() => props.isMenuOpen);
    const undo: { hidden: VoidFunction | null } = { hidden: null };

    function handleFocus() {
      if (isOpen) {
        disableBodyScroll(document.body, { reserveScrollBarGap: true });
        focusTrap.on(container);
        undo.hidden = hideOthers(container);
      } else {
        undo.hidden?.();
        focusTrap.off(container);
        enableBodyScroll(document.body);
      }
    }

    container.addEventListener("transitionend", handleFocus);
    return () => {
      container.removeEventListener("transitionend", handleFocus);
    };
  });

  useOnWindow(
    "resize",
    $(() => {
      if (window.innerWidth >= 768) {
        onCloseMenu();
      }
    })
  );

  return (
    <div
      class={[
        "fixed invisible block-start-[92px] inset-inline-0 min-bs-screen opacity-0 duration-[0.0001ms]",
        "tablet:static tablet:visible tablet:opacity-100 tablet:mis-auto tablet:flex tablet:min-bs-min",
        "max-tablet:peer-checked:transition-visibility max-tablet:peer-checked:duration-300 max-tablet:peer-checked:visible max-tablet:peer-checked:opacity-100",
      ]}
      document:onKeyDown$={(event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onCloseMenu();
        }
      }}
    >
      <div
        class="absolute bg-trueblack/50 inset-0 -z-10 tablet:hidden"
        onClick$={onCloseMenu}
      />
      <nav
        role="navigation"
        aria-labelledby="header-title"
        class={[
          "bg-black pli-6 plb-12 -mbs-px",
          "tablet:bg-transparent tablet:pli-0 tablet:plb-0 tablet:mbs-0",
        ]}
      >
        <ul
          class={[
            "flex flex-col uppercase space-b-8 text-white text-h4",
            "tablet:text-black tablet:flex-row tablet:space-b-0 tablet:flex tablet:items-center tablet:space-i-10 tablet:uppercase tablet:text-body3",
            "desktop:space-i-11",
          ]}
        >
          {links.map((link) => (
            <li key={link.path} onClick$={onCloseMenu}>
              <Link
                prefetch
                href={link.path}
                class={[
                  "block hover:underline active:underline underline-offset-2 is-full plb-4 -mlb-4",
                  "focus-visible:underline focus-visible:outline-white focus-visible:outline-offset-4",
                  "tablet:inline-block tablet:p-4 tablet:-m-4 tablet:is-max",
                  "tablet:focus-visible:outline-peach tablet:focus-visible:outline-offset-0",
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
      </nav>
    </div>
  );
});
