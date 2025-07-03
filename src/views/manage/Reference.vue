<template>
    <section class="section">
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
                    <div class="col-12">
                        <div class="invoice-card card-style mb-30">
                            <div class="invoice-header">
                                <div class="invoice-for">
                                    <h2 class="mb-10">{{ reference.title }}</h2>
                                    <p class="text-sm">
                                        {{ reference.source }}
                                    </p>
                                </div>
                                <div class="invoice-date">
                                    <p><span>Date Regist:</span> {{reference.regist_date}} </p>
                                </div>
                            </div>
                            <div class="note-wrapper warning-alert py-4 px-sm-3 px-lg-5">
                                <p v-html=reference.data style="font-family: 맑은고딕;font-size:14px"></p>  
                            </div>
                            <div class="row"> 
                                <div class="col-lg-4"></div>
                                <div class="col-lg-8">
                                    <ul class="buttons-group float-end">
                                        <li>
                                            <a class="main-btn light-btn-light square-btn btn-hover" @click="moveReferenceList">목록</a>    
                                        </li>
                                        <li>
                                            <a class="main-btn success-btn-light square-btn btn-hover" @click="moveReferenceForm()">등록</a>    
                                        </li>
                                        <li>
                                            <a class="main-btn warning-btn-light btn-hover" @click="moveReferenceForm(true)">수정</a>    
                                        </li>
                                        <li>
                                            <a class="main-btn danger-btn-light square-btn btn-hover" @click="deleteReference">삭제</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { reactive , onMounted , inject} from 'vue';
import { useRouter , useRoute} from 'vue-router'

const router = useRouter()
const route = useRoute()
const api = inject('api');
const VueSimpleAlert = inject('VueSimpleAlert')

const state = reactive({
    seq : route.query.seq
})

const reference = reactive({
    seq : undefined
    , title : undefined
    , group_name : undefined
    , group : undefined
    , regist_date : undefined
    , source : undefined
    , data : undefined
    , sort : undefined
})

const loadReference = () => {
    api.call({
        url : '/reference/'.concat(state.seq)
        , method : 'get'
    } , {} , loadReferenceSuc)
    .then((res) => {
        loadReferenceSuc(res)
    })
    .catch((err) => {
        console.log(err)
    })
}

const loadReferenceSuc = (res) => {

    let referenceData = res.resultData
    
    reference.seq = referenceData.seq
    reference.title = referenceData.title
    reference.group_name = referenceData.group_name
    reference.group = referenceData.group
    reference.regist_date = referenceData.regist_date
    reference.source = referenceData.source
    reference.data = referenceData.data
    reference.sort = referenceData.sort
}

const moveReferenceList = () => {
    router.push({name:'referenceList'})
}

const moveReferenceForm = (queryFlag) => {

    if(queryFlag) router.push({name:'referenceForm' , query:{seq : state.seq}})
    else router.push({name:'referenceForm'})
}

const deleteReference = () => {
    let params = Object.assign({} , reference);
    api.call({
        url : '/reference'
        , method : 'delete'
    } , params)
    .then( res =>  deleteReferenceSuc(res))
}

const deleteReferenceSuc = (res) =>{ 
    VueSimpleAlert.alert(res.message , '삭제' , 'success')
    .then( () => {
        moveReferenceList()
    })
}

onMounted(() => {
    loadReference()
})
</script>