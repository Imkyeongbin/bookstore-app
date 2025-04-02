import { createRouter, createWebHistory } from 'vue-router'

const BookList = () => import('../components/BookList.vue')
const BookForm = () => import('../components/BookForm.vue')
const BookDetail = () => import('../components/BookDetail.vue')

const routes = [
  { path: '/', component: BookList },
  { path: '/new', component: BookForm },
  { path: '/books/:id', component: BookDetail }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
