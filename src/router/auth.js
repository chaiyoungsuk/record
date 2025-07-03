import user from '@/views/auth/User.vue'
import role from '@/views/auth/Role.vue'
import urlRepository from '@/views/auth/UrlRepository.vue'

const routes = [
    { path: '/user' , name : 'user' , component: user }
    , { path: '/role' , name : 'role' , component: role }
    , { path: '/url-repository' , name : 'urlRepository' , component: urlRepository }
];

export default routes
