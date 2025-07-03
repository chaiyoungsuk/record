
import a from '@/views/HomeView.vue'
import b from '@/views/AboutView.vue'

const routes = [
    { path: '/a' , name : 'home' , component: a },
    { path: '/b' , name : 'about' , component: b }
];

export default routes
