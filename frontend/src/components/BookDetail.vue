<template>
  <div class="book-detail-container">
    <div v-if="book && !isEditing" class="card">
      <h2>📘 책 상세 정보</h2>
      <div class="info-grid">
        <p><strong>제목</strong></p><p>{{ book.title }}</p>
        <p><strong>저자</strong></p><p>{{ book.author }}</p>
        <p><strong>수량</strong></p><p>{{ book.quantity }}</p>
      </div>
      <div class="button-group">
        <button @click="isEditing = true" class="btn-edit">✏️ 수정</button>
        <button @click="deleteBook" class="btn-delete">❌ 삭제</button>
        <router-link to="/" class="btn-back">← 목록으로 돌아가기</router-link>
      </div>
    </div>

    <div v-else-if="book && isEditing" class="card">
      <h2>📝 책 정보 수정</h2>
      <form @submit.prevent="updateBook">
        <div class="form-group">
          <label for="title">제목:</label>
          <input id="title" v-model="book.title" required />
        </div>
        <div class="form-group">
          <label for="author">저자:</label>
          <input id="author" v-model="book.author" required />
        </div>
        <div class="form-group">
          <label for="quantity">수량:</label>
          <input id="quantity" type="number" v-model.number="book.quantity" min="0" required />
        </div>
        <div class="button-group">
          <button type="submit" class="btn-save">💾 저장</button>
          <button @click.prevent="isEditing = false" class="btn-cancel">취소</button>
        </div>
      </form>
    </div>

    <p v-else class="loading-message">불러오는 중...</p>
  </div>
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

<style scoped>
/* 🎨 공통 및 모바일 스타일 (Mobile-First) */
.book-detail-container {
  padding: 1rem;
  max-width: 800px;
  margin: 0 auto; /* 데스크톱에서 중앙 정렬 */
}

.card {
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
}

h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #1a202c;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.75rem;
}

/* 상세 정보 표시 스타일 */
.info-grid {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.75rem 1rem;
  margin-bottom: 1.5rem;
}

.info-grid p {
  margin: 0;
}

/* 폼 스타일 */
.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #4a5568;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
  box-sizing: border-box; /* padding을 포함하여 width 계산 */
  transition: border-color 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}

/* 버튼 스타일 */
.button-group {
  display: flex;
  flex-direction: column; /* 모바일: 버튼 수직 정렬 */
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.button-group > * { /* button, router-link 공통 스타일 */
  display: block;
  width: 100%;
  text-align: center;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.2s, transform 0.1s;
}

.button-group > *:active {
  transform: translateY(1px);
}

.btn-edit, .btn-save {
  background-color: #3182ce;
  color: white;
}
.btn-edit:hover, .btn-save:hover {
  background-color: #2b6cb0;
}

.btn-delete {
  background-color: #e53e3e;
  color: white;
}
.btn-delete:hover {
  background-color: #c53030;
}

.btn-back, .btn-cancel {
  background-color: #e2e8f0;
  color: #2d3748;
  border: 1px solid #cbd5e0;
}
.btn-back:hover, .btn-cancel:hover {
  background-color: #cbd5e0;
}

.loading-message {
  text-align: center;
  color: #718096;
  font-size: 1.2rem;
  padding: 2rem;
}


/* 💻 데스크톱 화면 스타일 (768px 이상) */
@media (min-width: 768px) {
  .button-group {
    flex-direction: row; /* 데스크톱: 버튼 수평 정렬 */
    justify-content: flex-start;
  }
  .button-group > * {
    width: auto; /* 버튼 너비를 내용에 맞게 조절 */
  }
}
</style>