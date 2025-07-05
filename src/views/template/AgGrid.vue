<template>
    <section>
        <!-- header -->
        <div class="container-fluid">
            <div class="title-wrapper pt-30">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="title">
                        <h2>Ag Grid</h2>
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
                            https://www.ag-grid.com/vue-data-grid/installation/ <br>
                            https://www.ag-grid.com/vue-data-grid/grid-events/#reference-editing        
                            </p>
                        </div>
                        <div class="card-style mb-30">
                            <!-- <RevoGrid :columns="columns" :source="rows" /> -->
                            <ag-grid-vue style="width: 600px; height: 300px;"
                                class="ag-theme-alpine"
                                :columnDefs="columnDefs"
                                :rowData="rowData"
                                :onRowClicked="onRowClicked"
                                :onRowValueChanged="onRowValueChanged"
                                @cellValueChanged="onColumnValueChanged"
                                >
                            </ag-grid-vue>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { inject, reactive } from "vue";
// import { AgGridVue } from "ag-grid-vue3";

// import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

const AgGridVue = inject('AgGridVue');
const AllCommunityModule = inject('AllCommunityModule');
const ModuleRegistry = inject('ModuleRegistry');

ModuleRegistry.registerModules([AllCommunityModule]);

const columnDefs = reactive([
    { headerName: "Make", field: "make" , headerStyle: { color: 'white', 'background-color': 'black' }},
    { headerName: "Model", field: "model" },
    { headerName: "Price", field: "price" , editable: true}
])

const rowData = reactive([
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
])

const onRowClicked = (row) => {
    console.log('onRowClicked row' , row)
}

const onRowValueChanged  = (row) => {
    console.log('rowValueChanged row' , row)
}

const onColumnValueChanged = (data) => {
    console.log('onColumnValueChanged' , data)
}

</script>