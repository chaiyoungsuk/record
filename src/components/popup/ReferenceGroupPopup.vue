<template>

    <div id="popup_layer">
        <div class="popup_box">
            <!--팝업 컨텐츠 영역-->
            <div class="popup_cont">
                <h2>[ Select Group :  {{ state.selectedNode.label }}]</h2>
                <!-- <Tree :nodes="state.referenceGroup" 
                    :search-text="treeSearchText" :use-icon="true" 
                    show-child-count  :editable="true" :draggable="true" :dropable="true"
                    @nodeExpanded="onNodeExpanded" @update:nodes="onUpdate" @nodeClick="onNodeClick"/> -->
            </div>
            <!--팝업 버튼 영역-->
            <div class="popup_btn">
                <a @click=selectReferenceGroupPop class="close_day">Select</a> 
                <a @click=selectReferenceGroupPop class="close_day">Select</a> 
                <a @click=closeReferenceGroupPop>Close</a>
            </div>
        </div>
    </div>

</template>

<script setup>
import { reactive } from 'vue';


const state = reactive({
    selectedNode : {
        label : ''
    }
})

const closeReferenceGroupPop = () => {

}
</script>