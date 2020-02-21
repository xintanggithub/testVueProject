<template>
    <div>
        <div style="padding-top:3vh;width: 100%;height: 5vh;display: flex;flex-direction: row; margin-left: 6vw;">
            <div @mouseover="mouseover" @mouseout="mouseout" class="search"
                 :style="'width:'+(10+0.8*transitionCount)+'vw;'">
                <el-input placeholder="请输入搜索内容" v-model="keyword" @keyup.enter.native="queryGameList()">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </div>
            <div class="r_top" :style="'width:'+(73.7-0.8*transitionCount)+'vw;'">
                <el-button type="warning" icon="el-icon-star-off" @click="showCollection">我的收藏</el-button>
            </div>
        </div>
        <!--list-->
        <div class="top_list_root" v-loading="loading">
            <div class="list_root_style">
                <div v-for="(itemData,index) in listData" :key="index">
                    <el-card class="list_item"
                             shadow="hover">
                        <div style="position: relative;">
                            <div style="position: absolute;z-index: 10;">
                                <el-image @click="openItem(itemData)" fit="cover"
                                          class="img_item" :src="itemData.img">
                                </el-image>
                                <div @click="openItem(itemData)" style="display: flex;flex-direction: column;">
                                    <div>
                                        <el-link type="warning">{{itemData.title}}</el-link>
                                    </div>
                                    <div>
                                        <el-tag type="warning" size="mini" :style="index!==0?'margin-left: 0.5vw;':''"
                                                :key="index"
                                                v-for="(tag,index) in loadTag(itemData.tag)"
                                                :disable-transitions="false">
                                            <i v-show="index===0" class="el-icon-collection-tag"></i>
                                            {{tag}}
                                        </el-tag>
                                    </div>
                                </div>
                            </div>
                            <!-- todo 添加登录状态判断，决定是否需要显示收藏  修改列表接口调用-->
                            <div :style="showSC===index?'background-color: rgba(0,0,0,0.46);':'background-color: transparent;'"
                                 class="top_img_btn" @mouseover="showSC=index" @mouseout="showSC=-1">
                                <div class="sc_sc" v-show="showSC===index">
                                    <div style="display: flex;flex-direction: row;">
                                        <el-tooltip v-show="loginStatus" class="item" effect="dark"
                                                    :content="itemData.collection===1?'取消收藏多可惜':'点击收藏不迷路'"
                                                    placement="top">
                                            <el-button type="warning"
                                                       :icon="itemData.collection===1?'el-icon-star-on':'el-icon-star-off'"
                                                       circle
                                                       @click="collectionMT(itemData)"></el-button>
                                        </el-tooltip>
                                        <el-tooltip class="item" effect="dark" content="点击开始玩游戏" placement="top">
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
        </div>
        <div class="block mg_pg">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="page"
                    :page-size="pageSize"
                    layout="prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>

    import {queryListToCollection} from "../../../api/game"
    import {loginStatus, getLoginInfo} from '../../../utils/loginStatus'

    export default {
        name: 'game',
        data() {
            return {
                loading: false,
                transitionCount: 0,
                t2: null,
                total: 0,
                page: 1,
                pageSize: 18,
                keyword: '',
                listData: [],
                showSC: -1,
            }
        },
        methods: {
            showCollection() {
                if (loginStatus()) {
                    //todo 展开收藏
                } else {
                    this.$router.push('/login');
                }
            },
            loginStatus,
            handleCurrentChange(val) {
                console.log("当前是第" + val + "页 ");
                this.queryGameList();
            },
            async queryGameList() {
                this.loading = true;
                const params = {};
                if (this.keyword) {
                    params["keyword"] = this.keyword;
                }
                if (loginStatus() && getLoginInfo().id) {
                    params["userId"] = getLoginInfo().id;
                }
                params["page"] = this.page;
                params["pageSize"] = this.pageSize;
                //调用接口搜索/查询
                await queryListToCollection(params).then(data => {
                    console.log("success==> ", data.data.data);
                    this.listData = data.data.data.lists;
                    this.total = data.data.data.totalCount;
                    this.loading = false;
                }).catch(error => {
                    this.loading = false;
                    console.log("success==> " + error)
                })
            },
            collectionMT(val) {
                console.log("collection==> ", val);
                if (val.collection === 1) {
                    //取消
                } else {
                    //收藏
                }
            },
            loadTag(val) {
                if (null === val || "" === val || undefined === val) {
                    return ["暂无标签"]
                }
                return val.split(",");
            },
            openItem(val) {
                window.open(val.html);
            },
            mouseover() {
                console.log("====> mouseover ====>");
                this.transitionCount = 0;
                this.clearIntervalMD();
                this.drawTransition(1);
            },
            mouseout() {
                console.log("====> mouseout ====>");
                this.clearIntervalMD();
                this.drawTransition(2);
            },
            clearIntervalMD() {
                if (null !== this.t2) {
                    window.clearInterval(this.t2);
                    this.t2 = null;
                }
            },
            drawTransition(type) {
                let v = this;
                this.t2 = setInterval(function () {
                    if (type === 1) {
                        v.transitionCount = v.transitionCount + 1;
                        if (v.transitionCount >= 40) {
                            window.clearInterval(v.t2);
                            v.t2 = null;
                        }
                    } else {
                        v.transitionCount = v.transitionCount - 1;
                        if (v.transitionCount <= 0) {
                            window.clearInterval(v.t2);
                            v.t2 = null;
                        }
                    }
                }, 5);
            },
        },
        created() {
            this.queryGameList();
        }
    }
</script>
<style>
    .list_root_style {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap
    }

    .list_item {
        width: 13vw;
        height: 22.7vh;
        margin-left: 1vw;
        margin-top: 1vh;
        margin-bottom: 1vh;
    }

    .img_item {
        width: 11vw;
        height: 14vh;
        border-radius: 5px 5px 0 0
    }

    .top_img_btn {
        width: 11vw;
        height: 14vh;
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
        width: 11vw;
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

    .mg_pg {
        margin-left: 7vw;
        margin-top: 1.2vh;
    }

    .search {
        width: 10vw;
        margin-left: 2vw;
        height: 100%;
    }

    .r_top {
        display: flex;;
        flex-direction: row-reverse;
    }

</style>