<template>

<FullCalendar :options="options" />

</template>

<script setup>
import { ref,reactive } from 'vue';
import '@fullcalendar/core/vdom';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { createCalendar } from '../../firebase/calendarfire'


const id = ref(0)
const options = reactive({
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth, dayGridWeek, listDay'
    },
    editable: true,
    selectable: true,
    weekends: true,
    select: (arg) => {
        id.value = id.value + 1

        const cal = arg.view.calendar
        cal.unselect()
        cal.addEvent({
            id: `${id.value}`,
            title: `New event ${id.value}`,
            start: arg.start,
            end: arg.end,
            allDay: true
        })
    },
    eventClick: (arg) => {
        console.log(arg.event.title)
        if(arg.event) {
            arg.event.remove()
        }
    },
    events: [],
    eventAdd: (arg) => {
        createEvent({
            id: arg.event.id,
            title: arg.event.title,
            start: arg.event.start,
            end: arg.event.end,
            allDay: arg.event.allDay
        })

    },
      eventChange: (arg) => {
          updateEvent({
            id: arg.event.id,
            title: arg.event.title,
            start: arg.event.start,
            end: arg.event.end,
            allDay: arg.event.allDay
        }, arg.event.id)

    },
      eventRemove: (arg) => {
          deleteEvent(arg.event.id)

    }

})

const currentlyEding = ref(null);
const selectedEvent = ref({});
const selectedElement = ref(null);
const selectedOpen = ref(false);
const event = ref([]);
const dialog = ref(false);




</script>
