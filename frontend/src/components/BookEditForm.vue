<template>
  <div v-if="book">
    <h3>📝 책 수정</h3>
    <form @submit.prevent="submitForm">
      <label>제목: <input v-model="book.title" required /></label><br />
      <label>저자: <input v-model="book.author" required /></label><br />
      <label>수량: <input type="number" v-model.number="book.quantity" min="0" /></label><br />
      <button type="submit">저장</button>
      <button @click.prevent="cancelEdit">취소</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
// import axios from 'axios'
import axios from '@/lib/axios'
import type { Book } from '@/types/book'  // ✅ 타입 정의 (없으면 위에서 직접 정의 가능)

// props 타입 정의
const props = defineProps<{
  bookToEdit: Book
}>()

const emit = defineEmits<{
  (e: 'edited'): void
  (e: 'cancel'): void
}>()

// book 복사본
const book = ref<Book | null>(null)

watch(
  () => props.bookToEdit,
  (val) => {
    book.value = { ...val }
  },
  { immediate: true }
)

const submitForm = async () => {
  if (!book.value) return
  console.log("📤 수정 요청 시작:", book.value)

  try {
    await axios.put(`/api/books/${book.value.id}`, book.value)
    console.log("✅ 수정 성공")
    emit('edited')
  } catch (err) {
    console.error('❌ 수정 실패:', err)
  }
}

const cancelEdit = () => emit('cancel')
</script>
