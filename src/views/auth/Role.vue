<template>
    <section class="section">
        <!-- header -->
        <div class="container-fluid">
            <div class="title-wrapper pt-30">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="title">
                        <h2>Role 관리</h2>
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
                    <div class="col-lg-7">
                        <div class="card-style mb-30">
                            <h6 class="mb-10">User Table</h6>
                            <p class="text-sm mb-20">
                                Record System Users
                            </p>
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="input-style-1">
                                        <label>Role Id</label>
                                        <input type="text" v-model="searchForm.role_id" placeholder="Role Id">
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="input-style-1">
                                        <label>Role Name</label>
                                        <input type="text" v-model="searchForm.role_name" placeholder="Role Name">        
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="input-style-1">
                                        <label>Description</label>
                                        <input type="text" v-model="searchForm.description" placeholder="Description">        
                                    </div>
                                </div>
                                <div class="col-lg-6"></div>
                                <div class="col-lg-6">
                                    <ul class="buttons-group float-end">
                                        <li>
                                            <a href="#0" class="main-btn secondary-btn-light square-btn btn-hover" @click="searchFormInit">초기화</a>    
                                        </li>
                                        <li>
                                            <a href="#0" class="main-btn primary-btn-light square-btn btn-hover" @click="searchRoleList(1)">검색</a>    
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
                                                <h6>Name</h6>
                                            </th>
                                            <th>
                                                <h6>Description</h6>
                                            </th>
                                            <th>
                                                <h6>Create Date</h6>
                                            </th>
                                            <th>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item , index) in state.role_list" :key="index" @click="selectRole(item)">
                                            <td>
                                                <p>{{ item.role_id }}</p>
                                            </td>
                                            <td>
                                                <p>{{ item.role_name }}</p>
                                            </td>
                                            <td>
                                                <p>{{ item.description }}</p>
                                            </td>
                                            <td>
                                                <p>{{ item.create_date }}</p>
                                            </td>
                                            <td>
                                                <div class="action">
                                                    <button class="text-danger">
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
                                        <PageNavigation :total_count="state.total_count" ref="pageNavi" v-on:movePage="searchRoleList"></PageNavigation>
                                    </b-col>
                                </b-row>
                            </b-container>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="card-style mb-30">
                            <h6 class="mb-25">Role Input Fields</h6>
                            <div class="input-style-1">
                                <label>ID</label>
                                <input type="text" placeholder="Role ID" v-model="role.role_id" disabled>
                            </div>
                            <div class="input-style-1">
                                <!-- <label>Full Name</label> -->
                                 <label>Name</label>
                                <input type="text" placeholder="Role Name" v-model="role.role_name">
                            </div>
                            <div class="input-style-1">
                                <label>Description</label>
                                <textarea placeholder="Description" rows="5" v-model="role.description"></textarea>
                            </div>
                            <div>
                                <label>Url Repository</label>
                                <div style="background-color: #D3F3F4;border: 1px solid #000000;">
                                    <div style="z-index:9999">
                                        <treeselect
                                            v-model="role.checked_url_repository"
                                            :multiple="true"
                                            :options="state.url_list"
                                            placeholder="Select your favourite(s)..."
                                            />
                                    </div>
                                </div>
                            </div>
                            <div class="input-style-1">
                                <ul class="buttons-group float-end">
                                    <li>
                                        <a class="main-btn success-btn-light square-btn btn-hover" @click="addRole">등록</a>
                                    </li>
                                    <li>
                                        <a class="main-btn warning-btn-light btn-hover" @click="addRole">수정</a>
                                    </li>
                                    <li>
                                        <a class="main-btn secondary-btn-light square-btn btn-hover" @click="initRoleForm">초기화</a>
                                    </li>
                                </ul>
                            </div>
                            <div>&nbsp;</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import {ref , reactive , onMounted , inject } from 'vue'
import PageNavigation from '@/components/PageNavigation.vue'

// https://zanmato.github.io/vue3-treeselect/
import treeselect from '@zanmato/vue3-treeselect'

const api = inject('api');
const utils = inject('utils');

const pageConf = utils.getPageConf()
const pageNavi = ref(null)

const state = reactive({
    role_list : []
    , url_list : []
    , total_count : 0
    , current_page : 1
    , alwaysOpen : true
    , appendToBody : true
    , multiple : true
    , clearable : true
    , searchable : true
    , disabled : true
})

const role = reactive({
    role_id : ''
    , role_name : ''
    , description : ''
    , checked_url_repository : null
})

const searchForm = reactive({
    role_id : undefined
    , role_name : undefined
    , description : undefined
    , take : pageConf.pageSize ? pageConf.pageSize : 10
})

const searchFormInit = () => {
    
}

const searchRoleList = (p) => {
    let param = {} 
    state.current_page = p

    param = Object.assign(param , searchForm);
    param.take = pageConf.pageSize;
    param.page = p ? p : 1;

    api.call({
        url : '/role'
        , method : 'get'
    } , param)
    .then(res => searchRoleListSuc(res))
}

const searchRoleListSuc = (res) => {
    state.role_list = res.resultData.role_list
    state.total_count = res.resultData.total_count

    pageNavi.value.synchTotalCount(state.total_count , state.current_page)
}

const loadUrlRepository = () => {
    api.call({
        url : '/url-repository'
        , method : 'get'
    } , {})
    .then(res => loadUrlRepositorySuc(res))
}

const loadUrlRepositorySuc = (res) => {
    console.log('res.resultData.url_list' , res.resultData)
    state.url_list = res.resultData.url_list
    state.url_list.forEach((e) => {
        e.id = e.url_id
        e.label = e.url_string.concat(',' , e.url_id)
    })


    console.log('state.url_list' , state.url_list)
}

const selectRole = (item) => {

    role.role_id = item.role_id 
    role.role_name = item.role_name
    role.description = item.description
    role.checked_url_repository = item.url_ids.split(',')

    console.log('role' , role)
}

const initRoleForm = () => {
    console.log('role' , role)
    console.log('state url_list', state.url_list)
}

onMounted(()=> {
    console.log(state)
    console.log(role)

    loadUrlRepository()
})
</script>