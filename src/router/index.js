import { createMemoryHistory, createRouter } from 'vue-router'

// import tempRoute from './temp.js'
import manageRoute from './manage.js'
import authRouter from './auth.js'
import uiRouter from './ui.js'
import templateRouter from './template.js'
import webToonRouter from './webToon.js'

import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'

let routes = [
	{ path: '/' , name : 'home' , component: HomeView },
	{ path: '/about' , name : 'about' , component: AboutView }
]

// routes = routes.concat(tempRoute)
routes = routes.concat(manageRoute)
routes = routes.concat(authRouter)
routes = routes.concat(uiRouter)
routes = routes.concat(templateRouter)
routes = routes.concat(webToonRouter)

console.log('routes' , routes)

const router = createRouter({
	history: createMemoryHistory()
	, mode :'history'
	, routes
})

router.beforeEach((to, from, next) => {
	console.log('to', to)
	console.log('from', from)
	next()
})

export default router;