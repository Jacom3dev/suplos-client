import { createRouter, createWebHistory } from 'vue-router';
import Home from "../pages/Home.vue";
import Events from "../pages/Events.vue";
import CreateEvent from  "../pages/CreateEvent.vue";
import Search from "../pages/Search.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/proccess-events',
      name: 'events',
      component: Events
    },
    {
      path: '/proccess-events/create',
      name: 'create-event',
      component: CreateEvent
    },
    {
      path: '/proccess-events/search',
      name: 'search-event',
      component: Search
    }
  ]
})

export default router
