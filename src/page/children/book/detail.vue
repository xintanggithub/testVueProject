<template>
    <div>
        <div class="editTopDetail2">
            <div class="editLogDetail" @click="goHome">
                <img src="../../../res/img/logo_icon.png" class="logoIconDetail"/>
            </div>
            <div style="display: flex;flex-direction: column;">
                <div class="titlesDetail">
                    <span style="font-size: 18px;color: black;">{{detailInfo.title}}</span>
                </div>
                <div style="width: 100%;height:3%;display: flex;flex-direction: row;margin-top: 1%;margin-left: 1vw;">
                    <i v-show="detailInfo.splash==='1'" class="el-icon-star-on" style="color: #409EFF;"></i>
                    <el-tag type="warning" size="mini" :style="index!==0?'margin-left: 0.5vw;':''" :key="index"
                            v-for="(tag,index) in loadTag(detailInfo.img)" :disable-transitions="false">
                        <i v-show="index===0" class="el-icon-collection-tag"></i>
                        {{tag}}
                    </el-tag>
                </div>
            </div>
            <my-user hideLoginOut></my-user>
        </div>
        <div class="editContentDetail" v-loading="loading">
            <div :class="showHeadK?'popo':'popoH'">
                <div :class="showHeadK?'hidH':'showH'">
                    <mavon-editor style="width: 100%;height:100%;" :value="detailInfo.content" :subfield="false"
                                  :defaultOpen="'preview'" :toolbarsFlag="false" :editable="false" :scrollStyle="true"
                                  :ishljs="true"></mavon-editor>
                </div>
            </div>
            <div :class="showHeadK?'kLKL':'kLKLH'">
                <div :class="showHeadK?'hdh':'hdhs'">
                    <div v-show="showHeadK"
                         style="width: 100%;display: flex;flex-direction: row-reverse;justify-content: center;">
                        <span @click="changeMax"
                              style="width:98%;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);display: flex;flex-direction: row;justify-content: center;background-color: white;margin-top: 1.6vh;">
                            <i class="el-icon-arrow-up"></i>
                        </span>
                    </div>
                    <transition name="el-zoom-in-top">
                        <el-card v-show="showHeadK" style="width: auto;height: 15vh;">
                            <div style="display: flex;flex-direction: column;width: 12vw;">
                                <div style="display: flex;flex-direction: row;">
                                    <el-avatar shape="square" :size="50" :src="bkUserInfo.img">
                                        <img :src="imgSrc"/>
                                    </el-avatar>
                                    <div style="display: flex;flex-direction: column;margin-left: 0.5vw;align-items: start;">
                                        <el-link target="_blank" style="width: 7vw;font-size: 13px;">
                                            {{bkUserInfo.userName}}{{bkUserInfo.userName}}{{bkUserInfo.userName}}
                                        </el-link>
                                        <el-link style="font-size: 13px;" type="warning" target="_blank">他的主页
                                        </el-link>
                                    </div>
                                </div>
                                <span class="dTextColor" style="margin-top: 1vh;">被赞:{{startCount}}</span>
                                <span class="dTextColor">笔记:{{bookCount}}</span>
                            </div>
                        </el-card>
                    </transition>
                    <div style="width: 100%;display: flex;flex-direction: row-reverse;" @mouseover="changeMin">
                        <transition name="el-zoom-in-center">
                            <el-avatar v-show="showHead" :size="80" :src="bkUserInfo.img"
                                       style="margin-right: -40px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
                                <img :src="imgSrc"/>
                            </el-avatar>
                        </transition>
                    </div>
                    <transition name="el-zoom-in-top">
                        <div v-show="showHeadK" style="width: 100%;max-height: 30vh;">
                            <div v-show="loadingTheUserList || theUserList.length===0"
                                 style="width: 100%;display: flex;flex-direction: row;justify-content: center;margin-top: 5vh;">
                                <i v-show="loadingTheUserList" class="el-icon-loading" style="margin-right: 0.5vw;"></i>{{loadingTheUserList?'加载中...':'没有更多'}}
                            </div>
                            <span v-show="theUserList.length>0" class="dTextColor"><br/>他的笔记：</span>
                            <div v-show="theUserList.length>0" v-for="(itemData,index) in theUserList" :key="index">
                                <el-card shadow="hover" style="margin-top: 1vh;height: 10vh;">
                                    <el-link type="info" class="allListDescriptions"
                                             @click="itemBookListClick(itemData)">
                                        {{itemData.title}}
                                    </el-link>
                                    <span style="font-size: 13px;">{{formatTime(itemData.updateTime)}}</span>
                                </el-card>
                            </div>
                            <div v-show="theUserList.length>=5"
                                 style="width: 100%;display: flex;flex-direction: row;justify-content: center;padding-top: 10px;">
                                <el-link class="dTextColor">更多...</el-link>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>
<script>

    import myFooter from '../../common_component/foot/footer'
    import myUser from '../../common_component/user/myUser'
    import {queryStarCount, queryUserInfo} from '../../../api/user'
    import {queryBookByUser2, queryBookByUserIdAndBookId, queryBookByUserParams2} from "~/api/book";
    import {formatTime} from '../../../utils/formatUtils'

    export default {
        components: {myFooter, myUser},
        name: "detail",
        data() {
            return {
                showHeadK: false,
                showHead: false,
                imgSrc: require('../../../res/img/user_center.png'),
                loading: false,
                id: "",
                mdValue: "12312313wqeqeqeq",
                detailInfo: {},
                bkUserInfo: {},
                startCount: 0,
                bookCount: 0,
                theUserList: [],
                loadingTheUserList: true,
            }
        },
        created() {
            this.id = this.$route.params.id;
            console.log("====> detail id === ", this.id);
            this.queryBookDetail(this.id);
        },
        methods: {
            itemBookListClick(itemData) {
                if (this.detailInfo.bookId !== itemData.bookId) {
                    this.changeMax();
                    this.detailInfo = {};
                    this.id = itemData.bookId;
                    this.queryBookDetail(itemData.bookId);
                }
            },
            formatTime,
            changeMax() {
                this.showHeadK = false;
                setTimeout(() => {
                    this.showHead = true;
                }, 300);
            },
            changeMin() {
                setTimeout(() => {
                    this.showHeadK = true;
                }, 300);
                this.showHead = false;
            },
            async queryBookDetail(id) {
                this.loading = true;
                await queryBookByUserIdAndBookId({"bookId": id}).then(detail => {
                    console.log("queryBookByUserIdAndBookId data ===> ", detail.data.data);
                    let userId = detail.data.data.userId;
                    this.queryByUserInfo(userId);
                    this.queryStarCountMt(userId);
                    this.queryBookCount(userId);
                    this.detailInfo = detail.data.data;
                }).catch(error => {
                    this.loading = false;
                })
            },
            async queryByUserInfo(id) {
                await queryUserInfo({'userId': id}).then(info => {
                    console.log("data ===> ", info.data.data);
                    this.bkUserInfo = info.data.data;
                    this.loading = false;
                    this.showHead = true;
                }).catch(() => {
                    this.loading = false;
                });
            },
            async queryStarCountMt(id) {
                await queryStarCount({'userId': id}).then(data => {
                    this.startCount = data.data.data;
                }).catch(() => {
                    console.log("start error")
                });
            },
            async queryBookCount(id) {
                let params = queryBookByUserParams2(id, "", 2, 1, 5);
                await queryBookByUser2(params).then(data => {
                    this.loadingTheUserList = false;
                    this.theUserList = data.data.data.lists;
                    this.bookCount = data.data.data.totalCount;
                }).catch(error => {
                    this.loadingTheUserList = false;
                })
            },
            loadTag(val) {
                if (null === val || "" === val || undefined === val) {
                    return ["暂无标签"]
                }
                return val.split(",");
            },
            goHome() {
                this.$router.push('/')
            }
        }
    }
</script>
<style>
    .allListDescriptions {
        max-lines: 2;
        max-height: 4.5vh;
        display: -webkit-box;
        text-overflow: ellipsis;
        width: 10vw;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        word-break: break-all;
    }

    .hdh {
        width: 12vw;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .hdhs {
        width: 4vw;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .showH {
        width: 96%;
        height: 98%;
        margin-left: 4%;
        margin-top: 1%;
    }

    .hidH {
        width: 90%;
        height: 98%;
        margin-left: 9%;
        margin-top: 1%;
    }

    .dTextColor {
        color: #909399;
        font-size: 13px;
    }

    .textD {
        font-size: 15px;
        color: #606266;
    }

    .popo {
        width: 88vw;
        height: 100%;
    }

    .popoH {
        width: 96vw;
        height: 100%;
    }

    .kLKL {
        width: 12vw;
        height: 100%;
        display: flex;
        flex-direction: row-reverse;
    }

    .kLKLH {
        width: 4vw;
        height: 100%;
        display: flex;
        flex-direction: row-reverse;
    }

    .titlesDetail {
        margin-left: 1.1vw;
        width: 57.7vw;
        max-lines: 2;
        max-height: 5vh;
        display: -webkit-box;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        word-break: break-all;
    }

    .editTopDetail2 {
        width: 100vw;
        height: 9vh;
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: white;
    }

    .editContentDetail {
        width: 100%;
        height: 89.1vh;
        display: flex;
        flex-direction: row;
        margin-top: -10px;
    }

    .logoIconDetail {
        max-height: 4.5vh;
        margin-top: 0.4vh;
    }

    .editLogDetail {
        margin-left: 8vw;
    }
</style>