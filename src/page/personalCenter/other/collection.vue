<template>
    <div>
        <el-tabs v-model="editableTabsValue" style="width: 99%;height: 100%;margin-left: 1%;margin-top: 10px;"
                 type="card" :before-leave="mBeforeLeave">
            <el-tab-pane>
                <span slot="label"><i class="el-icon-s-platform"></i> 小游戏</span>
                <div v-loading="game.loading">
                    <!--game content-->
                    <div class="list_content_root_style">
                        <div v-for="(itemData,index) in game.listData" :key="index">
                            <el-card class="list_item_c"
                                     shadow="hover">
                                <div style="position: relative;">
                                    <div style="position: absolute;z-index: 10;">
                                        <el-image @click="openItem(itemData)" fit="cover"
                                                  class="img_item_c" :src="itemData.img">
                                        </el-image>
                                        <div @click="openItem(itemData)" style="display: flex;flex-direction: column;">
                                            <div>
                                                <el-link type="warning">{{itemData.title}}</el-link>
                                            </div>
                                            <div style="margin-top: 4px;">
                                                <el-tag type="warning" size="mini"
                                                        :style="index!==0?'margin-left: 0.5vw;':''"
                                                        :key="index"
                                                        v-for="(tag,index) in loadTag(itemData.tag)"
                                                        :disable-transitions="false">
                                                    <i v-show="index===0" class="el-icon-collection-tag"></i>
                                                    {{tag}}
                                                </el-tag>
                                            </div>
                                            <div style="max-height: 5vh;min-height: 5vh;">
                                                <span style="color: rgba(0,0,0,0.65);font-size: 12px;"> {{itemData.content}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div :style="game.showSC===index?'background-color: rgba(0,0,0,0.46);':'background-color: transparent;'"
                                         class="top_img_btn_c" @mouseover="game.showSC=index"
                                         @mouseout="game.showSC=-1">
                                        <div class="sc_sc" v-show="game.showSC===index">
                                            <div style="display: flex;flex-direction: row;">
                                                <el-tooltip v-show="loginStatus()" class="item" effect="dark"
                                                            content="取消收藏多可惜"
                                                            placement="top">
                                                    <el-button type="warning" icon="el-icon-star-on" circle
                                                               @click="collectionMT(itemData,index)"></el-button>
                                                </el-tooltip>
                                                <el-tooltip class="item" effect="dark" content="点击开始玩游戏"
                                                            placement="top">
                                                    <el-button type="success" icon="el-icon-s-promotion" circle
                                                               @click="openItem(itemData)"></el-button>
                                                </el-tooltip>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </el-card>
                        </div>
                    </div>
                    <div class="block mg_pg_c">
                        <el-pagination
                                @current-change="handleCurrentChange"
                                :current-page.sync="game.page"
                                :page-size="game.pageSize"
                                layout="prev, pager, next, jumper"
                                :total="game.total">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label"><i class="el-icon-s-order"></i> 笔记</span>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>

    import {deleteCollection, queryCollectionByUserForGame} from "../../../api/collection"
    import {getLoginInfo, loginStatus} from '../../../utils/loginStatus'

    export default {
        name: "collection",
        inject: ['changeStOne'],
        data() {
            return {
                editableTabsValue: "0",
                editableTabs: [{
                    title: '小游戏',
                    name: '0',
                    content: '0'
                }, {
                    title: '笔记',
                    name: '1',
                    content: '1'
                }],
                game: {
                    loading: false,
                    total: 0,
                    page: 1,
                    pageSize: 10,
                    listData: [],
                    showSC: -1,
                }
            }
        },
        mounted() {
            this.change();
            console.log("query params ==> " ,this.$route.query.msgKey);
            this.editableTabsValue = this.$route.query.msgKey;
            console.log("query params editableTabsValue==> " ,this.editableTabsValue);
        },
        created() {
            this.getCollectionByUserForGame();
        },
        methods: {
            mBeforeLeave(val) {
                console.log("sssss===>", val)
            },
            loginStatus,
            change() {
                this.changeStOne();
            },
            loadTag(val) {
                if (null === val || "" === val || undefined === val) {
                    return ["暂无标签"]
                }
                return val.split(",");
            },
            handleCurrentChange(val) {
                console.log("当前是第" + val + "页 ");
                this.getCollectionByUserForGame();
            },
            async getCollectionByUserForGame() {
                this.game.loading = true;
                const params = {};
                params["userId"] = getLoginInfo().id;
                params["page"] = this.game.page;
                params["pageSize"] = this.game.pageSize;
                console.log("params=>", params);
                await queryCollectionByUserForGame(params).then(data => {
                    console.log("sdadadsa=>", data);
                    this.game.listData = data.data.data.lists;
                    this.game.total = data.data.data.totalCount;
                    this.game.loading = false;
                }).catch(error => {
                    this.game.loading = false;
                    console.log("sdadadsa error=>", error)
                })
            },
            collectionMT(val, index) {
                console.log("collection val==> ", val);
                console.log("collection index==> ", index);
                this.disCollectionGm(val);
                val.collection = 0;
            },
            getParamsCollection(val) {
                const params = {};
                params["collectionType"] = 1;
                params["userId"] = getLoginInfo().id;
                params["gameId"] = val.id;
                return params
            },
            async disCollectionGm(val) {
                await deleteCollection(this.getParamsCollection(val)).then(data => {
                    this.$notify({title: '成功', message: '已经从您的收藏列表里移除了~', type: 'warning'});
                    this.getCollectionByUserForGame();
                }).catch(error => {
                    this.$notify({title: '失败', message: '请稍后重试', type: 'error'});
                })
            },
        }
    }

</script>
<style>

    .top_img_btn_c {
        width: 13.5vw;
        height: 21vh;
        position: absolute;
        z-index: 11;
        left: 0;
        top: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        border-radius: 5px 5px 0 0
    }

    .sc_sc {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 13.73vw;
    }

    .top_list_root {
        margin-left: 7vw;
        margin-right: 6vw;
        align-items: center;
        min-height: 75vh;
        word-wrap: break-word;
        word-break: break-all;
        overflow: hidden;
    }

    .list_item_c {
        width: 15.73vw;
        height: 35vh;
        margin-left: 1vw;
        margin-top: 1vh;
        margin-bottom: 1vh;
    }

    .img_item_c {
        width: 13.5vw;
        height: 21vh;
        border-radius: 5px 5px 0 0
    }

    .list_content_root_style {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap
    }

    .mg_pg_c {
        margin-top: 1.2vh;
    }

</style>