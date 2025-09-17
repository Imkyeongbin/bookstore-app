<template>
  <div class="book-list-container">
    <h2>📖 책 목록</h2>
    <div>
      이 서버는 Vue3 프론트엔드, Java21 - 스프링부트 3.5.3 백엔드로 구성되었습니다.
    </div>
    <div class="top-bar">
      <router-link to="/new" class="btn btn-primary">➕ 새 책 등록</router-link>

      <div class="search-group">
        <input
          v-model="searchKeyword"
          @keyup.enter="searchBooks"
          placeholder="제목 또는 저자 검색"
        />
        <button @click="searchBooks" :disabled="isLoading" class="btn">검색</button>
        <button v-if="searchKeyword" @click="resetSearch" class="btn btn-secondary">초기화</button>
      </div>
    </div>

    <BookEditForm
      v-if="isEditing && selectedBook"
      :book-to-edit="selectedBook"
      @edited="handleEdited"
      @cancel="isEditing = false"
      class="edit-form-section"
    />

    <div v-if="isLoading" class="loading-message">
      <p>목록을 불러오는 중...</p>
    </div>
    <div v-else-if="books.length > 0">
      <ul class="book-list">
        <li v-for="book in books" :key="book.id" class="book-item">
          <router-link :to="`/books/${book.id}`" class="book-info">
            <span class="book-title">{{ book.title }}</span>
            <span class="book-author"> - {{ book.author }}</span>
          </router-link>
          <div class="book-actions">
            <button @click="editBook(book)" class="btn btn-edit">✏️ 수정</button>
            <button @click="deleteBook(book.id)" class="btn btn-danger">❌ 삭제</button>
          </div>
        </li>
      </ul>
    </div>
    <div v-else class="empty-message">
      <p>표시할 책이 없습니다.</p>
    </div>

    <div v-if="totalPages > 1" class="pagination">
      <button @click="prevPage" :disabled="page <= 1" class="btn">← 이전</button>
      <span>페이지 {{ page }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="page >= totalPages" class="btn">다음 →</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from '@/lib/axios'
import BookEditForm from './BookEditForm.vue'
import type { Book } from '@/types/book'

const books = ref<Book[]>([])
const page = ref(1)
const perPage = 10
const totalPages = ref(1)
const searchKeyword = ref<string>('')

const isEditing = ref(false)
const selectedBook = ref<Book | null>(null)
const isLoading = ref(true)

// 📖 항상 최신 목록 불러오기
const loadBooks = async (): Promise<void> => {
  isLoading.value = true
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
  } catch (err) {
    console.error('책 목록 불러오기 실패:', err)
    books.value = [] // 에러 발생 시 목록 비우기
  } finally {
    isLoading.value = false
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

const searchBooks = (): void => {
  page.value = 1 // 검색 시 첫 페이지부터
  loadBooks()
}

const resetSearch = (): void => {
  searchKeyword.value = ''
  page.value = 1
  loadBooks()
}

const deleteBook = async (id: number): Promise<void> => {
  if (!confirm("정말 삭제하시겠습니까?")) return
  try {
    await axios.delete(`/api/books/${id}`)
    // 현재 페이지의 마지막 항목을 삭제했다면 이전 페이지로 이동할 수 있도록 보정
    if (books.value.length === 1 && page.value > 1) {
      page.value--
    }
    await loadBooks()
  } catch (err) {
    console.error("삭제 실패:", err)
  }
}

const editBook = (book: Book): void => {
  selectedBook.value = { ...book } // 원본 수정을 방지하기 위해 복사본 전달
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
/* 🎨 공통 및 모바일 스타일 (Mobile-First) */
.book-list-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
  font-family: sans-serif;
}

h2 {
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #eee;
  padding-bottom: 0.5rem;
}

/* 상단 바 */
.top-bar {
  display: flex;
  flex-direction: column; /* 모바일: 수직 정렬 */
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.search-group {
  display: flex;
  gap: 0.5rem;
}

.search-group input {
  flex-grow: 1; /* 남는 공간 모두 차지 */
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* 책 목록 */
.book-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.book-item {
  display: flex;
  flex-direction: column; /* 모바일: 수직 정렬 */
  gap: 0.75rem;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s;
}

.book-item:hover {
  background-color: #f9f9f9;
}

.book-info {
  text-decoration: none;
  color: #333;
  flex-grow: 1;
}

.book-title {
  font-weight: 600;
}
.book-author {
  color: #555;
}

.book-actions {
  display: flex;
  gap: 0.5rem;
}

/* 공통 버튼 스타일 */
.btn {
  padding: 0.6rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f0f0f0;
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;
  color: #333;
  white-space: nowrap; /* 버튼 텍스트 줄바꿈 방지 */
  transition: background-color 0.2s, border-color 0.2s;
}
.btn:hover {
  background-color: #e0e0e0;
  border-color: #bbb;
}
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #3182ce;
  color: white;
  border-color: #3182ce;
}
.btn-primary:hover { background-color: #2b6cb0; }

.btn-danger {
  background-color: #e53e3e;
  color: white;
  border-color: #e53e3e;
}
.btn-danger:hover { background-color: #c53030; }

.btn-edit {
  background-color: #666;
  color: white;
  border-color: #666;
  font-size: 0.8rem;
  padding: 0.4rem 0.8rem;
}
.btn-edit:hover { background-color: #555; }


/* 페이지네이션 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.loading-message, .empty-message {
  text-align: center;
  padding: 2rem;
  color: #777;
}

.edit-form-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fafafa;
}

/* 💻 데스크톱 화면 스타일 (768px 이상) */
@media (min-width: 768px) {
  .top-bar {
    flex-direction: row; /* 데스크톱: 수평 정렬 */
    justify-content: space-between;
    align-items: center;
  }

  .book-item {
    flex-direction: row; /* 데스크톱: 수평 정렬 */
    justify-content: space-between;
    align-items: center;
  }

  .book-actions {
    flex-shrink: 0; /* 너비가 줄어들지 않도록 설정 */
  }
}
</style>