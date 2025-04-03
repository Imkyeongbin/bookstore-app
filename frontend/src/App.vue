<template>
  <div>
    <h1>📚 Bookstore</h1>

    <!-- 상세 페이지용 라우팅 영역 -->
    <router-view />

    <!-- 리스트 + 등록 구역 -->
    <!-- <div v-if="!showForm">
      <button @click="showForm = true">➕ 새 책 등록</button>
      <BookList ref="bookListRef" />
    </div> -->

    <!-- <div v-else>
      <BookForm @book-added="handleBookAdded" />
      <button @click="showForm = false">← 돌아가기</button>
    </div> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import BookForm from './components/BookForm.vue'
// import BookList from './components/BookList.vue'

const bookListRef = ref(null)
const showForm = ref(false)

const refreshBooks = () => {
  bookListRef.value?.loadBooks()
}

const handleBookAdded = () => {
  showForm.value = false
  refreshBooks()
}
// console.log('VITE_API_URL:', import.meta.env.VITE_API_URL)
defineExpose({ refreshBooks })
</script>
