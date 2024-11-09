<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToServices = () => {
  router.push('/services');
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center px-4">
    <div class="max-w-3xl w-full text-center text-white">
      <h1 class="text-5xl font-bold mb-6">
        Gestionnaire d'Expirations
      </h1>
      <p class="text-xl mb-12 text-indigo-100">
        Suivez et gérez facilement les dates d'expiration de vos domaines, hébergements et autres services.
      </p>
      <button
        @click="navigateToServices"
        class="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform"
      >
        Accéder à mes services
        <span class="ml-2">→</span>
      </button>
    </div>
  </div>
</template>