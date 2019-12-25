<template>
    <div v-loading="loading">
        <div style="width: 84vw;margin-left: 8vw;padding-top: 4vh;">
            <div style="width: 100%;height: 81vh;box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.07);background-color: white;border-radius: 5px;">
                <!--head-->
                <div class="topDiv">
                    <div style="height: auto;">
                        <div style="display: flex;flex-direction: row;height: 22vh;">
                            <img :src="userInfo.img" class="headD"/>
                            <div style="height: 22vh;display: flex;flex-direction: column;padding-left: 2vw;background-color: antiquewhite;">
                                <el-button>编辑头像</el-button>
                                <el-button>被赞：999</el-button>
                            </div>
                        </div>
                        <!--content-->
                        <div style="height:40vh;width:25vw;margin-left: 6vh;display: flex;flex-direction: column;margin-top: 6vh;background-color: antiquewhite;">
                            123123
                        </div>
                    </div>
                    <div class="titleD">
                        <div class="titleStyle">
                            <span class="rTitle">昵称：</span>
                            <span class="names">{{userData.userName}}</span>
                        </div>
                        <div class="titleStyle titleMarginTop">
                            <span class="rTitle">性别：</span>
                            <span class="LStyle">{{userData.sex===1?'男':'女'}}</span>
                        </div>
                        <div class="titleStyle titleMarginTop3">
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
                        <div class="titleStyle titleMarginTop3">
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
                        <div class="titleStyle titleMarginTop3">
                            <span class="rTitle">个人简介：</span>
                        </div>
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

    export default {
        name: 'minContent',
        data() {
            return {
                loading: false,
                userInfo: {},
                userData: {}
            }
        },
        created() {
            this.userInfo = getLoginInfo();
            console.log('userInfo ===>', this.userInfo);
            this.queryUserInfoMt();
        },
        methods: {
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

    .headD {
        width: 22vh;
        height: 22vh;
        margin-left: 5vw;
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

    .titleMarginTop {
        margin-top: 1vh;
    }

    .titleMarginTop3 {
        margin-top: 4vh;
    }

    .titleStyle {
        display: flex;
        flex-direction: row;
        align-items: center
    }

</style>