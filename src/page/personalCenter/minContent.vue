<template>
    <div v-loading="loading">
        <div style="width: 84vw;margin-left: 8vw;padding-top: 4vh;">
            <div style="width: 100%;height: 81vh;box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.07);background-color: white;border-radius: 5px;">
                <!--head-->
                <div class="topDiv">
                    <div style="height: auto;">
                        <el-card shadow="hover" style="margin-left: 4.5vw;width:22vw;">
                            <div style="display: flex;flex-direction: row;height: 20vh;">
                                <img :src="userInfo.img" class="headD"/>
                                <div style="height: 20vh;display: flex;flex-direction: column;padding-left: 2vw;">
                                    <div style="width: 6.8vw;display: flex;flex-direction: row-reverse;">
                                        <el-button icon="el-icon-edit" circle></el-button>
                                    </div>
                                    <div style="height: 16vh;display: flex;flex-direction: column-reverse;font-size: 13px;"
                                         class="textColor">
                                        <div style="margin-top: 1vh;">
                                            点赞：9999
                                        </div>
                                        <div>
                                            笔记：9999
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </el-card>
                        <!--content-->
                        <div style="height:40vh;width:25vw;margin-left: 6vh;display: flex;flex-direction: column;margin-top: 3vh;">
                            <span style="margin-left: 1.5vw;">历史记录：</span>
                            <el-timeline style="margin-top: 1vh;margin-left:-1vw;width: 21vw;" reverse="false">
                                <el-timeline-item
                                        v-for="(history, index) in historyList"
                                        :key="index">
                                    <el-card shadow="hover">
                                        <el-tag effect="plain" size="mini">{{history.type}}</el-tag>
                                        <el-link type="info">{{history.name}}</el-link>
                                        <br/>
                                        <span class="textColor margin1">{{formatTime(history.updateTime)}}</span>
                                    </el-card>
                                </el-timeline-item>
                            </el-timeline>
                            <div v-show="historyList.length>=3" class="textColor"
                                 style="justify-content: center;display: flex;flex-direction: row;">
                                <el-link type="info">更多历史 <i class="el-icon-arrow-down"></i></el-link>
                            </div>
                        </div>
                    </div>
                    <div class="titleD" style="width: 63%;">
                        <el-card shadow="hover">
                            <div class="titleStyle" style="width: 100%;">
                                <span class="rTitle">昵称：</span>
                                <span class="names">{{userData.userName}}</span>
                            </div>
                            <div class="titleStyle titleMarginTop">
                                <span class="rTitle">性别：</span>
                                <span class="LStyle">{{userData.sex===1?'男':'女'}}</span>
                            </div>
                        </el-card>
                        <el-card shadow="hover" class="titleMarginTop3">
                            <div class="titleStyle titleMarginTop">
                                <span class="rTitle">账号：</span>
                                <span class="LStyle">{{userInfo.userCode}}</span>
                            </div>
                            <div class="titleStyle titleMarginTop">
                                <span class="rTitle">用户ID：</span>
                                <span class="LStyle">{{userInfo.id}}</span>
                            </div>
                            <div class="titleStyle titleMarginTop">
                                <span class="rTitle">电话：</span>
                                <span class="LStyle">{{userData.tel}}</span>
                            </div>
                            <div class="titleStyle titleMarginTop">
                                <span class="rTitle">注册时间：</span>
                                <span class="LStyle">{{userData.createTime}}</span>
                            </div>
                        </el-card>
                        <el-card shadow="hover" class="titleMarginTop3">
                            <div class="titleStyle titleMarginTop">
                                <span class="rTitle">省：</span>
                                <span class="LStyle">{{userData.province}}</span>
                            </div>
                            <div class="titleStyle titleMarginTop">
                                <span class="rTitle">城市：</span>
                                <span class="LStyle">{{userData.city}}</span>
                            </div>
                            <div class="titleStyle titleMarginTop">
                                <span class="rTitle">区域：</span>
                                <span class="LStyle">{{userData.area}}</span>
                            </div>
                            <div class="titleStyle titleMarginTop">
                                <span class="rTitle">详细地址：</span>
                                <span class="LStyle">{{userData.address}}</span>
                            </div>
                        </el-card>
                        <el-card shadow="hover" class="titleMarginTop3" style="height: 15vh;">
                            <div class="titleStyle">
                                <span class="rTitle">个人简介：</span>
                            </div>
                        </el-card>
                        <div style="padding-right: 3vh;padding-bottom: 1vh;padding-top: 1vh;">
                            <span class="LStyle">{{userData.description}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {getLoginInfo, setUserName} from '../../utils/loginStatus'
    import {queryUserInfo} from '../../api/login'
    import {formatTime} from '../../utils/formatUtils'

    export default {
        name: 'minContent',
        data() {
            return {
                loading: false,
                userInfo: {},
                userData: {},
                historyList: [{
                    type: "类型1",
                    updateTime: 1578466191000,
                    name: "记录1"
                }, {
                    type: "类型2",
                    updateTime: 1578466191000,
                    name: "记录2"
                }, {
                    type: "类型3",
                    updateTime: 1578466191000,
                    name: "记录3"
                },]
            }
        },
        created() {
            this.userInfo = getLoginInfo();
            console.log('userInfo ===>', this.userInfo);
            this.queryUserInfoMt();
        },
        methods: {
            formatTime,
            async queryUserInfoMt() {
                this.loading = true;
                await queryUserInfo({'userId': this.userInfo.id}).then(info => {
                    this.loading = false;
                    console.log("queryUserInfo success ===>", info.data.data);
                    this.userData = info.data.data;
                    setUserName(info.data.data.userName)
                }).catch(() => {
                    this.loading = false;
                });
            }
        }
    }

</script>
<style>

    .topDiv {
        padding-top: 6vh;
        display: flex;
        flex-direction: row;
    }

    .headD1 {
        width: 22.1vh;
        height: 22.1vh;
        margin-left: 4.5vw;
        border-radius: 50%;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }

    .headD {
        width: 20vh;
        height: 20vh;
        border-radius: 50%;
    }

    .titleD {
        display: flex;
        flex-direction: column;
    }

    .names {
        font-size: 1.4rem;
        color: #606266;
    }

    .rTitle {
        font-size: 0.9rem;
    }

    .LStyle {
        font-size: 1rem;
        color: #909399;
    }

    .textColor {
        color: #909399;
    }

    .margin1 {
        margin-top: 0.5vh;
        margin-left: 2px;
    }

    .titleMarginTop {
        margin-top: 1vh;
    }

    .titleMarginTop3 {
        margin-top: 3vh;
    }

    .titleStyle {
        display: flex;
        flex-direction: row;
        align-items: center
    }

</style>