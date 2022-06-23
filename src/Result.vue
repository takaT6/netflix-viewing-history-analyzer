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
      :class="['card',{'fade-up': isActive}, rowClassNm[index]]"
      :style="{animationDelay: 0.1*index+'s'}"
      @mouseover="mouseOver(rowClassNm[index])"
      @mouseleave="mouseLeave(rowClassNm[index])"
    >
      <img class="poster" :src="movie.poster">
      <div>{{movie.title}}</div>
    </div>
  </transition-group>
</div>
</template>

<script setup lang="ts">
import { onMounted, ref} from 'vue';
import { sortList, getPoster, screenLock } from './modules/utils';

const props = defineProps({
  viewingList: Array
});

var isActive = ref(true);

var sortedViewingList = ref([]);

var rowClassNm = ref([])

var appearCnt = 0;

sortedViewingList.value = sortList(props.viewingList);

const afterEnter = () => {
  appearCnt++;
  if(appearCnt == sortedViewingList.value.length || appearCnt > 20){
    setTimeout(() => {
      isActive.value = false;
    }, 1000);
  }
};

const rowClass = () => {
  const width = window.innerWidth-25;
  const divNum = Math.floor(width/221.99);
  const rowNum = Math.floor(sortedViewingList.value.length/divNum) + 1;
  var list = [];
  for(var i = 0; i < rowNum; i++){
    for(var j = 0; j < divNum; j++){
      list.push('row'+i)
    }
  }
  rowClassNm.value = list;
}

rowClass();

const mouseOver = (classNm) => {
  var classes = document.getElementsByClassName(classNm) as  HTMLCollectionOf<HTMLElement>;
  for(var i = 0; i <  classes.length; i++){
    classes[i].style.transform = "translateX(-25%)";
  }
}
const mouseLeave = (classNm) => {
  var classes = document.getElementsByClassName(classNm) as  HTMLCollectionOf<HTMLElement>;
  for(var i = 0; i <  classes.length; i++){
    classes[i].style.transform = "translateX(0%)";
  }
}

const doGetPoster = () => {
   Promise.all(sortedViewingList.value.map(getPoster))
}
doGetPoster();

onMounted(() => {
  console.log('Result Vue >>>>>> On Mounted.');
  window.addEventListener('resize', rowClass);
});

</script>

<style scoped>
.cards {
  background-color: black;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 25px;
  padding-top: 20px;
}

.card {
  background-color: white;
  height: auto;
  width: 200px;
  border: 1px solid black;
  border-radius: 0.7rem;
  overflow-wrap: break-word;
  font-size: clamp(10px, 1vw, 25px);
  padding: 5px;
  position: relative;
  display: inline-block;
  transition: transform 500ms;
  margin: 5px;
}


/* .cards:focus-within .card, */
/* .cards:hover .row0 {
  transform: translateX(-25%);
} */

/* .card:focus ~ .card, */
/* .row0:hover ~ .row0 {
  transform: translateX(25%) !important ;
} */

/* .cards .card:focus, */
.cards .card:hover{
  transform: scale(1.5) !important;
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