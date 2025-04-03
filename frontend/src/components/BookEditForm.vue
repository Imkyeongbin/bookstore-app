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
  
<script setup>
  import { ref, watch } from 'vue'
  // import axios from 'axios'
  import axios from '@/lib/axios'
  
  const props = defineProps({
    bookToEdit: Object
  })
  const emit = defineEmits(['edited', 'cancel'])
  
  const book = ref(null)
  
  watch(() => props.bookToEdit, (val) => {
    book.value = { ...val }  // props 복사본
  }, { immediate: true })
  
  const submitForm = async () => {
    console.log("📤 수정 요청 시작:", book.value)  // ← 추가

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
  