<template>
  <div class="overlay" v-if="show_loading">
    <i 
      class="fa-solid fa-circle-notch fa-spin fa-5x" 
      style="color:white"
    ></i>
  </div>
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
        @mouseover="mouseOver(rowClassNm[index]), addInfo(movie)"
        @mouseleave="mouseLeave(rowClassNm[index]), delInfo(movie)"
        @click="click(movie, 'card'+index)"
      >
        <img class="poster" :src="movie.poster">
        <div>{{movie.title}}</div>
        <div v-if="movie.show_info">
          <div v-if="movie.release_date != ''">公開日：{{movie.release_date}}</div>
          <div v-if="movie.first_air_date != ''">初回放送日：{{movie.first_air_date}}</div>
          <!-- <div v-if="movie.show_info">{{movie.info}}</div> -->
          <div>
            詳細を見る
            <i class="fa-solid fa-circle-info fa-flip" 
              style="--fa-animation-duration: 3s;"
            ></i>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
  <div class="overlay" v-if="show_modal">
    <div id="content">
      <p>これがモーダルウィンドウです。</p>
      <p><button>close</button></p>
    </div>
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

var rowClassNm = ref([]);

var show_all = ref(false);

var show_loading = ref(true);

var show_modal = ref(false);

sortedViewingList.value = sortList(props.viewingList);

var appearCnt = 0;
const afterEnter = (): void => {
  appearCnt++;
  if(appearCnt == sortedViewingList.value.length || appearCnt > 10){
      isActive.value = false;
  }
  if(appearCnt == sortedViewingList.value.length){
    show_loading.value = false;
  }
};

const rowClass = (): void => {
  const width = window.innerWidth-70;
  const divNum = Math.floor(width/214);
  const rowNum = Math.floor(sortedViewingList.value.length/divNum);
  var list = [];
  for(var i = 0; i < rowNum; i++){
    for(var j = 0; j < divNum; j++){
      list.push('row'+i);
    }
  }
  rowClassNm.value = list;
};

rowClass();

const doGetPoster = async() => {
  const copy = sortedViewingList.value;
  await Promise.all(copy.map(getPoster));
  show_all.value = true;
};
doGetPoster();

const mouseOver = (classNm: string): void => {
  var classes = document.getElementsByClassName(classNm) as  HTMLCollectionOf<HTMLElement>;
  for(var i = 0, len = classes.length; i <  len; i++){
    classes[i].style.transform = "translateX(-25%)";
  }
};
const mouseLeave = (classNm: string): void => {
  var classes = document.getElementsByClassName(classNm) as  HTMLCollectionOf<HTMLElement>;
  for(var i = 0, len = classes.length; i <  len; i++){
    classes[i].style.transform = "translateX(0%)";
  }
};

const click = (movie, classNm): void => {
  console.log(classNm)
  var el = document.getElementsByClassName(classNm) as  HTMLCollectionOf<HTMLElement>;
  // el[0].style.width = '100vw'
  show_modal.value = true;
  console.log(movie);
};

const addInfo = (movie: { show_info: boolean; }): void => {
  movie.show_info = true;
};

const delInfo = (movie: { show_info: boolean; }): void => {
  movie.show_info = false;
};

onMounted((): void => {
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
  padding-left: 35px;
  padding-right: 35px;
  padding-top: 20px;
  padding-bottom: 25px;
}

.card {
  background-color: white;
  /* min-height: 317px; */
  width: 200px;
  border: 1px solid black;
  border-radius: 0.7rem;
  overflow-wrap: break-word;
  font-size: clamp(11px, 1vw, 25px);
  padding: 5px;
  position: relative;
  display: block;
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

.overlay {
  /*　要素を重ねた時の順番　*/
  z-index:1;

  /*　画面全体を覆う設定　*/
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);

  /*　画面の中央に要素を表示させる設定　*/
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>