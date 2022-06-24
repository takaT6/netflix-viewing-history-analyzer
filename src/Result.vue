<template>
  <div id="field">
    <transition-group 
      name="list" 
      type="animation"
      @after-enter="afterEnter"
      appear
    >
      <div 
        v-for="(movie, index) in sortedViewingList" 
        :key="index"
        :class="['card',{'fade-up': isActive}, rowClassNm[index], 'card'+index]"
        :style="{animationDelay: 0.1*index+'s'}"
        @mouseover="mouseOver(rowClassNm[index]), addInfo(movie)"
        @mouseleave="mouseLeave(rowClassNm[index], delInfo(movie))"
        @click="click(movie)"
      >
        <img class="poster" :src="movie.poster">
        <div>{{movie.title}}</div>
        <div v-if="movie.show_info && movie.release_date != ''">{{movie.release_date}}</div>
        <div v-if="movie.show_info && movie.first_air_date != ''">{{movie.first_air_date}}</div>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref} from 'vue';
import { sortList, getPoster } from './modules/utils';

const props = defineProps({
  viewingList: Array
});

var isActive = ref(true);

var sortedViewingList = ref([]);

var rowClassNm = ref([])

sortedViewingList.value = sortList(props.viewingList);

var appearCnt = 0;
const afterEnter = () => {
  appearCnt++;
  if(appearCnt == sortedViewingList.value.length || appearCnt > 20){
    setTimeout(() => {
      isActive.value = false;
    }, 1);
  }
};

const rowClass = () => {
  const width = window.innerWidth-25-17;
  const divNum = Math.floor(width/214);
  const rowNum = Math.floor(sortedViewingList.value.length/divNum);
  var list = [];
  for(var i = 0; i < rowNum; i++){
    for(var j = 0; j < divNum; j++){
      list.push('row'+i)
    }
  }
  rowClassNm.value = list;
}

rowClass();

const doGetPoster = () => {
   Promise.all(sortedViewingList.value.map(getPoster))
}
// doGetPoster();

const mouseOver = (classNm: string) => {
  var classes = document.getElementsByClassName(classNm) as  HTMLCollectionOf<HTMLElement>;
  for(var i = 0, len = classes.length; i <  len; i++){
    classes[i].style.transform = "translateX(-25%)";
  }
}
const mouseLeave = (classNm: string) => {
  var classes = document.getElementsByClassName(classNm) as  HTMLCollectionOf<HTMLElement>;
  for(var i = 0, len = classes.length; i <  len; i++){
    classes[i].style.transform = "translateX(0%)";
  }
}

const click = (movie: any) => {
  console.log(movie)
}

const addInfo = (movie: { show_info: boolean; }) => {
  movie.show_info = true;
}

const delInfo = (movie: { show_info: boolean; }) => {
  movie.show_info = false;
}

onMounted(() => {
  console.log('Result Vue >>>>>> On Mounted.');
  window.addEventListener('resize', rowClass);
});

</script>

<style scoped>
#field {
  background-color: black;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  /* align-items: center; */
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 25px;
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
  transition-property: transform;
  transition: transform 500ms;
  margin: 5px 0 5px 0;
  padding-right: 7px !important;
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
#field .card:hover{
  transform: scale(1.3) !important;
  background-color: rgb(216, 39, 69);
  z-index: 100;
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