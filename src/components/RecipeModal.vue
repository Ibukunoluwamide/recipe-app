<template>
  <section class="flex justify-center" v-if="recipe">
    <!-- Main modal -->
    <div id="recipeModal" class="w-full max-w-4xl">
      <div class="relative p-4 w-full h-full md:h-auto">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div
            class="flex justify-between items-center items-start p-4 rounded-t border-b dark:border-gray-600"
          >
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              {{ recipe.name }}
            </h3>
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
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import useRecipeStore from "@/stores/recipeStore";
import RecipeCard from "@/components/RecipeCard.vue";

const store = useRecipeStore();
const { recipes } = storeToRefs(store);
const route = useRoute();
const recipe = ref(null);

onMounted(async () => {
  await store.getAllRecipe();
  recipe.value = recipes.value.find((item) => item.id == route.params.id);
  console.log(recipe.value);
});
</script>

<style>
</style>