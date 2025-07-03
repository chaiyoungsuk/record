import menu from '@/views/manage/Menu.vue'
import code from '@/views/manage/Code.vue'
import reference from '@/views/manage/Reference.vue'
import referenceList from '@/views/manage/ReferenceList.vue'
import referenceForm from '@/views/manage/ReferenceForm.vue'
import resume from '@/views/manage/Resume.vue'
import schedule from '@/views/manage/Schedule.vue'

const routes = [
    { path: '/menu' , name : 'menu' , component: menu }
    , { path: '/code' , name : 'code' , component: code }
    , { path: '/reference' , name : 'reference' , component: reference }
    , { path: '/reference-list' , name : 'referenceList' , component: referenceList }
    , { path: '/reference-form' , name : 'referenceForm' , component: referenceForm }
    , { path: '/resume' , name : 'resume' , component: resume }
    , { path: '/schedule' , name : 'schedule' , component: schedule }
];

export default routes
