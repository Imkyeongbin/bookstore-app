<template>
    <form @submit.prevent="submitForm">
      <h2>➕ 새 책 등록</h2>
      <div>
        <label>제목:</label>
        <input v-model="title" required />
      </div>
      <div>
        <label>저자:</label>
        <input v-model="author" required />
      </div>
      <div>
        <label>수량:</label>
        <input type="number" v-model.number="quantity" required min="0" />
      </div>
      <button type="submit">등록</button>
      <p v-if="message">{{ message }}</p>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  
  const title = ref('')
  const author = ref('')
  const quantity = ref(1)
  const message = ref('')
  
  const emit = defineEmits(['book-added'])
  
  const submitForm = async () => {
    try {
      await axios.post('/api/books', {
        title: title.value,
        author: author.value,
        quantity: quantity.value,
      })
  
      message.value = '✅ 책이 등록되었습니다!'
      title.value = ''
      author.value = ''
      quantity.value = 1
  
      emit('book-added')  // 부모에 알림 → 목록 새로고침 용도
    } catch (err) {
      message.value = '⚠️ 등록 실패'
      console.error(err)
    }
  }
  </script>
  