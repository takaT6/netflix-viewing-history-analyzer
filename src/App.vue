<template>
  <div>
    <!-- <transition mode="out-in"> -->
      <component
        :is="subPage"
        v-model:viewingList="viewingList"
      ></component>
    <!-- </transition> -->
  </div>
</template>

<script setup lang="ts">
import Loader from './Loader.vue' 
import Result from './Result.vue'
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref, computed } from 'vue';

const route = useRoute();
const router = useRouter();
var viewingList = ref();

const subPage = computed(()=>{
  switch(route.hash){
    case '#upload':
      return Loader
    case '#result':
      return Result
  }
});

onMounted(() => {
  router.push({hash: '#upload'})
  console.log('App Vue >>>>>> On mounted.');

  window.addEventListener('popstate', function (e) {
    console.log('Catch postate.')
    router.push({hash: '#upload'})
  });
});

</script>

<style>

</style>
