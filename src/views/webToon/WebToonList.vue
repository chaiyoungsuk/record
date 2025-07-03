<template>
    <section class="section">
        <div class="container-fluid">
            <div class="title-wrapper pt-30">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="title">
                        <h2>WebToon 관리</h2>
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
                            <Tree :nodes="state.webtoon_list" :search-text="searchText" :use-icon="true" show-child-count 
                                @nodeExpanded="onNodeExpanded" @update:nodes="onUpdate" @nodeClick="onNodeClick"/>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="card-style mb-30">
                            <h6 class="mb-10">Data Table</h6>
                            <p class="text-sm mb-20">
                                For basic styling—light padding and only horizontal
                                dividers—use the class table.
                            </p>
                            
                            <div class="table-wrapper table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th class="lead-info">
                                                <h6>분류</h6>
                                            </th>
                                            <th class="lead-company">
                                                <h6>권</h6>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item , index) in state.volume_list" :key="index" @click="onMoveWebToonImage(item.seq)">
                                            <td class="min-width">
                                                <p>{{ state.selected_webtoon.label }}</p>
                                            </td>
                                            <td class="min-width" >
                                                <p>{{ item.label }}</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            <!-- end table -->
                            </div>
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
import {ref , reactive , onMounted , inject} from 'vue'
import { useRouter } from 'vue-router'
// import Tree from "vue3-tree"

const api = inject('api')
const utils = inject('utils')
const Tree = inject('Tree')
const router = useRouter()

const searchText = ref()

const state = reactive({
    webtoon_list : []
    , volume_list : []
    , selected_webtoon : {}
})

// const searchForm = reactive({})

const loadWebToonList = () => { 
    api.call({
        url : '/web-toon'
        , method : 'get'
    } , { parent_seq : 999999})
    .then((res)=>{
        loadWebToonListSuc(res)
    })
}

const loadWebToonListSuc = (res) => { 

    console.log('res' , res.resultData.webToonList)

    let webToonList = res.resultData.webToonList
    console.log('webToonList' , webToonList)
    webToonList.forEach ( e => {
        e.id = e.seq 
        e.parent_id = e.parent_seq

        console.log('e' , e)
    })

    state.webtoon_list = utils.json.toHierarchy(webToonList , 999999)
}

const onNodeClick = (node) => {
    console.log('node' , node)

    if(node.level == 1) { 
        state.volume_list = node.nodes
        state.selected_webtoon = node

        console.log('state.volume_list' ,state.volume_list)
        console.log('state.selected_webtoon' , state.selected_webtoon)
    } else if (node.level == 2){ 
        onMoveWebToonImage(node.id)
    }
}

const onMoveWebToonImage = (seq) => {
    router.push({name:'webtoon' , query:{seq : seq}})
}
onMounted(() => {
    loadWebToonList()
})
</script>