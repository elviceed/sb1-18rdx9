<script setup lang="ts">
import { ref } from 'vue';
import type { Service } from '../types';

const emit = defineEmits<{
  (event: 'add-service', service: Omit<Service, 'id'>): void
}>();

const name = ref('');
const type = ref<Service['type']>('domain');
const category = ref('');
const expirationDate = ref('');
const description = ref('');

const handleSubmit = () => {
  emit('add-service', {
    name: name.value,
    type: type.value,
    category: category.value,
    expirationDate: expirationDate.value,
    description: description.value
  });

  // Reset form
  name.value = '';
  type.value = 'domain';
  category.value = '';
  expirationDate.value = '';
  description.value = '';
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">
          Nom du service
        </label>
        <input
          v-model="name"
          type="text"
          required
          placeholder="exemple.com"
          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
        />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">
          Type
        </label>
        <select
          v-model="type"
          required
          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
        >
          <option value="domain">Nom de domaine</option>
          <option value="hosting">Hébergement</option>
          <option value="other">Autre</option>
        </select>
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">
          Catégorie
        </label>
        <input
          v-model="category"
          type="text"
          required
          placeholder="Production, Test, Client A..."
          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
        />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">
          Date d'expiration
        </label>
        <input
          v-model="expirationDate"
          type="date"
          required
          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
        />
      </div>

      <div class="md:col-span-2 space-y-2">
        <label class="block text-sm font-medium text-gray-700">
          Description
        </label>
        <input
          v-model="description"
          type="text"
          placeholder="Description optionnelle"
          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
        />
      </div>
    </div>

    <div class="mt-6">
      <button
        type="submit"
        class="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
      >
        Ajouter le service
      </button>
    </div>
  </form>
</template>