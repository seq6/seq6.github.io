import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {createRouter, createWebHashHistory} from "vue-router"

const app = createApp(App)
app.use(createRouter({
    history: createWebHashHistory(),
    routes: [{
        path: '/',
        component: App,
        name: 'home'
    }]
}))
app.mount('#app')

//createApp(App).mount('#app')