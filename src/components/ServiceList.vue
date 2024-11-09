<script setup lang="ts">
import { ref, computed } from 'vue';
import { differenceInDays, parseISO } from 'date-fns';
import type { Service } from '../types';

const props = defineProps<{
  filterDays: number | null;
  filterType: string | null;
  filterCategory: string | null;
  sortOrder: 'asc' | 'desc';
}>();

const services = ref<Service[]>([
  {
    id: 1,
    name: 'example.com',
    type: 'domain',
    category: 'Production',
    expirationDate: '2024-12-31',
    description: 'Main domain name',
  },
  {
    id: 2,
    name: 'VPS Server',
    type: 'hosting',
    category: 'Production',
    expirationDate: '2024-05-15',
    description: 'Production VPS',
  },
  {
    id: 3,
    name: 'test.com',
    type: 'domain',
    category: 'Test',
    expirationDate: '2024-04-01',
    description: 'Test domain',
  },
]);

const categories = computed(() => {
  const uniqueCategories = new Set(
    services.value.map((service) => service.category)
  );
  return Array.from(uniqueCategories).sort();
});

const addService = (newService: Omit<Service, 'id'>) => {
  const id =
    services.value.length > 0
      ? Math.max(...services.value.map((s) => s.id)) + 1
      : 1;

  services.value.push({
    ...newService,
    id,
  });
};

const filteredServices = computed(() => {
  let filtered = services.value;

  if (props.filterType) {
    filtered = filtered.filter((service) => service.type === props.filterType);
  }

  if (props.filterCategory) {
    filtered = filtered.filter(
      (service) => service.category === props.filterCategory
    );
  }

  if (props.filterDays !== null) {
    const today = new Date();
    filtered = filtered.filter((service) => {
      const daysUntilExpiration = differenceInDays(
        parseISO(service.expirationDate),
        today
      );
      return (
        daysUntilExpiration <= props.filterDays && daysUntilExpiration >= 0
      );
    });
  }

  // Sort by days until expiration
  filtered.sort((a, b) => {
    const daysA = getDaysUntilExpiration(a.expirationDate);
    const daysB = getDaysUntilExpiration(b.expirationDate);
    return props.sortOrder === 'asc' ? daysA - daysB : daysB - daysA;
  });

  return filtered;
});

const getDaysUntilExpiration = (date: string) => {
  return differenceInDays(parseISO(date), new Date());
};

const getStatusColor = (days: number) => {
  if (days <= 5) return 'bg-red-100 text-red-800 border-red-200';
  if (days <= 10) return 'bg-orange-100 text-orange-800 border-orange-200';
  if (days <= 30) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  return 'bg-green-100 text-green-800 border-green-200';
};

defineExpose({ addService, categories });
</script>

<template>
  <div class="space-y-4">
    <div
      v-for="service in filteredServices"
      :key="service.id"
      class="p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200"
    >
      <div
        class="flex flex-col md:flex-row md:justify-between md:items-center gap-4"
      >
        <div class="space-y-2">
          <div class="flex items-center gap-3">
            <h3 class="text-xl font-semibold text-gray-800">
              {{ service.name }}
            </h3>
            <span
              class="px-3 py-1 text-sm bg-gray-100 rounded-full border border-gray-200 font-medium"
            >
              {{ service.type }}
            </span>
          </div>
          <p class="text-sm text-gray-600">{{ service.description }}</p>
          <div class="flex items-center gap-2 flex-wrap">
            <span
              class="inline-block px-3 py-1.5 text-sm rounded-full border capitalize font-medium"
              :class="
                getStatusColor(getDaysUntilExpiration(service.expirationDate))
              "
            >
              {{ getDaysUntilExpiration(service.expirationDate) }} jours
              restants
            </span>
            <span
              class="px-3 py-1.5 text-sm bg-indigo-100 text-indigo-800 rounded-full border border-indigo-200 font-medium"
            >
              {{ service.category }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="filteredServices.length === 0"
      class="text-center text-gray-500 py-12 bg-white rounded-xl shadow-lg border border-gray-100"
    >
      <p class="text-lg">
        Aucun service ne correspond aux critères de filtrage
      </p>
    </div>
  </div>
</template>
