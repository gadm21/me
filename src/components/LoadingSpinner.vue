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
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(17, 24, 39, 0.9);
  backdrop-filter: blur(4px);
  z-index: 50;
}

.spinner-container {
  text-align: center;
}

.wifi-loader {
  position: relative;
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1rem;
}

.wave {
  position: absolute;
  inset: 0;
  border: 2px solid #3B82F6;
  border-radius: 50%;
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
  color: #3B82F6;
  font-size: 0.875rem;
}
</style>
