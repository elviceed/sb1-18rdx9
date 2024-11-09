<script setup lang="ts">
import { ref } from 'vue';
import ServiceList from '../components/ServiceList.vue';
import AddServiceForm from '../components/AddServiceForm.vue';
import Modal from '../components/Modal.vue';

const filterDays = ref<number | null>(30);
const filterType = ref<string | null>(null);
const filterCategory = ref<string | null>(null);
const sortOrder = ref<'asc' | 'desc'>('asc');
const showModal = ref(false);
const serviceListRef = ref<InstanceType<typeof ServiceList> | null>(null);

const handleAddService = (service: any) => {
  serviceListRef.value?.addService(service);
  showModal.value = false;
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-5xl mx-auto px-4">
      <div class="flex justify-between items-center mb-12">
        <div>
          <h1 class="text-4xl font-bold text-gray-900 mb-2">
            Mes Services
          </h1>
          <p class="text-gray-600">
            Gérez les dates d'expiration de vos services
          </p>
        </div>
        <button
          @click="showModal = true"
          class="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
        >
          Ajouter un service
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Filtrer par expiration:
          </label>
          <select
            v-model="filterDays"
            class="block w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          >
            <option :value="null">Tous les services</option>
            <option :value="5">Expiration dans 5 jours</option>
            <option :value="10">Expiration dans 10 jours</option>
            <option :value="30">Expiration dans 30 jours</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Filtrer par type:
          </label>
          <select
            v-model="filterType"
            class="block w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          >
            <option :value="null">Tous les types</option>
            <option value="domain">Nom de domaine</option>
            <option value="hosting">Hébergement</option>
            <option value="other">Autre</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Filtrer par catégorie:
          </label>
          <select
            v-model="filterCategory"
            class="block w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          >
            <option :value="null">Toutes les catégories</option>
            <option v-for="category in serviceListRef?.categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Trier par jours restants:
          </label>
          <select
            v-model="sortOrder"
            class="block w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          >
            <option value="asc">Plus urgent d'abord</option>
            <option value="desc">Moins urgent d'abord</option>
          </select>
        </div>
      </div>

      <ServiceList 
        ref="serviceListRef"
        :filter-days="filterDays"
        :filter-type="filterType"
        :filter-category="filterCategory"
        :sort-order="sortOrder"
      />
    </div>
  </div>

  <Modal
    :show="showModal"
    title="Ajouter un nouveau service"
    @close="showModal = false"
  >
    <AddServiceForm @add-service="handleAddService" />
  </Modal>
</template>