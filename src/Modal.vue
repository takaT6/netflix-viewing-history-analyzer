<template>
  <div id="modal-area" class="">
    <div id="modal-content">
      <div id="modal-img">
        <img id="modal-poster" :src="movieInfo.poster">
        <img id="modal-backdrop" :src="movieInfo.backdrop">
      </div>
      <div id="history-area">
        <table>
          <tr>
            <td>ストーリー</td>
            <td>視聴日時</td>
          </tr>
          <tr v-for="(story, index) in props.movieInfo.info" :key="index">
            <td>{{story.subtitle == '' ? '*****': story.subtitle }}</td>
            <td>{{story.date}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({
  movieInfo: Object
});

onMounted(() => {
  console.log('Modal Vue >>>>>> On Mounted.');
})

</script>

<style scoped>
#modal-area {
  background-color:rgba(31, 27, 27, 0.992);
  color: white;
  top: 10vh;
  height:80vh;
}

#modal-content {
  display: flex;
  /* justify-content: space-around; */
  align-items: flex-start;
}

#modal-img {
  max-width: 50vw;
  max-height: 80vh;
  overflow-y: scroll;
}

#modal-poster {
  width: 100%;
}

#modal-backdrop {
  width: 100%;
}

#history-area {
  height: 80vh;
  overflow-y: scroll;
  position: relative;
}
</style>