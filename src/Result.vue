<template>
 <div>
   結果
 </div>
</template>

<script setup lang="ts">
import { onMounted} from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const props = defineProps({
  movieList: Array
});
console.log(props.movieList)

</script>