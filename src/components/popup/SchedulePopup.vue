<template>
    <div id="popup_layer">
        <div class="popup_box">
            <!--팝업 컨텐츠 영역-->
            <div class="popup_cont">
                <h2>[ Select Date :  {{ state.selected_date }}]</h2>
                <!-- <Tree :nodes="state.referenceGroup" 
                    :search-text="treeSearchText" :use-icon="true" 
                    show-child-count  :editable="true" :draggable="true" :dropable="true"
                    @nodeExpanded="onNodeExpanded" @update:nodes="onUpdate" @nodeClick="onNodeClick"/> -->
            </div>
            <!--팝업 버튼 영역-->
            <div class="popup_btn">
                <a @click=onRegistSchedule class="close_day">등록</a>
                <a @click=onUpdateSchedule class="close_day">등록</a>
                <a @click=onCloseSchedulePop>Close</a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive , defineExpose , defineEmits} from 'vue';

const emit = defineEmits(['closePop'])
const state = reactive({
    selected_date : undefined

})

const onRegistSchedule = () => {

}
const onUpdateSchedule = () => {

}
const onCloseSchedulePop = () => {
    emit('closePop')
}
const onSetSelectedDate = (dateTime) => {
    state.selected_date = dateTime
}
const onLoadSchedule = (dateTime) => {
    console.log('onLoadSchedule' , dateTime)
}
defineExpose({
    onLoadSchedule , onSetSelectedDate
})

</script>