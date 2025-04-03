<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from '@/lib/axios'
// import BookEditForm from './BookEditForm.vue'
import type { Book } from '@/types/book'

const books = ref<Book[]>([])
const page = ref<number>(1)
const perPage = 10
const totalPages = ref<number>(1)
const searchKeyword = ref<string>('')

const isEditing = ref<boolean>(false)
const selectedBook = ref<Book | null>(null)

const isLoading = ref<boolean>(false)

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

// 필요한 경우에만 expose
defineExpose({ loadBooks })
</script>
