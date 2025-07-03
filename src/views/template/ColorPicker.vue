<template>
    <section>
        <!-- header -->
        <div class="container-fluid">
            <div class="title-wrapper pt-30">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="title">
                        <h2>Vue3 Colorpicker</h2>
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
                    <div class="col-lg-12">
                        <div class="card-style mb-30">
                            <p>
                            https://www.npmjs.com/package/vue3-colorpicker <br>
                            https://aesoper101.github.io/vue3-colorpicker/?path=/docs/example-colorpicker--docs<br><br>

                            install : <br>
                            npm i vue3-colorpicker
                            </p>
                        </div>
                        <div class="card-style mb-30">
                            <div class="row">
                                <div class="input-style-1 col-lg-4">
                                    <input type="text" placeholder="Code Seq" v-model="state.a.color" >
                                </div>
                                <div class="input-style-1 col-lg-2">
                                    <color-picker v-model:pureColor="state.a.color" v-model:gradientColor="state.a.gradientColor" picker-type="chrome" shape="square"/>
                                </div>
                                <div class="input-style-1 col-lg-4">
                                    <input type="text" placeholder="Code Seq" v-model="state.b.color" >
                                </div>
                                <div class="input-style-1 col-lg-2">
                                    <color-picker v-model:pureColor="state.b.color" v-model:gradientColor="state.b.gradientColor" picker-type="chrome" shape="square"/>
                                </div>
                            </div>
                            <!-- <div class="input-style-1">
                                <label>Code Seq</label>
                                <input type="text" placeholder="Code Seq" v-model="code.seq" disabled>
                            </div>
                            <div class="input-style-1">
                                <label>Code Seq</label>
                                <input type="text" placeholder="Code Seq" v-model="code.seq" disabled>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { reactive } from "vue";
// import { ColorInputWithoutInstance } from "tinycolor2";

const state = reactive({
    a : {
        color : "rgb(250, 117, 162)"
        , gradientColor : "linear-gradient(0deg, rgb(0, 0, 0, 1) 0%, rgb(0, 0, 0, 1) 100%)"
    }
    , b : {
        color : "rgb(198, 118, 245)"
        , gradientColor : "linear-gradient(0deg, rgb(0, 0, 0, 1) 0%, rgb(0, 0, 0, 1) 100%)"
    }
})
// pureColor = ref<ColorInputWithoutInstance>("red");
// let gradientColor = ref("linear-gradient(0deg, rgb(0, 0, 0, 1) 0%, rgb(0, 0, 0, 1) 100%)");


// const pureColorChange = (arg) => {
//     console.log('pureColorChange ' , arg)
// }



</script>