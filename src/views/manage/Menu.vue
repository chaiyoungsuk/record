<template>
    <section class="section">
        <!-- header -->
        <div class="container-fluid">
            <div class="title-wrapper pt-30">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="title">
                        <h2>메뉴관리</h2>
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
                    <div class="col-lg-4">
                        <!-- <treeselect v-model="selectedUrlId" :multiple="true" :options="treeOptions" /> -->
                        <div class="card-style mb-30">
                            <div class="select-style-2">
                                <div class="select-position">
                                    <select v-model=searchFrom.type @change="loadMenuList">
                                        <option value="">Menu Type</option>
                                        <option v-for="(item , index) in state.menu_types" :key="index" :value=item.seq>{{ item.text }}</option>
                                    </select>
                                </div>
                            </div>
                            <Tree :nodes="state.menu_list" :search-text="searchText" :use-icon="true" show-child-count @nodeExpanded="onNodeExpanded" @update:nodes="onUpdate" @nodeClick="onNodeClick"/>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="card-style mb-30">
                            <h6 class="mb-25">Menu Input Fields</h6>
                            <div class="row">
                                <div class="input-style-1 col-lg-6">
                                    <label>Seq</label>
                                    <input type="text" placeholder="Seq" v-model="menu.seq" disabled>
                                </div>
                                <div class="input-style-1 col-lg-6">
                                    <label>Parent Seq</label>
                                    <input type="text" placeholder="Parent Seq" v-model="menu.parent_seq">
                                </div>
                                <div class="input-style-1 col-lg-6">
                                    <label>Name</label>
                                    <input type="text" placeholder="Name" v-model="menu.name">
                                </div>
                                <div class="input-style-2 col-lg-6">
                                    <label>Alias</label>
                                    <input type="text" placeholder="Alias" v-model="menu.alias">
                                    <span class="icon"> <i class="lni lni-user"></i> </span>
                                </div>
                                <div class="select-style-2 col-lg-6">
                                    <div class="select-position">
                                        <label>Menu Type</label>
                                        <select v-model=menu.type>
                                            <option value="">Menu Type</option>
                                            <option v-for="(item , index) in state.menu_types" :key="index" :value=item.seq>{{ item.text }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-6"></div>
                                <div class="input-style-1 col-lg-6">
                                    <label>Url Search</label>
                                    <input type="text" placeholder="Url String" v-model="menu.url_string" @keyup.enter="onSearchUrlRepository">
                                </div>
                                <div class="select-style-2 col-lg-6">
                                    <div class="select-position">
                                        <label>Url Respository</label>
                                        <select v-model=menu.url_id>
                                            <option value="">Url ID</option>
                                            <option v-for="(item , index) in state.url_list" :key="index" :value=item.url_id>
                                                {{ item.url_string }} - {{ item.method }} / {{ item.description }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <ul class="buttons-group float-end">
                                <li>
                                    <a href="#0" class="main-btn success-btn-light square-btn btn-hover" @click="onRegistMenu">등록</a>    
                                </li>
                                <li>
                                    <a href="#0" class="main-btn warning-btn-light btn-hover" @click="onUpdateMenu">수정</a>    
                                </li>
                                <li>
                                    <a href="#0" class="main-btn danger-btn-light square-btn btn-hover" @click="onDeleteMenu">삭제</a>
                                </li>
                            </ul>
                            <div class="input-style-1">&nbsp;</div>
                            <!-- end input -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<!-- runtime-core.esm-bundler.js:455 Uncaught TypeError: Cannot read properties of undefined (reading 'state') -->
<script setup>
import { ref , reactive , inject , onMounted} from 'vue';
import Tree from "vue3-tree";

const utils = inject('utils');
const api = inject('api')
const VueSimpleAlert = inject('VueSimpleAlert')
const searchText = ref("");
const searchFrom = reactive({
    type : ''
})
const state = reactive({
    menu_types : []
    , menu_list : []
    , url_list : []
})

// let selectedUrlId = ref('');
const menu = reactive({
    seq             : undefined
    , name          : undefined
    , alias         : undefined
    , type          : ''
    , url_string    : undefined
    , url_id        : ''
    // 999999
    , parent_seq    : undefined 
})

const loadMenuType = () => {
    api.call({
        url : 'common-code'
        , method : 'get'
    } , {value : 'MENU_TYPE'})
    .then( res => {
        state.menu_types = res.resultData.code_list
    })
}

const loadMenuList = () => {

    let param = {}
    param.type = searchFrom.type ? searchFrom.type : ''
    api.call({
        url : 'menu/tree'
        , method : 'get'
    } , param)
    .then( res => {
        console.log('loadMenuList' , res)
        if(res.resultData.menu_list && res.resultData.menu_list.length > 0) 
            state.menu_list = utils.json.toHierarchy(res.resultData.menu_list , 999999)
        // state.menu_list = res.resultData.menu_list
    })
}

const loadUrlList = () => {

    let param = {}
    param.take = 99999

    if(menu.url_string) param.url_string = menu.url_string

    api.call({
        url : 'url-repository'
        , method : 'get'
    } , param )
    .then( res => { 
        console.log('loadUrlList' , res)

        state.url_list = res.resultData.url_list
    })
}

const onSearchUrlRepository = () => {
    loadUrlList()
}

const onRegistMenu = () => {
    console.log('onRegistMenu' , menu)
     api.call({
        url : 'menu'
        , method : 'post'
    } , menu )
    .then( res => { 
        VueSimpleAlert.alert(res.message , '등록' , 'success')
        .then(() => {
            loadMenuList()    
        })
    })
}

const onUpdateMenu = () => {
    console.log('onUpdateMenu' , menu)
    api.call({
        url : 'menu'
        , method : 'put'
    } , menu )
    .then( res => { 
        VueSimpleAlert.alert(res.message , '수정' , 'success')
        .then(() => {
            loadMenuList()    
        }) 
    })
}

const onDeleteMenu = () => {
    api.call({
        url : 'menu/' + menu.seq
        , method : 'delete'
    } , {} )
    .then( res => { 
        VueSimpleAlert.alert(res.message , '삭제' , 'success')
        .then(() => {
            loadMenuList()
        })
    })
}

const onNodeExpanded = (node, state) => {
    console.log("state: ", state);
    console.log("node: ", node);
}
 
const onUpdate = (nodes) => {
    console.log("nodes:", nodes);
};

const onNodeClick = (node) => {
    console.log(node);

    menu.seq         = node.id
    menu.name        = node.label
    menu.alias       = node.alias
    menu.type        = node.type ? node.type : ''
    menu.url_id      = node.url_id
    menu.parent_seq  = node.parent_id

    console.log('menu', menu)
};

onMounted(() => {
    console.log('state' , state);
    console.log('utils' , utils);

    loadMenuType()
    loadMenuList() 
    loadUrlList()
})
</script>