<template>
<div id="cards">
  <div 
    v-for="(movie, index) in sortedMoiveList" 
    :key="index"
    class="card"
  >
    <img :src="movie.poster">
    <!-- <img class="poster" src="https://image.tmdb.org/t/p/w500/9tNtSk46s3f1ePr59p0JG6uacc8.jpg"> -->
    <div>{{movie.title}}</div>
    <!-- <div>{{movie['date']}}</div> -->
  </div>
</div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, reactive} from 'vue';
import { useRouter } from 'vue-router';
import { searchMovie, searchTV, sortList, getPoster } from './modules/utils';
import { CONST } from './modules/common'

const router = useRouter();

const props = defineProps({
  viewingList: Array
});

var sortedMoiveList = reactive([]);
sortedMoiveList = sortList(props.viewingList);

const doGetPoster = async () => {
  var vlWithPoster = await getPoster(sortedMoiveList)
  return vlWithPoster
}
doGetPoster()
// sortedMoiveList = await doGetPoster()

// sortedMoiveList = getVL();
// var vlWithPoster
//   // (async () => {
//   //  vlWithPoster =  await getPoster(sortedVL)
//   // })()
//   console.log('start getPoster func.')
//   vlWithPoster = await getPoster(sortedVL)
//   console.log(vlWithPoster)
//   console.log('log getPoster func.')

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
  height: auto;
  width: 20vw;
  border: 1px solid black;
  border-radius: 0.7rem;
  margin: 5px;
  overflow-wrap: break-word;
  font-size: clamp(10px, 1vw, 25px);
}

.poster {
  width: 100%;
  height: auto;
}
</style>