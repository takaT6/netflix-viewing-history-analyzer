<template>
 <div>
   結果
 </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

onMounted(() => {
  console.log(route.hash)
})

</script>