// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: "fade", mode: "out-in" },
    head: {
      titleTemplate: "Kanban",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
        {
          hid: "description",
          name: "description",
          content:
            "Your new favorite task manager is right here! A intuitive, clean and modern Kanban like task manager.",
        },
        {
          name: "keywords",
          content: "Kanban, task, manager",
        },
      ],
    },
  },
  typescript: {
    shim: false,
  },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@vueuse/nuxt"],
  ssr: false,
});
