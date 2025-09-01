<script setup>

// Import de la fonction ref depuis Vue pour pouvoir manipuler des données réactives
import { ref, watch } from 'vue';
// Import de l'icône de suppression depuis Heroicons
import { XMarkIcon } from "@heroicons/vue/24/outline";

// Nouvelle tâche à saisir
const newTask = ref('');
// Initialisation du tableau des tâches créées
const tasks = ref([
  { text: 'Apprendre Vue 3', done: true },  
  { text: 'S\'initier à TailwindCss', done: true },
  { text: 'Créer une application de liste de tâches', done: true },
]);
// Récupération des tâches existantes depuis le localStorage du navigateur
if (localStorage.getItem('tasks')) {
  tasks.value = JSON.parse(localStorage.getItem('tasks'));
}
// Sauvegarde des tâches dans le localStorage
watch(tasks, (newTasks) => {
  localStorage.setItem('tasks', JSON.stringify(newTasks));
}, { deep: true });

// Fonction pour ajouter une nouvelle tâche
const addTask = () => {
  // Si une tâche est saisie
  if (newTask.value.trim() !== '') {
    // On ajoute la tâche au tableau avec le statut "non faite"
    tasks.value.push({ text: newTask.value, done: false });
    // On réinitialise le champ de saisie d'une nouvelle tâche
    newTask.value = '';
  }
};

// Fonction pour supprimer une tâche
const removeTask = (index) => {
  tasks.value.splice(index, 1);
};

</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
    <!-- TITRE -->
    <h1 class="text-4xl font-bold">Ma liste de tâches à faire</h1>
    <!-- FORMULAIRE D'AJOUT DE TÂCHE -->
    <form @submit.prevent="addTask" class="mt-8 w-full max-w-md">
      <div class="flex items-center border-b border-b-2 border-gray-300 dark:border-gray-700 py-2">
        <input name="inputTask" v-model="newTask" class="appearance-none bg-transparent border-none w-full text-gray-900 dark:text-gray-100 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Nouvelle tâche" aria-label="Nouvelle tâche">
        <button class="shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
          Ajouter
        </button>
      </div>
    </form>
    <!-- LISTE DES TÂCHES -->
    <ul class="mt-8 w-full max-w-md">
      <li v-for="(task, index) in tasks" :key="index" class="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded mb-2 p-4">
        <span :class="['mr-auto break-all',{'line-through text-gray-500': task.done }]">{{ task.text }}</span>
        <input type="checkbox" v-model="task.done" class="bg-red-500 h-5 w-5 ml-4 shrink-0">
        <x-mark-icon @click="removeTask(index)" class="h-6 w-6 text-red-500 hover:text-red-700 ml-4 shrink-0 cursor-pointer" />
      </li>
    </ul>     
  </div>
</template>

