<template>
  <div id="modal-area" class="">
    <div id="modal-content">
      <img id="modal-poster" :src="movieInfo.poster">
      <table>
        <tr>
          <td>ストーリー</td>
          <td>視聴日時</td>
        </tr>
        <tr v-for="(story, index) in props.movieInfo.info" :key="index">
          <td>{{story.subtitle}}</td>
          <td>{{story.date}}</td>
        </tr>
      </table>
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
  background-color:rgba(7, 7, 7, 0.927);
  color: white;
  top: 10vh;
  height:80vh;
}

#modal-content {
  display: flex;
}

#modal-poster {
  width: 30vw;
}
</style>