<template>
  <div>
    <h1>📚 Bookstore</h1>
    <BookForm @book-added="refreshBooks" />
    <BookList ref="bookListRef" />
  </div>
</template>

<script setup>
import BookForm from './components/BookForm.vue'
import BookList from './components/BookList.vue'
import { ref } from 'vue'

const bookListRef = ref(null)

const refreshBooks = () => {
  bookListRef.value?.loadBooks()
}
</script>
