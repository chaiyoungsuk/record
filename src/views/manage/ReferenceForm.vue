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
                    <!-- end col -->
                    <div class="col-md-6">
                        <div class="breadcrumb-wrapper">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item">
                                        <a href="#0">Dashboard</a>
                                    </li>
                                    <li class="breadcrumb-item"><a href="#0">Forms</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">
                                        Form Elements
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                <!-- end col -->
                </div>
                <!-- end row -->
            </div>
            <div class="form-elements-wrapper">
                <div class="col-lg-12">
                    <div class="card-style mb-30">
                        <div class="input-style-1">
                            <label>Title</label>
                            <input type="text" placeholder="title" v-model="reference.title">
                        </div>
                        <div class="row"> 
                            <div class="col-lg-2">
                                <div class="input-style-1">
                                    <a class="main-btn dark-btn-outline btn-hover" @click="openReferenceGroupPopup">검색</a>   
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="input-style-1">
                                    <label>Group</label>
                                    <!-- <input type="button" value="Group" class="button" @click="showGroupPop"> -->
                                    <!-- <a href="#0" class="main-btn secondary-btn-light square-btn btn-hover" @click="searchFormInit">초기화</a>    -->
                                    <input type="text" placeholder="Group" v-model="reference.group_label">
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="input-style-1">
                                    <label>Source</label>
                                    <input type="text" placeholder="Source" v-model="reference.source">
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <!-- Froala 에디터 컴포넌트 사용 -->
                                <froala id="edit" :tag="'textarea'" :config="editorData.config" v-model:value="editorData.model" ref="editor"></froala>
                            </div>
                            <div class="col-lg-6"></div>
                            <div class="col-lg-6">
                                <ul class="buttons-group float-end">
                                    <li>
                                        <a href="#0" class="main-btn light-btn-light square-btn btn-hover" @click="moveReferenceList">목록</a>    
                                    </li>
                                    <li v-if=" reference.seq ? false : true">
                                        <a href="#0" class="main-btn success-btn-light square-btn btn-hover" @click="createReference">등록</a>    
                                    </li>
                                    <li v-if=" reference.seq ? true : false">
                                        <a href="#0" class="main-btn warning-btn-light btn-hover" @click="updateReference">수정</a>    
                                    </li>
                                    <li v-if=" reference.seq ? true : false">
                                        <a href="#0" class="main-btn success-btn-light square-btn btn-hover" @click="temp">임시</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ReferecePopup v-show="state.groupPopShow" @closePop="closePop" @selectReferenceGroupPop="selectedGroup" ref="refReferencePopup"></ReferecePopup>
    </section>
</template>

<script setup>
import { ref , reactive , inject , onMounted} from 'vue';
import { useRoute , useRouter } from 'vue-router';

import ReferecePopup from '@/components/popup/ReferencePopup.vue'

const route = useRoute()
const router = useRouter()
const api = inject('api')
const VueSimpleAlert = inject('VueSimpleAlert')

// const utils = inject('utils');
const editor = ref(null)
const refReferencePopup = ref(null)
const state = reactive({
    reference : {}
    , groupPopShow : false
});

const editorData = reactive({
    // 에디터 옵션 설정 (높이, 이벤트 등)
    config: {
        placeholderText: 'Edit Your Content Here!'
        , charCounterCount: false
        , heightMin: 600
        , events: {
            // 에디터 초기화 완료 시 콘솔에 메시지 출력
            initialized: function () {
                console.log('Froala Editor initialized');
            }
            ,'image.beforeUpload' : function(files) {
                    console.log('files' , files)
            }
            ,'image.inserted': (img) => {
               const imageUrl = img.getAttribute('src');
                console.log('Image URL:', imageUrl);
            }
        }
        , imagePaste: true
        , imageUpload: true
        , imageUploadURL: '/api/upload_image',  // response : {"link":"7d59d61.jpg"}
    }
    // 에디터에 표시할 초기 HTML 콘텐츠
    , model: ''
})

// 리스트로 갈때 검색 조건 필요하면...
// const searchForm = reactive({})
const reference = reactive({
    seq : undefined
    , title : undefined
    , group_label : undefined
    , group : undefined
    , source : undefined
    , content : undefined
})

const openReferenceGroupPopup = () => {
    console.log('editorData',editorData.model)
    refReferencePopup.value.searchReferenceGroup()
    state.groupPopShow = true
}

const closePop = () => {
    state.groupPopShow = false
}

const selectedGroup = (node) => {
    console.log('node' , node)
    reference.group = node.id
    reference.group_label = node.label

    closePop()
}

const loadReference = () => {
    api.call({
        url : '/reference/'.concat(reference.seq)
        , method : 'get'
    } , {})
    .then ( res => loadReferenceSuc(res))
}

const loadReferenceSuc = (res) => {

    let referenceData = res.resultData
    
    reference.seq = referenceData.seq
    reference.title = referenceData.title
    reference.group_label = referenceData.group_name
    reference.group = referenceData.group
    reference.source = referenceData.source
    editorData.model = referenceData.data
}

const moveReferenceList = () => {
    router.push({name:'referenceList'})
}

const createReference = () => {
    let params = Object.assign({} , reference);
    params.content = editorData.model;
    // params.content = params.content.replace(/[<p><br></p>]/gi, '');

    api.call({
        url : '/reference'
        , method : 'post'
    } , params)
    .then( res => registReferenceSuc(res))
}

const registReferenceSuc = (res) => {
    VueSimpleAlert.alert(res.message , '등록' , 'success')
    .then(() => {
        VueSimpleAlert.confirm("목록으로 이동 하겠습니까 ? ").then(() => {
            moveReferenceList()
        })
    })
}

const updateReference = () => {
    let params = Object.assign({} , reference);
    params.content = editorData.model;
    // params.content = params.content.replace(/[<p><br></p>]/gi, '');

    api.call({
        url : '/reference'
        , method : 'put'
    } , params)
    .then( res => updateReferenceSuc(res))
}

const updateReferenceSuc = (res) => {
    VueSimpleAlert.alert(res.message , '수정' , 'success')
    .then(() => {
        VueSimpleAlert.confirm("목록으로 이동 하겠습니까 ? ").then(() => {
            moveReferenceList()
        })
    })
}

const temp = () => {
    console.log('editor' ,editor.value)
    console.log('editor.value.getEditor()',editor.value.getEditor())
    console.log('editor.value.getEditor().image',editor.value.getEditor().image)
    console.log('editor.image.get()',editor.value.getEditor().image.get())
}

onMounted(() =>{
    if(route.query.searchForm)
        console.log('route' , JSON.parse(route.query.searchForm))

    console.log('route.query.seq' , route.query.seq)
    if(route.query.seq) {
        reference.seq = route.query.seq
        loadReference()
    }
})

</script>