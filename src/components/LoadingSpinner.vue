<template>
  <div class="loading-spinner">
    <div class="spinner-container">
      <div class="wifi-loader">
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
      </div>
      <p class="loading-text">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: 'Loading...'
  }
})
</script>

<style scoped>
.loading-spinner {
  @apply fixed inset-0 flex items-center justify-center bg-ink/90 backdrop-blur-sm z-50;
}

.spinner-container {
  @apply text-center;
}

.wifi-loader {
  @apply relative w-16 h-16 mx-auto mb-4;
}

.wave {
  @apply absolute inset-0 border-2 border-sage rounded-full;
  animation: wifi-wave 2s ease-out infinite;
}

.wave:nth-child(2) {
  animation-delay: 0.5s;
}

.wave:nth-child(3) {
  animation-delay: 1s;
}

@keyframes wifi-wave {
  0% {
    transform: scale(0.5);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.loading-text {
  @apply text-sage-light text-sm;
}
</style>
