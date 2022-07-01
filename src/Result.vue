<template>
  <Loading v-if="show_loading"></Loading>
  <div id="field" v-if="show_all">
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
        @mouseover="addInfo(movie)"
        @mouseleave="delInfo(movie)"
      >
        <img class="poster" :src="movie.poster">
        <div>{{movie.title}}</div>
        <div class="movie-info" v-if="movie.show_info">
          <div v-if="movie.release_date != ''">公開日：{{movie.release_date}}</div>
          <div v-if="movie.first_air_date != ''">初回放送日：{{movie.first_air_date}}</div>
          <div 
            @click="clickInfo(movie, 'card'+index, $event)"
            style="font-size:1.2em;cursor: pointer;"
          >
            詳細を見る
            <i class="fa-solid fa-circle-chevron-down fa-flip" style="--fa-animation-duration: 3s;"
            ></i>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
  <transition name="modal">
    <div id="modal" class="overlay" v-if="show_modal">
      <div id="close-modal-btn-area">
        <i 
          class="fa-solid fa-circle-xmark fa-3x modal-close-icon" 
          style="color:white;" 
          id="btnCloseModal" 
          @click="btnCloseModalTap">
        </i>
      </div>
      <Modal v-model:movieInfo="data4Modal"></Modal>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onMounted, ref} from 'vue';
import { sortList, getPoster } from './modules/utils';
import Modal from './Modal.vue';
import Loading from './Loading.vue';
/*===============================================================*/
const props = defineProps({viewingList: Array});

var isActive = ref(true);

var sortedViewingList = ref([]);

var rowClassNm = ref([]);

var show_all = ref(false);

var show_loading = ref(true);

var show_modal = ref(false);

var appearCnt = 0;

var data4Modal = ref([]);
/*===============================================================*/

sortedViewingList.value = sortList(props.viewingList);

const rowClass = (): void => {
  const width = window.innerWidth;
  const divNum = Math.floor(width/212);
  const rowNum = Math.floor(sortedViewingList.value.length/divNum);
  var list = [];
  for(var i = 0; i < rowNum; i++){
    for(var j = 0; j < divNum; j++){
      if(j+1 == divNum) list.push('row'+i + " " + "row-right");
      else if(j == 0) list.push('row'+i + " " + "row-left");
      else list.push('row'+i);
    }
  }
  rowClassNm.value = list;
};

rowClass();

const doGetPoster = async(): Promise<void> => {
  const copy = sortedViewingList.value;
  await Promise.all(copy.map(getPoster));
  show_all.value = true;
};
doGetPoster();

const afterEnter = (): void => {
  appearCnt++;
  if(appearCnt > 10)isActive.value = false;
  if(appearCnt == sortedViewingList.value.length)show_loading.value = false;
};

const clickInfo = (movie: any[], classNm: string, event): void => {
  var el = document.getElementsByClassName(classNm) as  HTMLCollectionOf<HTMLElement>;
  const coordinate = {x: event.offsetX, y: event.offsetY};
  // el[0].style.transformOrigin = coordinate.y + 'px' + ' ' + coordinate.x + 'px';
  // console.log(coordinate.y + 'px' + ' ' + coordinate.x + 'px');
  console.log(event);
  data4Modal.value = movie;
  show_modal.value = true;
};

const addInfo = (movie: { show_info: boolean; }): void => {
  movie.show_info = true;
};

const delInfo = (movie: { show_info: boolean; }): void => {
  movie.show_info = false;
};
const btnCloseModalTap = (): void => {
  show_modal.value = false;
}
/*===============================================================*/
onMounted((): void => {
  console.log('Result Vue >>>>>> On Mounted.');
  window.addEventListener('resize', rowClass);
});
/*===============================================================*/
</script>

<style scoped>
#field {
  background-color: black;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px 0 25px 0;
  margin-bottom: 50px;
}

.card {
  background-color: white;
  width: 200px;
  /* border-radius: 0.7rem; */
  overflow-wrap: break-word;
  font-size: clamp(11px, 1vw, 25px);
  padding: 5px;
  position: relative;
  display: block;
  transition-property: transform;
  transition: transform 500ms;
  margin: 5px 0 5px 0;
  padding-right: 7px !important;
  z-index: 10;
}

.movie-info {
  background-color: rgb(216, 39, 69);
  position: absolute;
  text-align: center;
  left: 0;
  right: 0;
}

#field .card:hover{
  transform: scale(1.4) !important;
  background-color: rgb(216, 39, 69);
  z-index: 20;
}

.poster {
  width: 100%;
  height: auto;
  border: 1px solid black;
  display: block;
}

.row-right {
  transform-origin: center right;
}

.row-left {
  transform-origin: center left;
}

.fade-up {
  animation-name:fade-up-anime;
  animation-duration:1.5s;
  animation-fill-mode:forwards;
  opacity: 0;
}

@keyframes fade-up-anime{
  from {
    opacity: 0;
    transform: translateY(300px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

#modal {
  top: 8vh;
  display: block;
  z-index: 30;
}

#close-modal-btn-area {
  background-color:rgba(31, 27, 27, 0);
  display: flex;
  justify-content: flex-end;
}

.modal-enter-active {
  animation: zoom-up .5s;
}
@keyframes zoom-up {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

.modal-leave-active {
  animation: zoom-up .5s;
  animation-direction: reverse;
  
}

.modal-close-icon:hover{
 transition: 1.0s ;
 color: red !important;
}

#btnCloseModal {
  padding:5px 0 1px 0;
  z-index: 2000;
  top: 0.5rem;
  right: 1rem;
  cursor: pointer;
  background-color: black;
  border-radius: 50%;
}
</style>