<template>
    <section class="section">
        <div class="container-fluid">
            <div class="title-wrapper pt-30">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="title">
                        <h2>Schedule</h2>
                    </div>
                    </div>
                    <div class="col-md-6">
                        <div class="breadcrumb-wrapper">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item">
                                        <a href="#0">Dashboard</a>
                                    </li>
                                    <li class="breadcrumb-item">
                                        <a href="#0">UI Components</a>
                                    </li> 
                                    <li class="breadcrumb-item active" aria-current="page">
                                        Typography
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div class="resume-wrapper">
                <div class="row">
                    <div class="col-12">
                        <div class="resume-card card-style mb-30">
                            <div class="row">
                                <div class="col-lg-3">
                                    <div class="input-style-1">
                                        <label>User ID | Name</label>
                                        <input type="text" v-model="searchForm.user" placeholder="User ID | Name" @keyup.enter="loadUserForm">
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="select-style-1">
                                        <label>User</label>
                                        <treeselect
                                            v-model="searchForm.user_id"
                                            :multiple="false"
                                            :options="state.user_list"
                                            placeholder="Select User."
                                            />    
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="input-style-1">
                                        <label>Schedule Title</label>
                                        <input type="text" v-model="searchForm.schedule_title" placeholder="Schedule Title">        
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <!-- <div class="input-style-1">
                                        <label>Group Name</label>
                                        <input type="text" v-model="searchForm.groupName" placeholder="group">        
                                    </div> -->
                                </div>
                                <div class="col-lg-6">
                                </div>
                                <div class="col-lg-6">
                                    <ul class="buttons-group float-end">
                                        <li>
                                            <a class="main-btn secondary-btn-light square-btn btn-hover" @click="onSearchFormInit">초기화</a>    
                                        </li>
                                        <li>
                                            <a class="main-btn primary-btn-light square-btn btn-hover" @click="onSearchSchedule">검색</a>    
                                        </li>
                                        <li>
                                            <a class="main-btn success-btn-light square-btn btn-hover" @click="onRegistSchedule">등록</a>
                                        </li>
                                        
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="resume-card card-style mb-30">
                            <ScheduleXCalendar :calendar-app="calendarApp">
                                        <template #timeGridEvent="{ calendarEvent }">
                                            <div class="event">
                                                {{ calendarEvent.title }}
                                            </div>
                                        </template>
                                    </ScheduleXCalendar>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <SchedulePopup v-show="state.schedule_pop_show" @closePop="closeSchedulePop" ref="schedulePopup"></SchedulePopup>
    </section>
</template>
<script setup>
import SchedulePopup from '@/components/popup/SchedulePopup.vue'
import treeselect from '@zanmato/vue3-treeselect'
import { ScheduleXCalendar } from '@schedule-x/vue'
import {
    createCalendar,
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
    viewMonthGrid
    // translations, mergeLocales
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import { inject, ref , reactive, onMounted } from 'vue'


const utils = inject('utils')
const api = inject('api')
const VueSimpleAlert = inject('VueSimpleAlert')

const schedulePopup = ref(null)
const state = reactive({
    user_list : []
    , schedule_pop_show : false
})
const searchForm = reactive({
    user : undefined
    , user_id : undefined
    , schedule_title : undefined
})
// const schedule = reactive({
//     start_date : undefined
//     , start_time : undefined
// })

const calendarApp = createCalendar({
    selectedDate: utils.format.dateToString(new Date(),'yyyy-MM-dd'),
    defaultView: viewMonthGrid.name,
    locale: 'ko-KR',
    isDark: true,
    monthGridOptions: {
    /**
     * Number of events to display in a day cell before the "+ N events" button is shown
     * */
        nEventsPerDay: 8,
    },
    // ) , 
    views: [
        createViewDay(),
        createViewWeek(),
        createViewMonthGrid(),
        createViewMonthAgenda(),
    ],
    events: [
        {
            id: 1,
            title: 'Event 1',
            start: '2025-06-19',
            end: '2025-06-19',
        },{
            id: 2,
            title: 'Event 2',
            start: '2025-06-20 12:00',
            end: '2025-06-20 13:00',
        }
        // Property	Type	Description	Required
        // id	string or number	A unique identifier for the event.	Yes
        // start	string	The start time of the event.	Yes
        // end	string	The end time of the event.	Yes
        // title	string	The title of the event.	No
        // description	string	A description of the event.	No
        // location	string	The location of the event.	No
        // people	string[]	Names of the participants	No
        // calendarId	string	id of the calendar. See "calendars" section	No
        // _options	See "_options" section	Configuration for the event.	No
    ],
    callbacks: {
        onEventClick(calendarEvent) {
            console.log('onEventClick', calendarEvent)
        },
        onDoubleClickEvent(calendarEvent) {
            console.log('onDoubleClickEvent', calendarEvent)
        },
        onClickDate(date) {
            console.log('onClickDate', date) // e.g. 2024-01-01
        },
        onDoubleClickDate(dateTime) {
            console.log('onDoubleClickDateTime', dateTime) // e.g. 2024-01-01 12:37

            state.schedule_pop_show = true
            schedulePopup.value.onSetSelectedDate(dateTime)
        },
        onClickDateTime(dateTime) {
            console.log('onClickDateTime', dateTime) // e.g. 2024-01-01 12:37
        },
        onDoubleClickDateTime(dateTime) {
            console.log('onDoubleClickDateTime', dateTime) // e.g. 2024-01-01 12:37
        },
        onSelectedDateUpdate(date){
            console.log('onSelectedDateUpdate', date) // e.g. 2024-01-01 12:37
        }
    }
})
const loadUserForm = () => {
    api.call({
        url : 'search_form/user'
        , method : 'get'
    }, {user : searchForm.user})
    .then( (res) => loadUserFormSuc(res))
}

const loadUserFormSuc = (res) => {
    console.log(res)

    if( res.resultData && res.resultData.length > 0) {
        state.user_list = res.resultData

        state.user_list.forEach(e => {
            e.id = e.user_id
            e.label = e.user_name
        })

        console.log('state.user_list' , state.user_list)
    }
}

const onSearchFormInit = () => {
    utils.json.init(searchForm)
}

const onSearchSchedule = () => {
    console.log('onSearchSchedule' , searchForm.user_id)

    if( searchForm.user_id ) {
        console.log('aaa')
    } else {
        VueSimpleAlert.alert('사용자 선택하세요' , '필수 선택' , 'error')
    }
}
const onRegistSchedule = () => {}
const closeSchedulePop = () => {
    state.schedule_pop_show = false
}

onMounted((m) => {
    console.log('onMounted m' , m)
    loadUserForm()
})
</script>
<style>
#sx__calendar {
  width: 100%;
  height: 1600px;
  max-height: 190vh;
}
</style>