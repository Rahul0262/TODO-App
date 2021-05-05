const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/login.vue") },
      { path: "login", component: () => import("pages/login.vue") },
      { path: "todos", component: () => import("pages/todos.vue") },
      { path: "register", component: () => import("pages/Register.vue") }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
