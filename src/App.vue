<template>
  <!-- <div id="preview">
    <table>
      <tr v-for="(movie, index) in movieList" :key="index">
        <td class="preview-title">{{movie.title}}</td>
        <td class="preview-date">{{movie.date}}</td>
      </tr>
    </table>
  </div> -->
  <div>
    <transition mode="out-in">
      <component
        :is="subPage"
        v-model:movieList="movieList"
      ></component>
    </transition>
  </div>
</template>

<script setup lang="ts">
import Loader from './Loader.vue' 
import Result from './Result.vue'
import { computed } from '@vue/reactivity';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

const route = useRoute();
const router = useRouter();

var movieList = ref();

onMounted(() => {
  router.push({hash:"#upload"})
})

const subPage = computed(()=>{
  switch(route.hash){
    case '#upload':
      return Loader
    case '#result':
      return Result
  }
})

</script>

<style>

</style>
