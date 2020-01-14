<template>
    <div class="user">
        <el-avatar :src="loginInfo.img">
            <img :src="require('../../../res/img/user_center.png')"/>
        </el-avatar>
        <!--<img v-show="loginStatusValue"-->
        <!--:src="imgSrc"-->
        <!--@click="goMine"-->
        <!--:onload="loadImg(loginInfo.img)"-->
        <!--class="userImg"/>-->
        <div v-show="loginStatusValue" style="display: flex;flex-direction: column;">
            <div class="nameStyle">{{loginInfo.userName}}</div>
            <div style="margin-left: 1vw;">
                <el-button @click="goMine" type="text" size="mini">个人中心</el-button>
                <el-button v-show="hideLoginOut===false" @click="loginOutMt" type="text" size="mini">退出</el-button>
            </div>
        </div>
        <div v-show="loginStatusValue===false" class="loginDiv">
            <el-button @click="login" type="text" size="mini">登录</el-button>
        </div>
    </div>
</template>
<script>
    import {getLoginInfo, loginOut, loginStatus} from '../../../utils/loginStatus'

    export default {
        name: 'myUser',
        data() {
            return {
                loginStatusValue: false,
                imgSrc: require('../../../res/img/user_center.png'),
                loginInfo: {
                    userName: '',
                    id: '',
                    img: ''
                },
            }
        },
        methods: {
            goMine() {
                this.$router.push("/mine")
            },
            loadImg($img) {
                return 'this.οnlοad=null;this.src=' + '"' + $img + '";';
            },
            loginOutMt() {
                loginOut();
                this.loginInfo.img = "http:hhh/empty";
                this.loginStatusValue = loginStatus();
            },
            login() {
                this.$router.push({name: 'login'});
            }
        },
        created() {
            let loginStatusValue = loginStatus();
            if (loginStatusValue) {
                let response = getLoginInfo();
                this.loginInfo.userName = response['name'];
                this.loginInfo.id = response['id'];
                this.loginInfo.img = response['img'];
            }
            console.log("response --->", this.loginInfo);
            this.loginStatusValue = loginStatusValue
        },
        props: {
            hideLoginOut: {
                type: Boolean,
                default: false
            }
        }
    }

</script>
<style>
    .loginDiv {
        width: 3vw;
        height: auto;
        display: flex;
        flex-direction: row-reverse;
    }

    .user {
        width: 12vw;
        height: auto;
        position: absolute;
        z-index: 99;
        margin-left: 77vw;
        display: flex;
        flex-direction: row;
    }

    .userImg {
        height: 4.5vh;
        width: 4.5vh;
        border-radius: 50%;
        justify-content: center;
        cursor: pointer;
    }

    .nameStyle {
        color: #303133;
        font-size: 13px;
        margin-left: 1vw;
    }
</style>