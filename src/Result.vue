<template>
<div class="cards">
  <transition-group 
    name="list" 
    type="animation"
    @after-enter="afterEnter"
    appear
  >
    <div 
      v-for="(movie, index) in sortedViewingList" 
      :key="index"
      :class="['card',{'fade-up': isActive}, rowClassNm.class[index]]"
      :style="{animationDelay: 0.1*index+'s'}"
      @mouseover="mouseOver(rowClassNm.class[index])"
      @mouseleave="mouseLeave"
    >
      <img class="poster" :src="movie.poster">
      <!-- <img class="poster" src="https://image.tmdb.org/t/p/w500/9tNtSk46s3f1ePr59p0JG6uacc8.jpg"> -->
      <div>{{movie.title}}</div>
      <!-- <div>{{movie['date']}}</div> -->
    </div>
  </transition-group>
</div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref} from 'vue';
import { useRouter } from 'vue-router';
import { searchMovie, searchTV, sortList, getPoster, screenLock } from './modules/utils';
import { CONST } from './modules/common'

const router = useRouter();
const props = defineProps({
  viewingList: Array
});

var isActive = ref(true);

var sortedViewingList = reactive([]);

var rowClassNm = reactive({
  class: []
})

var appearCnt = 0;

sortedViewingList = sortList(props.viewingList);

const afterEnter = () => {
  appearCnt++;
  if(appearCnt == sortedViewingList.length){
    setTimeout(() => {
      isActive.value = false;
    }, 1000);
  }
};

const rowClass = () => {
  const width = window.innerWidth;
  const divNum = Math.floor(width/100)-1;
  console.log(divNum)
  const list = []
  for(var i = 0; i < width/divNum; i++){
    for(var j = 0; j < divNum; j++){
      list.push('row'+i)
    }
  }
  rowClassNm.class = list
}

rowClass()

const mouseOver = (classNm) => {
  var classes = document.getElementsByClassName(classNm) as  HTMLCollectionOf<HTMLElement>;
  for(var i = 0; i <  classes.length; i++){
    classes[i].style.transform = "translateX(-25%)";
  }
}
// const doGetPoster = async () => {
//   var vlWithPoster = await getPoster(sortedViewingList)
//   return vlWithPoster
// }

onMounted(() => {
  console.log('Result Vue >>>>>> On Mounted.');
  window.addEventListener('resize', rowClass)
});

</script>

<style>
.cards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 20px;
}

.card {
  height: auto;
  width: 100px;
  border: 1px solid black;
  border-radius: 0.7rem;
  overflow-wrap: break-word;
  font-size: clamp(10px, 1vw, 25px);
  padding: 5px;
  position: relative;
  display: inline-block;
  transition: transform 500ms;
}


/* .cards:focus-within .card, */
.cards:hover .row0 {
  transform: translateX(-25%);
}

/* .card:focus ~ .card, */
.row0:hover ~ .row0 {
  transform: translateX(25%) !important;
}

/* .cards .card:focus, */
.cards .card:hover{
  transform: scale(1.3);
  background-color: aqua;
  z-index: 1;
}
.poster {
  width: 100%;
  height: auto;
  border: 1px solid black;
  display: block;
}

.fade-up {
  animation-name:fade-up-anime;
  animation-duration:0.5s;
  animation-fill-mode:forwards;
  opacity: 0;
}

@keyframes fade-up-anime{
  from {
    opacity: 0;
    transform: translateY(100px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>