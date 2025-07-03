<template>
    <section class="section">
        <div class="container-fluid">
            <div class="title-wrapper pt-30">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="title">
                        <h2>Url Repository 관리</h2>
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
                    <div class="col-lg-8">
                        <div class="card-style mb-30">
                            <h6 class="mb-10">Url Repository Table</h6>
                            <p class="text-sm mb-20">
                                Record System Url Repository
                            </p>
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="select-style-2">
                                        <label>Url Type</label>
                                        <div class="select-position">
                                            <select v-model="searchForm.url_type">
                                                <option value="">Selected</option>
                                                <option v-for="(item , index) in state.url_types" :key="index" :value=item.seq>{{ item.value }}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="select-style-2">
                                        <label>Http Method</label>
                                        <div class="select-position">
                                            <select v-model="searchForm.method">
                                                <option value="">Selected</option>
                                                <option v-for="(item , index) in state.http_methods" :key="index" :value=item.seq>{{ item.value }}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="input-style-1">
                                        <label>Url String</label>
                                        <input type="text" v-model="searchForm.url_string" placeholder="Url String">
                                    </div>
                                </div>
                                <div class="col-lg-8">
                                    <div class="input-style-1">
                                        <label>Url Description</label>
                                        <input type="text" v-model="searchForm.description" placeholder="Url Description">
                                    </div>
                                </div>
                                <div class="col-lg-4"></div>
                                <div class="col-lg-6"></div>
                                <div class="col-lg-6">
                                    <ul class="buttons-group float-end">
                                        <li>
                                            <a href="#0" class="main-btn secondary-btn-light square-btn btn-hover" @click="searchFormInit">초기화</a>    
                                        </li>
                                        <li>
                                            <a href="#0" class="main-btn primary-btn-light square-btn btn-hover" @click="searchUrlRepositoryList(1)">검색</a>    
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="table-wrapper table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>
                                                <h6>ID</h6>
                                            </th>
                                            <th>
                                                <h6>Url Type</h6>
                                            </th>
                                            <th>
                                                <h6>Url String</h6>
                                            </th>
                                            <th>
                                                <h6>Method</h6>
                                            </th>
                                            <th>
                                                <h6>Description</h6>
                                            </th>
                                            <th>
                                                <h6>Create Date</h6>
                                            </th>
                                            <th>
                                                <h6>Modify Date</h6>
                                            </th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item , index) in state.url_repository_list" :key="index">
                                            <td @click="selectUrlRepository(item)" style="cursor:pointer">
                                                <p>{{ item.url_id }}</p>
                                            </td>
                                            <td @click="selectUrlRepository(item)" style="cursor:pointer">
                                                <p>{{ item.url_type_value }}</p>
                                            </td>
                                            <td @click="selectUrlRepository(item)" style="cursor:pointer">
                                                <p>{{ item.url_string }}</p>
                                            </td>
                                            <td>
                                                <p>{{ item.method_value }}</p>
                                            </td>
                                            <td>
                                                <p>{{ item.description }}</p>
                                            </td>
                                            <td>
                                                <p>{{ item.create_date }}</p>
                                            </td>
                                            <td>
                                                <p>{{ item.modify_date }}</p>
                                            </td>
                                            <td style="cursor:pointer">
                                                <div class="action">
                                                    <button class="text-danger" @click="deleteUrlRepository(item.url_id)">
                                                        <i class="lni lni-trash-can"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <b-container class="bv-example-row">
                                <b-row class="justify-content-md-center">
                                    <b-col cols="12" md="auto">
                                        <PageNavigation :total_count="state.total_count" ref="pageNavi" v-on:movePage="searchUrlRepositoryList"></PageNavigation>
                                    </b-col>
                                </b-row>
                            </b-container>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="card-style mb-30">
                            <h6 class="mb-25">Role Input Fields</h6>
                            <div class="input-style-1">
                                <label>Url ID</label>
                                <input type="text" placeholder="Url ID" v-model="urlRepository.url_id" disabled>
                            </div>
                            <div class="select-style-2">
                                <div class="select-position">
                                    <label>Http Url Type</label>
                                    <select v-model="urlRepository.url_type">
                                        <option value="">Selected Method</option>
                                        <option v-for="(item , index) in state.url_types" :key="index" :value=item.seq>{{ item.value }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="input-style-1">
                                <label>Url String</label>
                                <input type="text" placeholder="Url String" v-model="urlRepository.url_string">
                            </div>
                            <div class="select-style-2">
                                <div class="select-position">
                                    <label>Http Method</label>
                                    <select v-model="urlRepository.method">
                                        <option value="">Selected Method</option>
                                        <option v-for="(item , index) in state.http_methods" :key="index" :value=item.seq>{{ item.value }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="input-style-1">
                                <label>Description</label>
                                <textarea placeholder="Description" rows="5" v-model="urlRepository.description"></textarea>
                            </div>
                            <ul class="buttons-group float-end">
                                <li>
                                    <a class="main-btn success-btn-light square-btn btn-hover" @click="createUrlRepository">등록</a>
                                </li>
                                <li>
                                    <a class="main-btn warning-btn-light btn-hover" @click="updateUrlRepository">수정</a>
                                </li>
                                <li>
                                    <a class="main-btn secondary-btn-light square-btn btn-hover" @click="initUrlRepositoryForm">초기화</a>
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
import { ref , reactive , onMounted , inject  } from 'vue';
import PageNavigation from '@/components/PageNavigation.vue'

const api = inject('api');
const utils = inject('utils');
const VueSimpleAlert = inject('VueSimpleAlert')
const pageConf = utils.getPageConf()
const pageNavi = ref(null)

const state = reactive({
    url_types : []
    , url_repository_list : []
    , total_count : 0
    , http_methods : [] 
})

const searchForm = reactive({
    url_type : ''
    , url_string : ''
    , method : ''
    , description : ''
})

const urlRepository = reactive({
    url_id : ''
    , url_type : ''
    , url_string : ''
    , method : ''
    , description : ''
})


const loadMethodList = () => {
    api.call({
        url : '/common-code'
        , method : 'get'
    } , {value : 'HTTP_METHOD'})
    .then(function(response){     
        state.http_methods = response.resultData.code_list
    })
    .catch(function(err){
        console.log('loadUrlType' , err)
    })
}
const loadUrlType = () => {
    api.call({
        url : '/common-code'
        , method : 'get'
    } , {value : 'URL_TYPE'})
    .then(function(response){     
        state.url_types = response.resultData.code_list
    })
    .catch(function(err){
        console.log('loadUrlType' , err)
    })
}

const searchFormInit = () => {
    utils.json.init(searchForm)
}

const searchUrlRepositoryList = (p) => {

    let param = {} 

    state.current_page = p ? p : 1;

    param = Object.assign(param , searchForm);
    param.take = pageConf.pageSize;
    param.page = state.current_page

    console.log('searchForm' , searchForm)
    console.log('searchUrlRepositoryList' , param)
    api.call({
        url : '/url-repository'
        , method : 'get'
    } , param)
    .then( res => searchUrlRepositoryListSuc(res))
}

const searchUrlRepositoryListSuc = (res) => {
    state.url_repository_list = res.resultData.url_list
    state.total_count = res.resultData.total_count

    pageNavi.value.synchTotalCount(state.total_count , state.current_page)
}

const createUrlRepository = () => {
    console.log('urlRepository',urlRepository)

    api.call({
        url : '/url-repository'
        , method : 'post'
    },urlRepository)
    .then(res => {
        console.log(res)
        VueSimpleAlert.alert(res.message , '등록' , 'success')
        searchUrlRepositoryList()
        initUrlRepositoryForm()
    })
}

const updateUrlRepository = () => {
    api.call({
        url : '/url-repository'
        , method : 'put'
    },urlRepository)
    .then(res => {
        console.log(res)
        VueSimpleAlert.alert(res.message , '수정' , 'success')
        searchUrlRepositoryList()
        initUrlRepositoryForm()
    })
}

const deleteUrlRepository = (id) => {
    console.log('deleteUrlRepository',id)

    VueSimpleAlert.confirm('삭제 하시겠습니까?')
    .then (() => {
        api.call({
            url : '/url-repository/' + id
            , method : 'delete'
        },{})
        .then(res => {
            VueSimpleAlert.alert(res.message , '삭제' , 'success')
            searchUrlRepositoryList()
        })
    })
}

const initUrlRepositoryForm = () => {
    utils.json.init(urlRepository)
}
const selectUrlRepository = (item) => {
    urlRepository.url_id = item.url_id
    urlRepository.url_type = item.url_type
    urlRepository.url_string = item.url_string
    urlRepository.method = item.method
    urlRepository.description = item.description
}

onMounted(() => {
    console.log(utils)
    loadUrlType()
    loadMethodList()
})
</script>