<template>
  <section class="flex justify-center" v-if="recipe">
    <!-- Main modal -->
<div id="default-modal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full h-full md:h-auto">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div
            class="flex justify-between items-center items-start p-4 rounded-t border-b dark:border-gray-600"
          >
            <h3 v-if="!editStatus" class="text-xl font-semibold text-gray-900 dark:text-white" >
              {{updatedName || recipe.name}}
              <i class="fas fa-edit" @click="editName"></i>
            </h3>
          <div class="w-64" v-else>
 
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
        <input type="search" id="default-search" class="block w-full p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" v-model="inputValue" required />
        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2" @click="saveChanges">Save</button>
    </div>

          </div>
                         <img :src="recipe.image" alt="" class="rounded-md w-[5%]" />

          </div>
          <!-- Modal body -->
          <div class="p-6 space-y-6">
            <div>
              <h4 class="text-lg font-semibold pb-3">Ingredients:</h4>
              <div class="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
                <div
                  class=""
                  v-for="(ing, index) in recipe.ingredients"
                  :key="index"
                >
                  <div
                    id="toast-default"
                    class="flex items-center w-full max-w-xs p-4 text-gray-500 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br  rounded-lg shadow"
                    role="alert"
                  >
                    <div class="ms-3 text-sm font-normal">{{ ing }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 class="text-lg font-semibold pb-3">Instructions:</h4>
              <div
                class="leading"
                v-for="(ins, index) in recipe.instructions"
                :key="index"
              >
                <h6 class="font-semibold mt-4">Step {{ index + 1 }}</h6>
                <i> {{ ins }}</i>
              </div>
            </div>
            <div class="text-sm text-gray-600 flex justify-between items-center">
              <div class="leading-6">
                <p>
                  <strong>Prep Time:</strong>
                  {{ recipe.prepTimeMinutes }} minutes
                </p>
                <p>
                  <strong>Cook Time:</strong>
                  {{ recipe.cookTimeMinutes }} minutes
                </p>
                <p><strong>Servings:</strong> {{ recipe.servings }}</p>
                <p><strong>Difficulty:</strong> {{ recipe.difficulty }}</p>
                <p><strong>Cuisine:</strong> {{ recipe.cuisine }}</p>
                <p><strong>Meal Type:</strong> {{ recipe.mealType[0] }}</p>
              </div>
              <img :src="recipe.image" alt="" class="rounded-md shadow w-[20%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- {{ recipe }} -->
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import useRecipeStore from "@/stores/recipeStore";
import RecipeCard from "@/components/RecipeCard.vue";
// const props = defineProps(['recipe','name'])
const store = useRecipeStore();
const { recipes } = storeToRefs(store);
const route = useRoute();
const recipe = ref(null);
const updatedName = ref("");
const editStatus = ref(false);
const inputValue = ref('');
const emitValue2 = defineEmits("updatedNameToParent")

onMounted(() => {
   store.getAllRecipe();
  recipe.value = recipes.value.find((item) => item.id == route.params.id);
  console.log(recipe.value);
});
const recipeUpdate = computed(()=>{
  return recipe.value
})
const editName =()=>{
  editStatus.value = true
  // updatedName.value = prompt('Edit Recipe Name')
  // console.log(updatedName.value);
}
const saveChanges=()=>{
  editStatus.value = false
  updatedName.value = inputValue.value
  emitValue2('updatedNameToParent', updatedName)
}
</script>

<style>
</style>