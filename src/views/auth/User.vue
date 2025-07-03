<template>
    <section class="section">
        <!-- header -->
        <div class="container-fluid">
            <div class="title-wrapper pt-30">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="title">
                        <h2>User 관리</h2>
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
                            <h6 class="mb-10">User Table</h6>
                            <p class="text-sm mb-20">
                                Record System Users
                            </p>
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="input-style-1">
                                        <label>User Id</label>
                                        <input type="text" v-model="searchForm.user_id" placeholder="user_id">
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="input-style-1">
                                        <label>User Name</label>
                                        <input type="text" v-model="searchForm.user_name" placeholder="user_name">        
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="form-check form-switch toggle-switch">
                                        <input class="form-check-input" type="checkbox" id="toggleEnabled" checked="" v-model="searchForm.enabled">
                                        <label class="form-check-label" for="toggleEnabled">Enabled</label>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="form-check form-switch toggle-switch">
                                        <input class="form-check-input" type="checkbox" id="toggleExpired" checked="" v-model="searchForm.locked">
                                        <label class="form-check-label" for="toggleExpired">Locked</label>
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
                                            <a href="#0" class="main-btn primary-btn-light square-btn btn-hover" @click="searchUserList(1)">검색</a>    
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="table-wrapper table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>
                                                <h6>User ID</h6>
                                            </th>
                                            <th>
                                                <h6>User Name</h6>
                                            </th>
                                            <th>
                                                <h6>Enabled</h6>
                                            </th>
                                            <th>
                                                <h6>Locked</h6>
                                            </th>
                                            <th>
                                                <h6>Login Failure Count</h6>
                                            </th>
                                            <th>
                                                <h6>Description</h6>
                                            </th>
                                            <th>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item , index) in state.user_list" :key="index" @click="selectUser(item)">
                                            <td class="min-width">
                                                <p>{{ item.user_id }}</p>
                                            </td>
                                            <td class="min-width">
                                                <p>{{ item.user_name }}</p>
                                            </td>
                                            <td class="min-width">
                                                <!-- <p>{{ item.enabled }}</p> -->
                                                <div class="form-check form-switch toggle-switch">
                                                    <input class="form-check-input" type="checkbox" :id="'toggleEnabled' + index" 
                                                        v-model="state.user_list[index].enabled" true-value="1"
                                                        @change="enableChange(item.user_id , $event)">
                                                    <label class="form-check-label" :for="'toggleEnabled' + index"></label>
                                                </div>
                                            </td>
                                            <td class="min-width">
                                                <!-- <p>{{ item.locked }}</p> -->
                                                <div class="form-check form-switch toggle-switch">
                                                    <input class="form-check-input" type="checkbox" :id="'toggleLocked' + index" 
                                                        v-model="state.user_list[index].locked"  true-value="1"
                                                        @change="lockedChange(item.user_id , $event)">
                                                    <label class="form-check-label" :for="'toggleLocked' + index"></label>
                                                </div>
                                            </td>
                                            <td class="min-width" @click="goReference(item.seq)">
                                                <p>{{ item.login_failure_count }}</p>
                                            </td>
                                            <td class="min-width" @click="goReference(item.seq)">
                                                <p>{{ item.description }}</p>
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
                            <!-- end table -->
                            </div>
                            <b-container class="bv-example-row">
                                <b-row class="justify-content-md-center">
                                    <b-col cols="12" md="auto">
                                        <PageNavigation :total_count="state.total_count" ref="pageNavi" v-on:movePage="searchUserList"></PageNavigation>
                                    </b-col>
                                </b-row>
                            </b-container>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="card-style mb-30">
                            <h6 class="mb-25">User Input Fields</h6>
                            <div class="input-style-1">
                                <label>ID</label>
                                <input type="text" placeholder="User ID" v-model="user.user_id" disabled>
                            </div>
                            <div class="input-style-1">
                                <!-- <label>Full Name</label> -->
                                 <label>Name</label>
                                <input type="text" placeholder="User Name" v-model="user.user_name">
                            </div>
                            <div class="input-style-1">
                                <!-- <label>Full Name</label> -->
                                <label>Password</label>
                                <input type="password" placeholder="Password" v-model="user.password">
                            </div>
                            <div class="input-style-1">
                                <label>Login Fail Count</label>
                                <input type="number" placeholder="Login Fail Count" v-model="user.login_failure_count">
                            </div>
                            <ul class="buttons-group">
                                <label>Role</label>
                                <li>
                                    <div class="select-style-2">
                                        <div class="select-position">
                                            <select v-model="state.selected_role">
                                                <option value="">Selected Role</option>
                                                <option v-for="(item , index) in state.role_list" :key="index" :value=item.role_id>{{ item.role_name }}</option>
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <a class="main-btn dark-btn-outline square-btn btn-hover" @click="addRole">추가</a>
                                </li>
                            </ul>
                            <div class="input-style-1">
                                <label>Selected Role</label>
                                <input type="text" placeholder="Selected Role" v-model="user.role_name" >
                            </div>
                            <div class="input-style-1">
                                <label>Description</label>
                                <textarea placeholder="Description" rows="5" v-model="user.description"></textarea>
                            </div>
                            <div class="input-style-1 float-end">
                                <ul class="buttons-group">
                                    <li>
                                        <a class="main-btn success-btn-light square-btn btn-hover" @click="addRole">등록</a>
                                    </li>
                                    <li>
                                        <a class="main-btn warning-btn-light btn-hover" @click="addRole">수정</a>
                                    </li>
                                    <li>
                                        <a class="main-btn secondary-btn-light square-btn btn-hover" @click="addRole">초기화</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="input-style-1">&nbsp;</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<script setup>
import { ref , reactive , inject , onMounted} from 'vue'
import PageNavigation from '@/components/PageNavigation.vue'

const api = inject('api');
const utils = inject('utils');

const pageConf = utils.getPageConf()
const pageNavi = ref(null)

const state = reactive({
    user_list :[]
    , role_list : []
    , total_count : 0
    , current_page : 1
    , selected_role : ''
})

// const user_list = reactive([])
const searchForm = reactive({
    name : undefined
    , user_id : undefined
    , enabled : true
    , locked : true
    , take : pageConf.pageSize ? pageConf.pageSize : 10
})

const user = reactive({
    user_id                      : undefined
    , division                   : undefined
    , user_name                  : undefined
    , password                   : undefined
    , enabled                    : undefined
    , description                : undefined
    , locked                     : undefined
    , login_failure_count        : undefined
    , last_pass_modify_date      : undefined
    , create_date                : undefined
    , modify_date                : undefined
    , expired                    : undefined      
    , expired_date               : undefined
    , role_id                    : ''
    , role_name                  : ''
})

const loadRoleList = () => { 
    // state.roleList

    api.call({
        url : '/role'
        , method : 'get'
    } , {})
    .then((res) => loadRoleListSuc(res))
}

const loadRoleListSuc = (res) => { 
    if(res.resultData.role_list)
        state.role_list = res.resultData.role_list

    console.log('state.role_list ' , state.role_list )
}

const searchFormInit = () => {
    searchForm.user_id = ''
    searchForm.user_name = ''
    searchForm.enabled = true
    searchForm.locked = true
}

const searchUserList = (p) => { 
    state.current_page = p
    let param = {}      
    param = Object.assign(param , searchForm);
    param.page = p ? p : 1;
    param.enabled = param.enabled ? 1 : null
    param.locked = param.locked ? 1 : null

    api.call({
        url : '/user'
        , method : 'get'
    } , param )
    .then((res) => searchUserListSuc(res))
}

const searchUserListSuc = (res) => { 
    console.log('res' , res)
    state.user_list = res.resultData.user_list
    state.total_count = res.resultData.total_count

    pageNavi.value.synchTotalCount(state.total_count , state.current_page)
}

const enableChange = (userId , event) => {
    let param = {}
    param.user_id = userId
    param.enabled = event.target.checked ? 1 : 0

    updateUser(param)
}

const lockedChange = (userId , event) => {
    let param = {}
    param.user_id = userId
    param.locked = event.target.checked ? 1 : 0
    updateUser(param)
}

const updateUser = (param) => {
    console.log(param)

    api.call({
        url : '/user'
        , method : 'put'
    } , param)
    .then((res) => updateUserSuc(res))
}

const updateUserSuc = (res) => {
    console.log('updateUserSuc res' , res)
}

const selectUser = (item) => { 
    user.user_id = item.user_id
    user.user_name = item.user_name
    user.division = item.division
    user.description = item.description
    user.login_failure_count = item.login_failure_count
    user.role_id = item.role_id
    user.role_name = ''
    state.selected_role = ''

    user.role_id.split(',').forEach( (e) => {
        state.role_list.forEach( (f) => {
            if(e == f.role_id) {
                user.role_name = user.role_name.concat(f.role_name , ',')
                return true
            }
        })
    })

    if(user.role_name.endsWith(','))
        user.role_name = user.role_name.substr(0 , user.role_name.length -1)
}

const addRole = () => {
    let role = state.role_list.filter((e) => {
        return e.role_id == state.selected_role
    })

    if(user.role_name.indexOf(role[0].role_name) > -1) {
        alert('이미 선택된 Role 입니다.')
        return false
    }

    if(user.role_id) user.role_id = user.role_id.concat(',' , role[0].role_id)
    else user.role_id = role[0].role_id

    if(user.role_name) user.role_name = user.role_name.concat(',' , role[0].role_name)
    else user.role_name = role[0].role_name
}

onMounted(() => {
    console.log('user' , user);
    console.log(api)
    console.log(utils)
    loadRoleList()
})

</script>
