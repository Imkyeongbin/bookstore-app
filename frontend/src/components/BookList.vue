<template>
    <div>
      <h2>📖 책 목록</h2>
      <ul v-if="books.length > 0">
        <li v-for="book in books" :key="book.id">
          <strong>{{ book.title }}</strong> by {{ book.author }} ({{ book.quantity }}권)
        </li>
      </ul>
      <p v-else>불러오는 중...</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  const books = ref([])
  
  const loadBooks = async () => {
    try {
      const res = await axios.get('/api/books')
      books.value = res.data.books
    } catch (err) {
      console.error('책 목록 불러오기 실패:', err)
    }
  }

  onMounted(loadBooks)

  defineExpose({ loadBooks })  // 부모가 이 함수 호출 가능하도록 노출

  </script>
  