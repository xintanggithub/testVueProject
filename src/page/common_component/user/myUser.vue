<template>
    <div class="user">
        <img v-show="loginStatusValue"
             :src="imgSrc"
             :onload="loadImg(loginInfo.img)"
             class="userImg"/>
        <!--loginInfo.img-->
        <div v-show="loginStatusValue" style="display: flex;flex-direction: column;">
            <div class="nameStyle">{{loginInfo.userName}}</div>
            <div style="margin-left: 1vw;">
                <el-button type="text" size="mini">个人中心</el-button>
                <el-button @click="loginOutMt" type="text" size="mini">退出</el-button>
            </div>
        </div>
        <div v-show="loginStatusValue===false"
             style=" width: 18vw;height: auto;display: flex;flex-direction: row-reverse;">
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
            loadImg($img) {
                return 'this.οnlοad=null;this.src=' + '"' + $img + '";';
            },
            loginOutMt() {
                loginOut();
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
        }
    }

</script>
<style>
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