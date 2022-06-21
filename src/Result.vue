<template>
 <div v-for="(movie, index) in props.movieList" :key="index">
   <div>{{movie['title']}}</div>
   <div>{{movie['date']}}</div>
 </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, reactive} from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  movieList: Array
});

onMounted(() => {
  console.log('Result Vue >>>>>> On Mounted.');
})

</script>