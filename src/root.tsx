import { component$ } from "@builder.io/qwik";
import {
  QwikCity,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { Head } from "./components/head";

import "./global.css";

export default component$(() => {
  return (
    <QwikCity>
      <head>
        <Head />
      </head>
      <body
        lang="en"
        class="antialiased bg-white text-body text-dark-grey bs-full"
      >
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCity>
  );
});
