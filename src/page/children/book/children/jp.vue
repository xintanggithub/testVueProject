<template>
    <div v-loading="firstLoading">
        <div class="tabsDiv">
            <el-button @click="allBook" icon="el-icon-document-copy" class="marginLeftSt">笔记广场</el-button>
            <el-button type="danger" icon="el-icon-star-on">精品推荐</el-button>
            <el-button @click="my" icon="el-icon-document">我的笔记</el-button>
            <el-button icon="el-icon-edit" type="warning" @click="addBook">新增笔记</el-button>
            <el-autocomplete class="searchInput" v-model="state" :fetch-suggestions="queryMySearchAsync"
                             placeholder="请输入搜索内容" @keyup.enter.native="enter"
                             :trigger-on-focus="false" @select="handleSelect">
                <el-button slot="append" icon="el-icon-search" @click="enter"></el-button>
            </el-autocomplete>
        </div>
        <div class="detail_content_a_style list_root_style allListDiv" @scroll="orderScroll" ref="Box">
            <div v-show="firstMessage===''" v-for="(itemData,index) in listData" :key="index">
                <el-card shadow="hover" class="allListCard">
                    <div class="allListTitle" @click="itemClick(itemData.bookId)">
                        <i v-show="itemData.splash==='1'" class="el-icon-star-on" style="color: #409EFF;"></i>
                        <el-link>{{itemData.title}}</el-link>
                    </div>
                    <div class="allListDescription" @click="itemClick(itemData.bookId)">
                        <span class="popLabel">{{itemData.description}}</span>
                    </div>
                    <div class="allListTag">
                        <el-tag type="warning" size="mini" :style="index!==0?'margin-left: 0.5vw;':''" :key="index"
                                v-for="(tag,index) in loadTag(itemData.img)" :disable-transitions="false">
                            <i v-show="index===0" class="el-icon-collection-tag"></i>
                            {{tag}}
                        </el-tag>
                    </div>
                    <div class="allListUser">
                        <el-avatar size="small" :src="itemData.userHead">
                            <img :src="require('../../../../res/img/user_center.png')"/>
                        </el-avatar>
                        <div style="display: flex;flex-direction: column;">
                            <el-link type="info"
                                     style="width:auto;margin-left: 1vw;font-size: 13px;justify-content: start;">
                                {{itemData.userName}}
                            </el-link>
                            <span style="font-size: 11px;;color: #909399;margin-left: 1vw;">{{formatTime(itemData.updateTime)}}</span>
                        </div>
                    </div>
                </el-card>
            </div>
            <div v-show="firstMessage!==''" class="errorView">
                <div class="errorContent">
                    <i class="el-icon-warning" style="color:#F56C6C;"> {{firstMessage}}</i>
                </div>
            </div>
        </div>
        <div v-show="showBootLoading"
             style="width: 100%;height: auto;display: flex;flex-direction: row;justify-content: center;">
            <i v-show="loading" class="el-icon-loading"></i><span style="font-size: 11px;">{{noMore?"正在加载更多...":"已经加载完了"}}</span>
        </div>
        <el-drawer :visible.sync="drawerDetail" :direction="direction"
                   :modal-append-to-body="false" :show-close="false" size="97.4%">
            <detail ref="childJP" :book-id="bookId"></detail>
        </el-drawer>
    </div>
</template>
<script>

    import {queryBookBySplash, queryBookBySplash2, queryBookBySplashParams} from "../../../../api/book"
    import {loginStatus} from '../../../../utils/loginStatus'
    import {formatTime} from '../../../../utils/formatUtils'
    import detail from '../detail'

    export default {
        components: {detail},
        name: "jp",
        data() {
            return {
                bookId: '',
                direction: 'btt',
                selectId: "",
                drawerDetail: false,
                firstLoading: false,
                firstMessage: "",
                restaurants: [],
                state: '',
                timeout: null,
                noMore: true,
                loading: false,
                showBootLoading: false,
                listData: [],
                page: 1,
                pageSize: 20,
                openType: 0,//1公开
            }
        },
        created() {
            this.loadListData(true);
        },
        methods: {
            formatTime,
            itemClick(id) {
                this.bookId = id;
                this.drawerDetail = true;
                this.$refs.childJP.test(id);
            },
            addBook() {
                if (loginStatus()) {
                    this.$router.push({
                        name: 'edit',
                        params: {
                            type: 1
                        }
                    });
                } else {
                    this.$router.push('/login');
                }
            },
            loadTag(val) {
                if (null === val || "" === val || undefined === val) {
                    return ["暂无标签"]
                }
                return val.split(",");
            },
            orderScroll(e) {
                let a = this.$refs.Box.scrollHeight;
                let b = this.$refs.Box.clientHeight;
                let c = this.$refs.Box.scrollTop;
                console.log("====> a", a);
                console.log("====> b+c", b + c);
                this.showBootLoading = (b + c >= a - 3);
                if (this.showBootLoading) {
                    if (!this.noMore) {
                        this.loading = false;
                        this.showBootLoading = true;
                    } else {
                        if (!this.loading) {
                            this.loading = true;
                            this.loadListData(false);
                        }
                    }
                }
            },
            async loadListData(refresh) {
                if (refresh) {
                    this.firstLoading = true;
                    this.page = 1;
                } else {
                    this.page++;
                    this.loading = true;
                    this.showBootLoading = true;
                }
                let v = this;
                const params = queryBookBySplashParams(this.state, this.page, this.pageSize);
                console.log("queryBookByUser params ===> ", params);
                await queryBookBySplash(params).then(data => {
                    v.firstMessage = "";
                    this.firstLoading = false;
                    this.loading = false;
                    this.showBootLoading = false;
                    if (refresh) {
                        v.listData = data.data.data.lists;
                    } else {
                        v.listData = this.listData.concat(data.data.data.lists);
                    }
                    v.noMore = data.data.data.totalCount > data.data.data.page * data.data.data.pageSize;
                    if (v.noMore) {
                        this.showBootLoading = true;
                    }
                }).catch(error => {
                    v.firstLoading = false;
                    this.loading = false;
                    this.showBootLoading = false;
                    console.log("queryBookByUser error ===> ", error);
                    if (refresh) {
                        v.firstMessage = error.message;
                        console.log("v.firstLoading ===> ", v.firstMessage);
                    }
                });
            },
            allBook() {
                this.$router.push({name: 'bookAll'});
            },
            my() {
                if (loginStatus()) {
                    this.$router.push({name: 'bookMyBook'});
                } else {
                    this.$router.push('/login');
                }
            },
            enter() {
                this.loadListData(true)
            },
            async queryMySearchAsync(queryString, cb) {
                const params = queryBookBySplashParams(queryString, 1, 20);
                await queryBookBySplash2(params).then(data => {
                    let list = data.data.data.lists;
                    this.restaurants = [];
                    for (let a in list) {
                        const p = {};
                        p["value"] = list[a].title;
                        p["address"] = list[a].bookId;
                        this.restaurants.push(p);
                    }
                    let restaurants = this.restaurants;
                    let results = queryString ? restaurants.filter(this.createMyStateFilter(queryString)) : restaurants;
                    cb(results);
                }).catch(error => {
                    this.restaurants = [];
                    let restaurants = this.restaurants;
                    let results = queryString ? restaurants.filter(this.createMyStateFilter(queryString)) : restaurants;
                    cb(results);

                });
            },
            createMyStateFilter(queryString) {
                return (state) => {
                    return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                this.itemClick(item.address)
            }
        }
    }
</script>
<style>
    .errorContent {
        width: auto;
        height: 80vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .errorView {
        width: 80vw;
        height: 80vh;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .allListUser {
        display: flex;
        flex-direction: row;
        margin-top: 0.7vh;
        align-items: center;
    }

    .allListTag {
        display: flex;
        flex-direction: row;
        margin-top: 0.3vh;
    }

    .allListDescription {
        margin-top: 0.2vh;
        max-lines: 2;
        min-height: 5vh;
        max-height: 5vh;
        display: -webkit-box;
        text-overflow: ellipsis;
        width: 39.5vw;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        word-break: break-all;
    }

    .allListTitle {
        max-lines: 1;
        max-height: 2.2vh;
        overflow: hidden;
        text-overflow: ellipsis;
        display: block;
        width: 39.5vw;
        white-space: nowrap;
        margin-top: -1vh;
    }

    .allListCard {
        width: 41.5vw;
        height: 16vh;
        margin: 10px;
    }

    .allListDiv {
        padding-left: 7.2vw;
        margin-top: -1vh;
    }

    .searchInput {
        margin-left: 2vw;
        width: 52.5vw;
    }

    .tabsDiv {
        width: 100vw;
        height: 8vh;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-top: 1vh;
    }

    .popLabel {
        color: #909399;
        font-size: 11px;
        margin-top: 10px;
    }
</style>