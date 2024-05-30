import { createRouter, createWebHistory } from 'vue-router'
import RecipeHome from '../views/RecipeHome.vue'
import RecipeModal from '../components/RecipeModal.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: RecipeHome,
    },
    {
      path: '/recipes/:id',
      name: 'modal',
      component: RecipeModal
    }
  ]
})

export default router
