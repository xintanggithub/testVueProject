<template>
    <div>
        <el-card class="mh_sc">
            <div>
                <div style="width: 50vw;margin-top: 0.5vh;">
                    <el-input :clearable="true" @keyup.enter.native="enter" placeholder="请输入内容" v-model="searchKey"
                              class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="enter"></el-button>
                    </el-input>
                </div>
                <div v-loading="loading" :class="listData.length>0?'mh_search_list_root':'mh_search_list_root_h'">
                    <div v-show="listData.length===0 || error" class="mh_tips_content">
                        <div class="mh_tips_content_ch">
                            <div style="display: flex;flex-direction: column;">
                                <img v-show="!error" style="width: 10vw;" class="img_st"
                                     src="../../../../assets/em/search.png">
                                <span v-show="error">{{error}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-show="total>0" class="mh_search_bt">
                    <span>总共有{{total}}条结果</span>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script>

    import {searchMhList} from "../../../../api/enterainment"

    export default {
        name: 'mhsc',
        data() {
            return {
                loading: false,
                searchKey: "",
                listData: [],
                total: 0,
                error: '',
            }
        },
        methods: {
            enter() {
                console.log("enter ===> ", this.searchKey);
                if (this.searchKey) {
                    this.searchMhListMt();
                } else {
                    this.listData = [];
                }
            },
            async searchMhListMt() {
                this.loading = true;
                const params = {};
                params['keyword'] = this.searchKey;
                console.log('searchMhListMt ==> params', params);
                await searchMhList(params).then(data => {
                    console.log('searchMhListMt ==> data', data.data.data);
                    this.listData = data.data.data.lists;
                    this.total = data.data.data.totalCount;
                    this.loading = false;
                }).catch(error => {
                    this.loading = false;
                    this.error = error;
                    console.log('searchMhListMt ==> error', error);
                })
            }
        }
    }

</script>
<style>
    .mh_sc {
        width: 84vw;
        height: 86vh;
    }

    .el-select .el-input {
        width: 130px;
    }

    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }

    .mh_search_list_root_h {
        width: 100%;
        height: 73vh;
        margin-top: 1.5vh;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .mh_search_list_root {
        width: 100%;
        height: 73vh;
        margin-top: 1.5vh;
        overflow-y: scroll;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .mh_search_bt {
        height: 4vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .mh_tips_content {
        width: 100%;
        height: 73vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .mh_tips_content_ch {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

</style>