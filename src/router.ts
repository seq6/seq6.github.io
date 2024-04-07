import {createRouter, createWebHashHistory} from "vue-router";
import ChunLian from "./components/ChunLian.vue";
import ChuDaDi from "./components/ChuDaDi.vue";
import Home from "./components/Home.vue";

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/home',
            redirect: '/'
        },
        {
            path: '/',
            component: Home,
            name: 'home'
        },
        {
            path: '/chunlian',
            component: ChunLian,
            name: 'chunlian'
        },
        {
            path: '/chudadi',
            component: ChuDaDi,
            name: 'chudadi'
        }
    ]
})