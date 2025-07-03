import alert from '@/views/ui/Alert.vue'
import buttons from '@/views/ui/Buttons.vue'
import card from '@/views/ui/Card.vue'
import typography from '@/views/ui/Typography.vue'

const routes = [
    { path: '/alert' , name : 'alert' , component: alert }
    ,{ path: '/buttons' , name : 'buttons' , component: buttons }
    ,{ path: '/card' , name : 'card' , component: card }
    ,{ path: '/typography' , name : 'typography' , component: typography }
];

export default routes
