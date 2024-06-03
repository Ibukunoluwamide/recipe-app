<template>
  <section class="">
    <div class="text-2xl font-semibold p-2">Favourite Count: {{favCounter}}</div>
    <div class="flex justify-between items-center p-3">
      <div class="">
        <h1 class="text-3xl font-bold">Recipes</h1>
      </div>
      <div class="">
        <form class="md:w-[25vw]">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >Search</label
          >
          <div class="relative">
            <div
              class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
            >
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="search"
              v-model="searchInput"
              class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search Recipes..."
              required
            />
          </div>
        </form>
      </div>
    </div>
    <div class="">
      
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-3 m-3">
        <RecipeCard  v-for="(recipe,index) in filteredRecipes" :key="index" :recipedetails="recipe" @fav="getFav"/>
      </div>
      <div v-if="loading">
        <div aria-label="Loading..." role="status" class="flex items-center justify-center mt-44 space-x-2">
    <svg class="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
        <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
        <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
            stroke-width="24"></line>
        <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
        </line>
        <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
            stroke-width="24"></line>
        <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
        </line>
        <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
            stroke-width="24"></line>
        <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
        <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
        </line>
    </svg>
    <span class="text-4xl font-medium text-gray-500">Loading...</span>
</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import useRecipeStore from "@/stores/recipeStore";
import RecipeCard from "@/components/RecipeCard.vue";

import { storeToRefs } from "pinia";
const store = useRecipeStore();
const { recipes } = storeToRefs(store);
const searchInput = ref('')
const loading = ref(true)
const favCounter = ref(0)
onMounted(() => {
  // console.log(recipes.value);
  setTimeout(() => {
    loading.value = false
    store.getAllRecipe();
  }, 3000)
});
const filteredRecipes = computed(()=>{
  return recipes.value.filter((recipe) => recipe.name.toLowerCase().includes(searchInput.value.toLowerCase()))
})
const getFav= (e)=>{
console.log((e));
if (e) {
favCounter.value++ 
}else{
  favCounter.value-- 
}
  console.log(favCounter.value);
}
</script>

<style>
</style>