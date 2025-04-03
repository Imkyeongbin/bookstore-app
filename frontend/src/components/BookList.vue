<template>
  <div>
    <h2>📖 책 목록</h2>
    <div class="top-bar">
      <router-link to="/new">
        <button>➕ 새 책 등록</button>
      </router-link>

      <div class="search-group">
        <input v-model="searchKeyword" @keyup.enter="searchBooks" placeholder="제목 또는 저자 검색" />
        <button @click="searchBooks" :disabled="isLoading">검색</button>
        <button v-if="searchKeyword" @click="resetSearch">초기화</button>
      </div>
    </div>

    <!-- 수정 폼 -->
    <BookEditForm
      v-if="isEditing && selectedBook"
      :book-to-edit="selectedBook"
      @edited="handleEdited"
      @cancel="isEditing = false"
    />


    <!-- 목록 -->
    <ul v-else-if="books.length > 0">
      <li v-for="book in books" :key="book.id">
        <router-link :to="`/books/${book.id}`">
          {{ book.title }}
        </router-link>
        <span> - {{ book.author }}</span>
      </li>
    </ul>

    <p v-else>불러오는 중...</p>

    <!-- 페이지네이션 -->
    <div v-if="totalPages > 1" class="pagination">
      <button @click="prevPage" :disabled="page <= 1">← 이전</button>
      <span>페이지 {{ page }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="page >= totalPages">다음 →</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from '@/lib/axios'
import BookEditForm from './BookEditForm.vue'
import type { Book } from '@/types/book'

// 📦 상태 정의
const books = ref<Book[]>([])
const page = ref<number>(1)
const perPage = 10
const totalPages = ref<number>(1)
const searchKeyword = ref<string>('')

const isEditing = ref<boolean>(false)
const selectedBook = ref<Book | null>(null)
const isLoading = ref<boolean>(false)

// 📖 목록 불러오기
const loadBooks = async (): Promise<void> => {
  const cacheKey = `books_${searchKeyword.value}_page_${page.value}`
  const cached = sessionStorage.getItem(cacheKey)
  if (cached) {
    const data: { books: Book[]; pages: number } = JSON.parse(cached)
    books.value = data.books
    totalPages.value = data.pages
    return
  }

  try {
    const res = await axios.get('/api/books', {
      params: {
        page: page.value,
        per_page: perPage,
        search: searchKeyword.value
      }
    })
    books.value = res.data.books
    totalPages.value = res.data.pages
    sessionStorage.setItem(cacheKey, JSON.stringify(res.data))
  } catch (err) {
    console.error('책 목록 불러오기 실패:', err)
  }
}

const nextPage = (): void => {
  if (page.value < totalPages.value) {
    page.value++
    loadBooks()
  }
}

const prevPage = (): void => {
  if (page.value > 1) {
    page.value--
    loadBooks()
  }
}

const searchBooks = async (): Promise<void> => {
  isLoading.value = true
  await loadBooks()
  isLoading.value = false
}

const resetSearch = (): void => {
  searchKeyword.value = ''
  loadBooks()
}

const deleteBook = async (id: number): Promise<void> => {
  if (!confirm("정말 삭제하시겠습니까?")) return
  try {
    await axios.delete(`/api/books/${id}`)
    await loadBooks()
  } catch (err) {
    console.error("삭제 실패:", err)
  }
}

const editBook = (book: Book): void => {
  selectedBook.value = book
  isEditing.value = true
}

const handleEdited = async (): Promise<void> => {
  isEditing.value = false
  selectedBook.value = null
  await loadBooks()
}

onMounted(loadBooks)
defineExpose({ loadBooks })
</script>

<style scoped>
.pagination {
  margin-top: 16px;
  display: flex;
  gap: 1rem;
  align-items: center;
}
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}
.search-group {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
</style>
