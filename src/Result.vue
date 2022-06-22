<template>
<div id="cards">
  <div 
    v-for="(movie, index) in sortedMoiveList" 
    :key="index"
    class="card"
  >
    <div>{{movie.title}}</div>
    <!-- <div>{{movie['date']}}</div> -->
  </div>
</div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, reactive} from 'vue';
import { useRouter } from 'vue-router';
import { searchMovie, searchTV, sortList } from './modules/utils';

const router = useRouter();

const props = defineProps({
  movieList: Array
});

var sortedMoiveList = sortList(props.movieList)

onMounted(() => {
  console.log('Result Vue >>>>>> On Mounted.');
})
searchMovie('死霊のはらわた');
///7Zb9hm24sxz2Mv7BKjyYkr3q0bz.jp
</script>

<style>
#cards {
  /* float: left; */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.card {
  height: 200px;
  width: 100px;
  border: 1px solid black;
  border-radius: 0.7rem;
  margin: 5px;
  overflow-wrap: break-word;
}
</style>