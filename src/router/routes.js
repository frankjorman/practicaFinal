const routes = [
  {
    path: "/Layout",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "ListaPeliculas",
        component: () => import("pages/ListaPeliculas.vue"),
      },
      {
        path: "ListaFavoritas",
        component: () => import("pages/ListaFavoritas.vue"),
      },
    ],
  },
  {
    path: "/ListaPeliculas",
    component: () => import("pages/ListaPeliculas.vue"),
  },
  {
    path: "/ListaFavoritas",
    component: () => import("pages/ListaFavoritas.vue"),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
