<template>
    <section>
        <!-- header -->
        <div class="container-fluid">
            <div class="title-wrapper pt-30">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="title">
                        <h2>Vue3 Schedule-x</h2>
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
                            https://schedule-x.dev/<br>
                            https://schedule-x.dev/docs/calendar/configuration<br><br>

                            install : <br>
                            npm install @schedule-x/vue @schedule-x/theme-default
                            </p>
                        </div>
                        <div class="card-style mb-30">
                            <div class="row">
                                <div class="input-style-1 col-lg-12">
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
            </div>
        </div>
    </section>
</template>
<script setup>
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
import { inject } from 'vue'

const utils = inject('utils')

console.log('utils' , utils.format.dateToString(new Date(),'yyyy-MM-dd'))

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
        onClickDateTime(dateTime) {
            console.log('onClickDateTime', dateTime) // e.g. 2024-01-01 12:37
        },
    }
})
</script>
<style>
#sx__calendar {
  width: 100%;
  height: 1600px;
  max-height: 190vh;
}
</style>