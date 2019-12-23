<template>
    <div v-loading="loading">
        <div style="width: 84vw;height:20vh;margin-left: 8vw;">
            <img :src="userInfo.img" style="width: 18vh;height: 18vh;border-radius: 50%;margin-top: 2vh;">
        </div>
        <el-card shadow="hover" class="contentCard account">
            基本信息
        </el-card>
        <el-card shadow="hover" class="contentCard userInfo">
            个人信息
        </el-card>
    </div>
</template>
<script>
    import {getLoginInfo,} from '../../utils/loginStatus'
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
                }).catch(() => {
                    this.loading = false;
                });
            }
        }
    }

</script>
<style>
    .contentCard {
        width: 84vw;
        margin-left: 8vw;
        background-color: white;
        border-radius: 10px;
    }

    .account {
        margin-top: 3vh;
        height: 10vh;
    }

    .userInfo {
        margin-top: 5vh;
        height: 40vh;
    }
</style>