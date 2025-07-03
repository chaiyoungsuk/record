<template>
    <section class="section">
        <div class="container-fluid">
            <div class="title-wrapper pt-30">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="title">
                        <h2>Code 관리</h2>
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
                    <div class="col-lg-6">
                        <div class="card-style mb-30">
                            <!-- <div class="select-style-2">
                                <div class="select-position">
                                    <select v-model=formData.url_id>
                                        <option value="">Url ID</option>
                                        <option v-for="(item , index) in url_ides" :key="index" :value=item.id>{{ item.name }}</option>
                                    </select>
                                </div>
                            </div> -->
                            <Tree :nodes="state.code_list" :search-text="searchText" :use-icon="true" show-child-count 
                                @nodeExpanded="onNodeExpanded" @update:nodes="onUpdate" @nodeClick="onNodeClick"/>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="card-style mb-30">
                            <h6 class="mb-25">Code Input Fields</h6>
                            <div class="input-style-1">
                                <label>Code Seq</label>
                                <input type="text" placeholder="Code Seq" v-model="code.seq" disabled>
                            </div>
                            <div class="input-style-1">
                                 <label>Code Parent Seq</label>
                                <input type="text" placeholder="Code Parent Seq" v-model="code.parent_seq">
                            </div>
                            <div class="input-style-1">
                                 <label>Text</label>
                                <input type="text" placeholder="Text" v-model="code.text">
                            </div>
                            <div class="input-style-1">
                                 <label>Value</label>
                                <input type="text" placeholder="Value" v-model="code.value">
                            </div>
                            <ul class="buttons-group float-end">
                                <li>
                                    <a class="main-btn success-btn-light square-btn btn-hover" @click="onCreateCode">등록</a>
                                </li>
                                <li>
                                    <a class="main-btn warning-btn-light btn-hover" @click="onUpdateCode">수정</a>
                                </li>
                                <li>
                                    <a class="main-btn secondary-btn-light square-btn btn-hover" @click="onInitCodeForm">초기화</a>
                                </li>
                                <li>
                                    <a class="main-btn danger-btn-light square-btn btn-hover" @click="onDeleteCode">삭제</a>
                                </li>
                            </ul>
                            <div class="input-style-1">&nbsp;</div>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    </section>

</template>
<script setup>
import { ref , reactive , onMounted , inject } from 'vue'

const utils = inject('utils')
const api = inject('api')
const VueSimpleAlert = inject('VueSimpleAlert')
const Tree = inject('Tree')

const searchText = ref()

const state = reactive({
    code_list : []
})

const code = reactive({
    seq : undefined
    , parent_seq : undefined
    , text : undefined
    , value : undefined
    , sort : undefined
})

const loadCodeList = () => {
    api.call({
        url : '/common-code/tree'
        , method : 'get'
    } , { parent_seq : 999999})
    .then((res)=>{
        loadCodeListSuc(res)
        // state.code_list = utils.json.toHierarchy(res.resultData.code_list , 999999)
    })
}

const loadCodeListSuc = (res) => {

    state.code_list = utils.json.toHierarchy(res.resultData.code_list , 999999)
}

const onNodeExpanded = () => {} 
const onUpdate = () => {}

const onNodeClick = (node) => {
    code.seq = node.id
    code.parent_seq = node.parent_id
    code.text = node.label
    code.value = node.value
}

const onCreateCode = () => {

    api.call({
        url : '/common-code'
        , method : 'post'
    },code)
    .then((res)=>{
        VueSimpleAlert.alert(res.message , '등록' , 'success')    
        loadCodeList()
    })
}

const onUpdateCode = () => {
    api.call({
        url : '/common-code'
        , method : 'put'
    },code)
    .then((res) => {
        VueSimpleAlert.alert(res.message , '수정' , 'success')    
        loadCodeList()
    })
} 

const onDeleteCode = () => {
    VueSimpleAlert.confirm('삭제 하시겠습니까?')
    .then(() => {
        api.call({
            url : '/common-code/' + code.seq
            , method : 'delete'
        }, null)
        .then((res) => {
            VueSimpleAlert.alert(res.message  , '삭제' , 'success')
            loadCodeList()    
        })
    })
}

const onInitCodeForm = () => {
    utils.json.init(code)
}


onMounted(()=>{
    loadCodeList()

    // VueSimpleAlert.alert('안녕' , '1' , 'success')
    // .then(() => {
    //     console.log('first then 1111')
    //     return {a : 1 , b : 2}
    // })
    // .then((arg) => {
    //     console.log('second then 2222')
    //     console.log('arg' , arg)
    //     arg.c = 3
    //     return arg
    // })
    // .then((arg) => {
    //     console.log('third then 3333')
    //     console.log('arg' , arg)
    // })
})
</script>