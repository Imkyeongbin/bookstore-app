<template>
  <div>
    <h2>📖 책 목록</h2>

    <!-- 수정 폼 -->
    <BookEditForm
      v-if="isEditing"
      :book-to-edit="selectedBook"
      @edited="handleEdited"
      @cancel="isEditing = false"
    />

    <!-- 목록 -->
    <ul v-else-if="books.length > 0">
      <li v-for="book in books" :key="book.id">
        <strong>{{ book.title }}</strong> by {{ book.author }} ({{ book.quantity }}권)
        <button @click="deleteBook(book.id)">❌ 삭제</button>
        <button @click="editBook(book)">✏️ 수정</button>
      </li>
    </ul>

    <p v-else>불러오는 중...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import BookEditForm from './BookEditForm.vue'

const books = ref([])
const isEditing = ref(false)
const selectedBook = ref(null)

const loadBooks = async () => {
  try {
    const res = await axios.get('/api/books')
    books.value = res.data.books
  } catch (err) {
    console.error('책 목록 불러오기 실패:', err)
  }
}

const deleteBook = async (id) => {
  if (!confirm("정말 삭제하시겠습니까?")) return
  try {
    await axios.delete(`/api/books/${id}`)
    await loadBooks()
  } catch (err) {
    console.error("삭제 실패:", err)
  }
}

const editBook = (book) => {
  selectedBook.value = book
  isEditing.value = true
}

const handleEdited = async () => {
  isEditing.value = false
  selectedBook.value = null
  await loadBooks()
}

onMounted(loadBooks)
defineExpose({ loadBooks })
</script>
