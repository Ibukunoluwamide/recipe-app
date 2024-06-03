<template>
  <!-- {{recipedetailss}} -->
  <section>
    <div class="">
      <div
        class="max-w-sm bg-white border border-gray-200 rounded-lg shadow"
       
      >
          <div class="relative">
            <img class="rounded-t-lg" :src="recipedetails.image" alt="product image" />
          </div>
            <div
              class="float-end inline-flex  w-10 h-10 text-xs font-bold text-white "
            >
             <i @click="toggleFav" :class="`${fav?'text-red-500 fa-solid':'fa-regular text-red-500'}  fa-heart text-3xl cursor-pointer`"></i>
            </div>
        <div class="px-5 pb-5">
          <RouterLink :to="`/recipes/${recipedetails.id}`">
            <h5 class="text-xl font-semibold tracking-tight text-gray-900">
              {{ recipedetails.name }}
            </h5>
          </RouterLink>
          <div class="flex items-center mt-2.5 mb-5">
            <div class="flex items-center space-x-1 rtl:space-x-reverse">
              <div
                class=""
                v-for="(rate, index) in [1, 2, 3, 4, 5]"
                :key="index"
              >
                <svg
                  :class="
                    index+1 <= recipedetails.rating
                      ? 'w-4 h-4 text-yellow-300'
                      : 'w-4 h-4 text-gray-300'
                  "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                  />
                </svg>
              </div>
            </div>
            <span
              class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 d ms-3"
              >{{ recipedetails.rating }}</span
            >
          </div>
          <div class="flex items-center justify-between">
            <span class="text-xl font-bold text-blue-600"
              >{{ recipedetails.prepTimeMinutes }} mins</span
            >
            <button
              class="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white focus:outline-none"
              data-modal-target="default-modal"
              data-modal-toggle="default-modal"
            >
              <RouterLink
                :to="`/recipes/${recipedetails.id}`"
                class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0"
              >
                View Recipe
              </RouterLink>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps(["recipedetails"]);
import { computed, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
const fav = ref(false)
const emit = defineEmits('fav')
const favCount = ref(0)
// onMounted(()=>{
//   console.log(recipedetailss);
// })
const toggleFav = ()=>{
  fav.value = !fav.value
  if (fav.value) {
    favCount.value++
  }else{
    favCount.value--
  }
    emit('fav', fav.value)
}
</script>

<style>
</style>