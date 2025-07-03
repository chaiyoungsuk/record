<template>
    <!-- <div :class="{ 'active-class': isActive, 'inactive-class': !isActive }"></div> -->
    <div id="popup_layer">
        <div class="popup_box">
            <!--팝업 컨텐츠 영역-->
            <div class="popup_cont">
                <h2>[ Select Group :  {{ state.selectedNode.label }}]</h2>
                <Tree :nodes="state.referenceGroup" 
                    :search-text="treeSearchText" :use-icon="true" 
                    show-child-count  :editable="true" :draggable="true" :dropable="true"
                    @nodeExpanded="onNodeExpanded" @update:nodes="onUpdate" @nodeClick="onNodeClick"/>
            </div>
            <!--팝업 버튼 영역-->
            <div class="popup_btn">
                <a @click=selectReferenceGroupPop class="close_day">Select</a> 
                <a @click=closeReferenceGroupPop>Close</a>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref , reactive , onMounted , inject , defineEmits , defineExpose} from 'vue';
import Tree from "vue3-tree";

const api = inject('api');
const utils = inject('utils');

const emit = defineEmits(['closePop' , 'selectReferenceGroupPop']);
const treeSearchText = ref("");
const state = reactive({
    referenceGroup : []
    , selectedNode : {}
    , modalShow : false
});

const searchReferenceGroup = () => {
    api.call({
        url : '/reference-group'
        , method : 'get'
    } , {})
    .then( res => searchReferenceGroupSuc(res))
}

const searchReferenceGroupSuc = (res) => {
    console.log('searchReferenceGroupSuc' , res);

    let referenceGroupList = res.resultData.referenceGroupList;
    state.referenceGroup = utils.json.toHierarchy(referenceGroupList , 999999);
}

const onUpdate = (node) => { 
    console.log('onUpdate' , node)
}

const onNodeClick = (node) => {
    state.selectedNode = node;
}

const onNodeExpanded = (n) => { 
    console.log('onNodeExpanded' , n)
}

const closeReferenceGroupPop = () => {
    emit('closePop')
}

const selectReferenceGroupPop = () => {
    console.log('state.selectedNode' , state.selectedNode)
    emit('selectReferenceGroupPop' ,state.selectedNode );
}

defineExpose({
    searchReferenceGroup
})
onMounted(() =>{
    console.log('aaaaaaaa')
})
</script>