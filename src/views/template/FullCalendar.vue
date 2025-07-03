<template>
    <section>
        <!-- header -->
        <div class="container-fluid">
            <div class="title-wrapper pt-30">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="title">
                        <h2>Full Calendar</h2>
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
            <div class="form-elements-wrapper">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card-style mb-30">
                            <p>
                            https://fullcalendar.io/docs/vue <br>
                            https://github.com/fullcalendar/fullcalendar-examples/blob/main/vue3/src/DemoApp.vue<br><br>

                            install : <br>
                            npm install @fullcalendar/vue3 @fullcalendar/core @fullcalendar/daygrid
                            </p>
                        </div>
                        <div class="card-style mb-30">
                            
                            <FullCalendar :options="calendarOptions">
                                <template v-slot:eventContent="arg">
                                    <b>{{ arg.timeText }}</b> - <i>{{ arg.event.title }}</i>
                                </template>
                            </FullCalendar>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import {reactive , computed } from 'vue'
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
// needed for dateClick    [ npm i @fullcalendar/interaction ]
import interactionPlugin from '@fullcalendar/interaction'

// const handleWeekendsToggle = () =>{
//     calendarOptions.weekends = !calendarOptions.weekends // update a property
// }

// const handleDateClick = (arg) => {
//     console.log('handleDateClick' , arg)
// }

const handleDateSelect = (selectInfo) => {
    console.log('handleDateSelect' , selectInfo)
    // let title = prompt('Please enter a new title for your event')
    // let calendarApi = selectInfo.view.calendar

    // calendarApi.unselect() // clear date selection

    // if (title) {
    //     calendarApi.addEvent({
    //         id: new Date(),
    //         title,
    //         start: selectInfo.startStr,
    //         end: selectInfo.endStr,
    //         allDay: selectInfo.allDay
    //     })
    // }
}

const handleEventClick = (clickInfo) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()
    }
}
 
const handleEvents = (events) => {
    // currentEvents = events
    console.log( 'current.value' , current.value)
    console.log('events' , events)
}

const calendarOptions = reactive({
    plugins: [dayGridPlugin , interactionPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    // dateClick : handleDateClick,
    select: handleDateSelect,
    eventClick: handleEventClick,
    eventsSet: handleEvents,
    events: [
        { id: '315215321' , title: 'Event 1', start: '2025-05-16' , end: '2025-06-05' , backgroundColor: 'rgb(226, 191, 232)' , borderColor: 'red'},
        { title: 'Event 2', start: '2023-10-05'}
    ]
})

const currentEvents = reactive([])
const current = computed ({
    get() {
        return currentEvents
    },
    set(events){
        currentEvents.value = events
    }
})
</script>