import { createRouter, createWebHistory,  } from 'vue-router'
import Loader from './Loader.vue' 
import Result from './Result.vue'
import Main from './App.vue'

const routes = [
  { path: '/', name: 'home', component: Main },
  // { path: '/upload', name: 'upload', component: Loader },
  // { path: '/result', name: 'result', component: Result, props: true },
]

const router = createRouter({
  history: createWebHistory(), // HTML5 History モード
  routes,
})

export default router