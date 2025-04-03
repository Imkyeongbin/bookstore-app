// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// Lazy-loaded components
const BookList = () => import('@/components/BookList.vue')
const BookForm = () => import('@/components/BookForm.vue')
const BookDetail = () => import('@/components/BookDetail.vue')

// 명시적으로 라우트 타입 지정
const routes: RouteRecordRaw[] = [
  { path: '/', component: BookList },
  { path: '/new', component: BookForm },
  { path: '/books/:id', component: BookDetail }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
