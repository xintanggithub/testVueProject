<template>
    <div>
        <div class="editTopDetail2">
            <div class="editLogDetail" @click="goHome">
                <img src="../../../res/img/logo_icon.png" class="logoIconDetail"/>
            </div>
            <div class="titlesDetail">
                <span style="font-size: 18px;color: black;">标题：001</span>
            </div>
            <my-user hideLoginOut></my-user>
        </div>
        <div class="editContentDetail" v-loading="loading">
            <div class="kLKL">
                <div style="display: flex;flex-direction: column;width: 12vw;background-color: beige;">
                    <el-avatar shape="square" :size="100" :src="bkUserInfo.img">
                        <img :src="imgSrc"/>
                    </el-avatar>
                    <span class="textD">{{bkUserInfo.userName}}</span>
                    <span class="dTextColor">被赞:{{startCount}}</span>
                    <span class="dTextColor">笔记:{{bookCount}}</span>
                </div>
            </div>
            <div class="popo">

            </div>
        </div>
        <!--<mavon-editor :value="mdValue" :subfield="false" :defaultOpen="'preview'" :toolbarsFlag="false"-->
        <!--:editable="false" :scrollStyle="true" :ishljs="true"></mavon-editor>-->
        <my-footer></my-footer>
    </div>
</template>
<script>

    import myFooter from '../../common_component/foot/footer'
    import myUser from '../../common_component/user/myUser'
    import {queryStarCount, queryUserInfo} from '../../../api/user'
    import {queryBookByUser2, queryBookByUserIdAndBookId, queryBookByUserParams2} from "~/api/book";

    export default {
        components: {myFooter, myUser},
        name: "detail",
        data() {
            return {
                imgSrc: require('../../../res/img/user_center.png'),
                loading: false,
                id: "",
                mdValue: "12312313wqeqeqeq",
                detailInfo: {},
                bkUserInfo: {},
                startCount: 0,
                bookCount: 0,
            }
        },
        created() {
            this.id = this.$route.params.id;
            console.log("====> detail id === ", this.id);
            this.queryBookDetail(this.id);
        },
        methods: {
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
                let params = queryBookByUserParams2(id, "", 2, 1, 1);
                await queryBookByUser2(params).then(data => {
                    this.bookCount = data.data.data.totalCount;
                })
            },
            goHome() {
                this.$router.push('/')
            }
        }
    }
</script>
<style>
    .dTextColor {
        color: #909399;
    }

    .textD {
        color: #606266;
    }

    .popo {
        width: 84vw;
        height: 100%;
    }

    .kLKL {
        width: 16vw;
        height: 100%;
        display: flex;
        flex-direction: row-reverse;
    }

    .titlesDetail {
        margin-left: 3.7vw;
        width: 55vw;
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