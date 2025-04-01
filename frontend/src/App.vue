<template>
  <div>
    <h1>Bookstore App</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const message = ref('')
onMounted(async () => {
  const res = await axios.get('/api/hello')
  message.value = res.data.message
})
</script>
EOF
