<template>
    <section class="section">
        <!-- header -->
        <div class="container-fluid">
            <div class="title-wrapper pt-30">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="title">
                        <h2>Reference</h2>
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
            <div class="invoice-wrapper">
                <div class="row">
                    <div class="col-lg-4">
                        <!-- <div class="card-style mb-30" @click="searchReferenceList"> -->
                        <div class="card-style mb-30">
                            <!-- :use-checkbox="true"  -->
                            <Tree :nodes="state.referenceGroup" :search-text="treeSearchText" :use-icon="true" show-child-count @nodeExpanded="onNodeExpanded" @update:nodes="onUpdate" @nodeClick="onNodeClick"/>
                        </div>
                        <div class="card-style mb-30">
                            <div class="row">
                                <div class="col-lg-12">
                                    <ul class="buttons-group float-end">
                                        <li>
                                            <a href="#0" class="main-btn secondary-btn-light square-btn btn-hover" @click="searchFormInit">등록</a>    
                                        </li>
                                        <li>
                                            <a href="#0" class="main-btn primary-btn-light square-btn btn-hover" @click="searchReferenceList(1)">수정</a>    
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="card-style mb-30">
                            <h6 class="mb-10">Data Table</h6>
                            <p class="text-sm mb-20">
                                For basic styling—light padding and only horizontal
                                dividers—use the class table.
                            </p>
                            <div class="row">
                                <div class="col-lg-5">
                                    <div class="input-style-1">
                                        <label>검색어</label>
                                        <input type="text" v-model="searchForm.searchText" placeholder="Search Text">
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="input-style-1">
                                        <label>Group Seq</label>
                                        <input type="text" v-model="searchForm.group" placeholder="group">        
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="input-style-1">
                                        <label>Group Name</label>
                                        <input type="text" v-model="searchForm.groupName" placeholder="group">        
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                </div>
                                <div class="col-lg-6">
                                    <ul class="buttons-group float-end">
                                        <li>
                                            <a href="#0" class="main-btn secondary-btn-light square-btn btn-hover" @click="searchFormInit">초기화</a>    
                                        </li>
                                        <li>
                                            <a href="#0" class="main-btn primary-btn-light square-btn btn-hover" @click="searchReferenceList(1)">검색</a>    
                                        </li>
                                        <li>
                                            <a href="#0" class="main-btn success-btn-light square-btn btn-hover" @click="showModal">등록</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="table-wrapper table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th class="lead-info">
                                                <h6>분류</h6>
                                            </th>
                                            <th class="lead-company">
                                                <h6>제목</h6>
                                            </th>
                                            <th>
                                                <h6>등록일</h6>
                                            </th>
                                            <th>
                                                <h6>Action</h6>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item , index) in state.referenceList" :key="index" >
                                            <td class="min-width">
                                                <p>{{ item.group_name }}</p>
                                            </td>
                                            <td class="min-width" @click="goReference(item.seq)">
                                                <p>{{ item.title }}</p>
                                            </td>
                                            <td class="min-width">
                                                <p>{{ item.regist_date }}</p>
                                            </td>
                                            <td @click="deleteReference(item.seq , item.title)">
                                                <div class="action">
                                                <button class="text-danger">
                                                    <i class="lni lni-trash-can"></i>
                                                </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            <!-- end table -->
                            </div>
                            <!-- <div class="row">
                                <div class="col-12 align-self-center">
                                    <PageNavigation :totalCount="state.totalCount" ref="pageNavi" v-on:movePage="searchReferenceList"></PageNavigation>
                                </div>
                            </div> -->
                            <b-container class="bv-example-row">
                                <b-row class="justify-content-md-center">
                                    <b-col cols="12" md="auto">
                                        <PageNavigation :totalCount="state.totalCount" ref="pageNavi" v-on:movePage="searchReferenceList"></PageNavigation>
                                    </b-col>
                                </b-row>
                            </b-container>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </section>
</template>
<script setup>
import { ref , reactive , inject , onMounted , } from 'vue';
import { useRouter } from 'vue-router'
import PageNavigation from '@/components/PageNavigation.vue'
import Tree from "vue3-tree"

const api = inject('api')
const utils = inject('utils')
const VueSimpleAlert = inject('VueSimpleAlert')

const pageConf = utils.getPageConf()
const pageNavi = ref(null)
const router = useRouter()

// const data = reactive({
//     value : undefined
//     , context : undefined
// })
const treeSearchText = ref("")
const state = reactive({
    referenceGroup : []
    , referenceList : []
    , totalCount : 999
    , currentPage : 1
    , modalShow : false
});

const searchForm = reactive({
    group : undefined
    , groupName : undefined
    , searchText : undefined
});

const loadReferenceGroup = () => {
    api.call({
        url : '/reference-group'
        , method : 'get'
    } , {})
    .then((res) => loadReferenceGroupSuc(res))
}

const loadReferenceGroupSuc = (res) => {
    console.log('searchReferenceGroupSuc' , res);

    let referenceGroupList = res.resultData.referenceGroupList;

    state.referenceGroup = utils.json.toHierarchy(referenceGroupList , 999999);

    console.log('referenceGroup' , state.referenceGroup);
}

const searchReferenceList = (p) =>{
    state.currentPage = p
    let param = {}      
    param = Object.assign(param , searchForm);
    param.take = pageConf.pageSize;
    param.page = p ? p : 1;

    console.log('param' , param);
    api.call({
        url : '/reference'
        , method : 'get'
    } , param )
    .then((res) => searchReferenceListSuc(res))
}

const searchReferenceListSuc = (res) => { 
    state.referenceList = res.resultData.referenceList
    state.totalCount = res.resultData.totalCount

    pageNavi.value.synchTotalCount(state.totalCount , state.currentPage)
}

const searchFormInit = () => {
    searchForm.group = '';
    searchForm.groupName = ''
    searchForm.searchText = ''
}

const showModal = () => { 
    console.log('!state.modalShow' , !state.modalShow)
    state.modalShow = !state.modalShow

    router.push({name:'referenceForm' , query:{searchForm : JSON.stringify({searchText : searchForm.searchText , group : searchForm.group , groupName : searchForm.groupName})}})
}

const goReference = (seq) => {
    router.push({name:'reference' , query:{seq : seq}})
}

const onNodeExpanded = (node, state) => {
    console.log("state: ", state);
    console.log("node: ", node);
};

const onUpdate = (nodes) => {
    console.log("nodes:", nodes);
};

const onNodeClick = (node) => {
    console.log('node',node)

    searchForm.group = node.id
    searchForm.groupName = node.label
};

const deleteReference = (s , t) => {
    let params = { seq : s}

    VueSimpleAlert.confirm("[" + t +"]" + " 삭제 하시겠습니까? ").then(() => {
        api.call({
            url : '/reference'
            , method : 'delete'
        } , params)
        .then( res =>  deleteReferenceSuc(res))
    })
}

const deleteReferenceSuc = (res) =>{ 
    VueSimpleAlert.alert(res.message , '삭제' , 'success')
    .then(() => {
        searchReferenceList(1)
    })
}

onMounted(() => {
    loadReferenceGroup()

    searchReferenceList()
})
</script>