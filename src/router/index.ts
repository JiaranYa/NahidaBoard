import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('../components/home.vue')
        },
        {
            path: '/case',
            name: 'Case',
            component: () => import('../components/case.vue')
        }
    ]
})

export default router