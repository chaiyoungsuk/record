import webToon from '@/views/webToon/WebToon.vue'
import webToonList from '@/views/webToon/WebToonList.vue'

const routes = [
    { path: '/webtoon' , name : 'webtoon' , component: webToon }
    , { path: '/webtoon-list' , name : 'webToonList' , component: webToonList }
];

export default routes
