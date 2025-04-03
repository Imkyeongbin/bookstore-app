<template>
  <div>
    <h1>📚 Bookstore</h1>

    <!-- 상세 페이지용 라우팅 영역 -->
    <router-view />

    <!-- 리스트 + 등록 구역 (라우터로 분리됐으므로 주석 처리) -->
    <!--
    <div v-if="!showForm">
      <button @click="showForm = true">➕ 새 책 등록</button>
      <BookList ref="bookListRef" />
    </div>

    <div v-else>
      <BookForm @book-added="handleBookAdded" />
      <button @click="showForm = false">← 돌아가기</button>
    </div>
    -->
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
// import BookForm from './components/BookForm.vue'
// import BookList from './components/BookList.vue'

const bookListRef = ref<InstanceType<any> | null>(null)  // 또는 정확한 타입 지정 가능
const showForm = ref<boolean>(false)

const refreshBooks = (): void => {
  bookListRef.value?.loadBooks?.()
}

const handleBookAdded = (): void => {
  showForm.value = false
  refreshBooks()
}

defineExpose({ refreshBooks })
</script>
