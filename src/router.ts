import { createRouter, createWebHistory } from 'vue-router'
import FileLoader from './FileLoader.vue' 
import Result from './Result.vue'

const routes = [
  { path: '/', name: 'home', component: FileLoader },
  { path: '/upload', name: 'upload', component: FileLoader },
  { path: '/result/:movielist?', name: 'result', component: Result },
]

const router = createRouter({
  history: createWebHistory(), // HTML5 History モード
  routes,
})

export default router