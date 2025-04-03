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
    <button @click.prevent="cancel">취소</button>
    <p v-if="message">{{ message }}</p>
  </form>
</template>
  
<script setup lang="ts">
import { ref  } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/lib/axios'

const router = useRouter()

const title = ref<string>('')
const author = ref<string>('')
const quantity = ref<number>(1)
const message = ref<string>('')

const submitForm = async (): Promise<void> => {
  try {
    await axios.post('/api/books', {
      title: title.value,
      author: author.value,
      quantity: quantity.value
    })
    alert('등록 완료!')
    router.push('/')  // 목록으로 이동
  } catch (err: unknown) {
    console.error('등록 실패:', err)
    message.value = '등록 중 오류가 발생했습니다.'
  }
}

const cancel = (): void => {
  router.push('/')  // 목록으로 이동
}
</script>
