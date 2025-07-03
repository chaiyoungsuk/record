<template>
    <section class="section">
        <div class="container-fluid">
            <div class="title-wrapper pt-30">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="title">
                        <h2>WebToon [ {{ state.webtoon_info.title }} - {{ state.webtoon_info.volume }} ]</h2>
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
                            <img v-for="(item , index) in state.image_list" :key="index" :src="item.image_url" class="img-fluid rounded mx-auto d-block">
                        </div>
                    </div>
                    <div class="col-12">
                        <ul class="buttons-group float-end">
                            <li>
                                <a class="main-btn light-btn-light square-btn btn-hover" @click="onMoveWebtoonList">목록</a>    
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="floating">
            <div class="row">
                <div class="col"></div>
                <div class="col" @click="goTop"><button class="arrow-button">↑</button></div>
                <div class="col"></div>
            </div>
            <div class="row">
                <div class="col" @click="onMovePre"><button class="arrow-button" v-if="state.navi.pre_seq > 0">←</button></div>
                <div class="col"></div>
                <div class="col" @click="onMoveNext"><button class="arrow-button" v-if="state.navi.next_seq > 0">→</button></div>
            </div>
            <div class="row">
                <div class="col"></div>
                <div class="col" @click="goBottom"><button class="arrow-button">↓</button></div>
                <div class="col"></div>
            </div>
            <div class="row">
                <div class="select-style-2">
                    <div class="select-position">
                        <select v-model="state.seq" @change="loadWebToon">
                            <option value="">Selected Volume</option>
                            <option v-for="(item , index) in state.volume_list" :key="index" :value=item.seq>{{ item.title }}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { reactive , inject , onMounted } from 'vue'
import { useRoute , useRouter } from 'vue-router';

const api = inject('api')

const route = useRoute()
const router = useRouter()

const state = reactive({
    image_list : []
    , volume_list : []
    , seq : ""
    , navi : {pre_seq : 0 , next_seq : 0} 
    , webtoon_info : {}
})

const loadWebToon = () => {
    api.call({
        url : '/web-toon/image'
        , method : 'get'
    } , {seq : state.seq})
    .then((res) => loadWebToonSuc(res))
}

const loadWebToonSuc = (res) => {
    state.image_list = res.resultData.webToonList
    state.volume_list = res.resultData.volumeList
    state.navi = res.resultData.webToonNavi
    state.webtoon_info = res.resultData.webToonInfo

    goTop()
}

const onMoveWebtoonList = () => {
    router.push({name:'webToonList' , query:{}})
}

const goTop = () =>{ 
    window.scrollTo(0, 0);
}

const goBottom = () => {
    window.scrollTo(0, document.body.scrollHeight)
}

const onMovePre = () => {
    state.seq = state.navi.pre_seq
    loadWebToon()
}

const onMoveNext = () => {
    state.seq = state.navi.next_seq
    loadWebToon()
}

onMounted(()=> {

    if(route.query.seq) {
        state.seq = route.query.seq
        loadWebToon()
    }

})

</script>

<style>
.floating {
    position: fixed; 
    right: 50%; 
    top: 320px; 
    margin-right: -720px;
    text-align:center;
    width: 180px;
}

.arrow-button {
    display: inline-block;
    padding: 10px 15px;
    margin: 5px;
    font-size: 16px;
    border: 2px solid #333;
    border-radius: 5px;
    background-color: #f9f9f9;
    cursor: pointer;
    text-align: center;
}

.arrow-button:hover {
    background-color: #ddd;
}
</style>