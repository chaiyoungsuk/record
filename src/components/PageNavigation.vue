<template>
    <footer>
        <div class="pagination">
            <a class="previous" v-show="data.navi.prevPageShow" @click="moveNavi('-')">PREV</a>
            <a v-for="(item , index) in data.items" :key="index" :class="{active:item.id == data.selected}" @click="movePage(item.id,$event)" class="page " >{{ item.id }}</a>
            <a class="next" v-show="data.navi.nextPageShow" @click="moveNavi('+')">Next</a>
        </div>
    </footer>
</template>

<script setup>
// import { ref , reactive , inject , onMounted , defineEmits , defineExpose } from 'vue';
import { ref , reactive , inject , onMounted , defineEmits , defineExpose } from 'vue';

const state = ref(0)
const pageConf = inject('pageConf');

// 계속 바뀔수 있으니 그냥 말자;;;
// const props = defineProps({
//     totalCount : {
//         type: Number,
//         default: 0
//     }
// })

const emit = defineEmits(['movePage']);

const data = reactive({
    items : []
    , selected : undefined
    , listTotalCount : 0
    , navi : {
        totalPageCount : 0
        , currentPage : 1
        , prevPageShow : false
        , nextPageShow : false
    }
})

const synchTotalCount = (count , page) => {
    console.log('count' , count)
    console.log('page' , page)
	console.log('pageConf' , pageConf)
    data.listTotalCount = count;

    resetPageNaviInfo(page ? page : 1);
}

const resetPageNaviInfo = (page) => {
    data.navi.totalPageCount = Math.ceil(data.listTotalCount/pageConf.pageSize);
    data.items = [];

    
    let naviStartIndex = Math.floor((page - 1) / pageConf.naviSize) * pageConf.naviSize + 1;
    let naviEndIndex = naviStartIndex + pageConf.naviSize - 1 > data.navi.totalPageCount ? data.navi.totalPageCount : naviStartIndex + pageConf.naviSize - 1

    for (let i = naviStartIndex; i <= naviEndIndex ; i++)
        data.items.push({id: i});
    
    data.navi.prevPageShow = false;
    data.navi.nextPageShow = false;
    data.navi.currentPage = naviStartIndex;
    data.selected = page;

    if(naviEndIndex < data.navi.totalPageCount)
        data.navi.nextPageShow = true;

    if(data.navi.currentPage > pageConf.naviSize)
        data.navi.prevPageShow = true;

}

const movePage = (page) => {
    data.selected = page;
    // v-on:movePage="movePlace" 과 동일해야 한다. 부모코드에 기재한 v-on:{이벤트명} 과 $emit('{이벤트명}') 같아야 한다.
    emit('movePage' , page)
} 

const moveNavi =(direction) => {

    let naviStartIndex = 1;
    
    if(direction === '+') naviStartIndex = this.items[0].id + this.$pageConf.naviSize;
    else naviStartIndex = this.items[0].id - this.$pageConf.naviSize;
    
    this.movePage(naviStartIndex)
    //this.resetPageNaviInfo(naviStartIndex);

}

onMounted(()=>{ 
    console.log(state)
    synchTotalCount(10)
})
   
defineExpose({
    synchTotalCount
})
</script>

<style lang="css">
.pagination {
		display: -moz-inline-flex;
		display: -webkit-inline-flex;
		display: -ms-inline-flex;
		display: inline-flex;
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
		cursor: default;
		list-style: none;
		margin: 0 0 2rem 2px;
		padding: 0;
	}

		.pagination a, .pagination span {
			-moz-transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, color 0.2s ease-in-out;
			-webkit-transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, color 0.2s ease-in-out;
			-ms-transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, color 0.2s ease-in-out;
			transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, color 0.2s ease-in-out;
			border: solid 2px;
			display: inline-block;
			font-family: "Source Sans Pro", Helvetica, sans-serif;
			font-size: 0.8rem;
			font-weight: 900;
			height: 3rem;
			letter-spacing: 0.075em;
			line-height: calc(3rem - 4px);
			margin-left: -2px;
			min-width: 3rem;
			position: relative;
			text-align: center;
			text-decoration: none;
			text-transform: uppercase;
		}

		.pagination .next, .pagination .previous {
			text-decoration: none;
			padding: 0 1.75rem;
		}

			.pagination .next:before, .pagination .previous:before {
				-moz-osx-font-smoothing: grayscale;
				-webkit-font-smoothing: antialiased;
				display: inline-block;
				font-style: normal;
				font-variant: normal;
				text-rendering: auto;
				line-height: 1;
				text-transform: none !important;
				font-family: 'Font Awesome 5 Free';
				font-weight: 900;
			}

			.pagination .next:before, .pagination .previous:before {
				display: inline-block;
				color: inherit !important;
				line-height: inherit;
			}

		.pagination .previous:before {
			content: '\f104';
			margin-right: 0.9375em;
		}

		.pagination .next:before {
			content: '\f105';
			float: right;
			margin-left: 0.9375em;
		}

		@media screen and (max-width: 980px) {

			.pagination a, .pagination span {
				font-size: 0.9rem;
			}

		}

		@media screen and (max-width: 480px) {

			.pagination .page, .pagination .extra {
				display: none;
			}

		}

	.pagination a, .pagination span {
		border-color: #eeeeee;
	}

	.pagination a {
		color: #212931 !important;
	}

		.pagination a:hover {
			color: #18bfef !important;
			border-color: #18bfef;
			z-index: 1;
		}

			.pagination a:hover + a,
			.pagination a:hover + span {
				border-left-color: #18bfef;
			}

		.pagination a.active {
			background-color: #eeeeee;
		}

	.pagination span {
		color: #eeeeee;
	}
</style>