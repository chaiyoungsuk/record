import { createApp } from 'vue'
import App from './App.vue'
import {BootstrapVue3} from 'bootstrap-vue-3'
import VueSimpleAlert from 'vue3-simple-alert';

import VueFroala from 'vue-froala-wysiwyg';
// Froala Editor 플러그인 및 CSS 파일 임포트
import 'froala-editor/js/third_party/embedly.min';
import 'froala-editor/js/third_party/font_awesome.min';
import 'froala-editor/js/third_party/spell_checker.min';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';

import router from './router/index.js'

import utils from './assets/js/default_utils_vue3.js'
import api from './assets/js/api_caller_vue3.js'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

// tree , treeselect
import Tree from "vue3-tree"


import 'vue3-tree/dist/style.css'
import "@zanmato/vue3-treeselect/dist/vue3-treeselect.min.css";
require('vue3-tree/dist/style.css')

// 무료 html 관련
require('@/assets/css/fullcalendar.css')
require('@/assets/css/lineicons.css')
require('@/assets/css/main.css')
require('@/assets/css/popup.css')

// Color Picker
import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

const recordAdminApp = createApp(App)

recordAdminApp.provide('VueSimpleAlert', VueSimpleAlert)
recordAdminApp.provide('api',api)
recordAdminApp.provide('Tree',Tree)


recordAdminApp
.use(router)
.use(BootstrapVue3)
.use(utils)
.use(VueFroala)
.use(Vue3ColorPicker)
.mount('#app')