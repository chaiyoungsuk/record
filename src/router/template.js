import AgGrid from '@/views/template/AgGrid.vue'
import ScheduleX from '@/views/template/ScheduleX.vue'
import FullCalendar from '@/views/template/FullCalendar.vue'
import ColorPicker from '@/views/template/ColorPicker.vue'

const routes = [
    { path: '/grid' , name : 'grid' , component: AgGrid }
    , { path: '/scheduleX' , name : 'scheduleX' , component: ScheduleX }
    , { path: '/full-calendar' , name : 'full-calendar' , component: FullCalendar }
    
    , { path: '/color-picker' , name : 'color-picker' , component: ColorPicker }
];

export default routes
