<template>
  <div v-if="book && !isEditing">
    <h2>📘 책 상세 정보</h2>
    <p><strong>제목:</strong> {{ book.title }}</p>
    <p><strong>저자:</strong> {{ book.author }}</p>
    <p><strong>수량:</strong> {{ book.quantity }}</p>

    <button @click="isEditing = true">✏️ 수정</button>
    <button @click="deleteBook">❌ 삭제</button>
    <router-link to="/">← 목록으로 돌아가기</router-link>
  </div>

  <!-- 수정 폼 -->
  <div v-else-if="book && isEditing">
    <h2>📝 책 정보 수정</h2>
    <form @submit.prevent="updateBook">
      <label>제목: <input v-model="book.title" required /></label><br />
      <label>저자: <input v-model="book.author" required /></label><br />
      <label>수량: <input type="number" v-model.number="book.quantity" min="0" required /></label><br />
      <button type="submit">💾 저장</button>
      <button @click.prevent="isEditing = false">취소</button>
    </form>
  </div>

  <p v-else>불러오는 중...</p>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '@/lib/axios'
import type { Book } from '@/types/book'

const route = useRoute()
const router = useRouter()

const book = ref<Book | null>(null)
const isEditing = ref(false)

const fetchBook = async () => {
  try {
    const res = await axios.get(`/api/books/${route.params.id}`)
    book.value = res.data
  } catch (err) {
    console.error("책 정보를 불러오지 못했습니다:", err)
  }
}

onMounted(fetchBook)

// URL이 바뀌면 다시 로드
watch(() => route.params.id, fetchBook)

const updateBook = async () => {
  if (!book.value) return
  try {
    await axios.put(`/api/books/${book.value.id}`, book.value)
    isEditing.value = false
  } catch (err) {
    console.error('수정 실패:', err)
  }
}

const deleteBook = async () => {
  if (!book.value) return
  if (!confirm("정말 삭제하시겠습니까?")) return
  try {
    await axios.delete(`/api/books/${book.value.id}`)
    alert('삭제 완료')
    router.push('/')
  } catch (err) {
    console.error('삭제 실패:', err)
  }
}
</script>
