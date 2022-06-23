import { createApp } from 'vue'
import './style.css';
import './style2.css';
import router from './router'
import App from './App.vue'


const app = createApp(App);
app.use(router);
app.mount('#app');