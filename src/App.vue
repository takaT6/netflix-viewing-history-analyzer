<template>
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

const subPage = computed(()=>{
  switch(route.hash){
    case '#upload':
      return Loader
    case '#result':
      return Result
  }
});

onMounted(() => {
  router.push({hash:"#upload"})
});

</script>

<style>

</style>
