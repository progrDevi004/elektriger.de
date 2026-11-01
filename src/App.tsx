import type { RouteRecord } from "vite-react-ssg";
import Layout from "./Layout";
import { blogPosts } from "./data/blog";
import { teamMembers } from "./data/team";
import { getAllStandortSlugs } from "./data/standorte";

// Homepage eagerly – rest via React Router `lazy` (not React.lazy).
// RR lazy keeps vite-react-ssg collectAssets working and splits unused page JS.
import Index from "./pages/Index";

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    entry: "src/Layout.tsx",
    children: [
      { index: true, Component: Index },
      {
        path: "leistungen",
        lazy: () => import("./pages/Expertise").then((m) => ({ Component: m.default })),
      },
      {
        path: "smart-home",
        lazy: () => import("./pages/SmartHome").then((m) => ({ Component: m.default })),
      },
      {
        path: "elektroinstallation",
        lazy: () => import("./pages/Elektroinstallation").then((m) => ({ Component: m.default })),
      },
      {
        path: "e-check",
        lazy: () => import("./pages/ECheck").then((m) => ({ Component: m.default })),
      },
      {
        path: "planung-bauleitung",
        lazy: () => import("./pages/PlanungBauleitung").then((m) => ({ Component: m.default })),
      },
      {
        path: "ueber-uns",
        lazy: () => import("./pages/UeberUns").then((m) => ({ Component: m.default })),
      },
      {
        path: "einsatzgebiet",
        lazy: () => import("./pages/Einsatzgebiet").then((m) => ({ Component: m.default })),
      },
      {
        path: "partnerbetriebe",
        lazy: () => import("./pages/Partnerbetriebe").then((m) => ({ Component: m.default })),
      },
      {
        path: "elektriker/:slug",
        lazy: () => import("./pages/Standort").then((m) => ({ Component: m.default })),
        getStaticPaths: () => getAllStandortSlugs().map((s) => `elektriker/${s}`),
      },
      {
        path: "team/:slug",
        lazy: () => import("./pages/TeamProfil").then((m) => ({ Component: m.default })),
        getStaticPaths: () => teamMembers.map((member) => `team/${member.slug}`),
      },
      {
        path: "blog",
        lazy: () => import("./pages/Blog").then((m) => ({ Component: m.default })),
      },
      {
        path: "blog/:slug",
        lazy: () => import("./pages/BlogArtikel").then((m) => ({ Component: m.default })),
        getStaticPaths: () => blogPosts.map((post) => `blog/${post.slug}`),
      },
      {
        path: "angebotsrechner",
        lazy: () => import("./pages/Angebotsrechner").then((m) => ({ Component: m.default })),
      },
      {
        path: "tools",
        lazy: () => import("./pages/Tools").then((m) => ({ Component: m.default })),
      },
      {
        path: "leiterquerschnitt",
        lazy: () => import("./pages/Leiterquerschnitt").then((m) => ({ Component: m.default })),
      },
      {
        path: "beleuchtung",
        lazy: () => import("./pages/Beleuchtung").then((m) => ({ Component: m.default })),
      },
      {
        path: "stromkosten",
        lazy: () => import("./pages/Stromkosten").then((m) => ({ Component: m.default })),
      },
      {
        path: "wallbox-leitung",
        lazy: () => import("./pages/WallboxLeitung").then((m) => ({ Component: m.default })),
      },
      {
        path: "photovoltaik",
        lazy: () => import("./pages/Photovoltaik").then((m) => ({ Component: m.default })),
      },
      {
        path: "impressum",
        lazy: () => import("./pages/Impressum").then((m) => ({ Component: m.default })),
      },
      {
        path: "datenschutz",
        lazy: () => import("./pages/Datenschutz").then((m) => ({ Component: m.default })),
      },
      {
        path: "agb",
        lazy: () => import("./pages/AGB").then((m) => ({ Component: m.default })),
      },
      {
        path: "faq",
        lazy: () => import("./pages/Faq").then((m) => ({ Component: m.default })),
      },
      {
        path: "kontakt",
        lazy: () => import("./pages/Kontakt").then((m) => ({ Component: m.default })),
      },
      {
        path: "*",
        lazy: () => import("./pages/NotFound").then((m) => ({ Component: m.default })),
      },
    ],
  },
];
