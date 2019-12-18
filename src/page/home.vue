<template>
    <div>
        <!-- tab -->
        <div class="tabDivStyle">
            <div class="tabMasterStyle">
                <div style="position: absolute;z-index: 98;">
                    <el-menu class="elMenuStyle" :default-active="activeIndex" mode="horizontal"
                             @select="handleSelect"
                             background-color="#fff"
                             text-color="#000"
                             active-text-color="#E6A23C">
                        <el-menu-item index="1">首页</el-menu-item>
                        <el-menu-item index="2">处理中心2</el-menu-item>
                        <el-menu-item index="3">处理中心3</el-menu-item>
                    </el-menu>
                </div>
                <div class="logo">
                    <img src="../res/img/logo_icon.png" class="logoIcon"/>
                </div>
                <div class="user">
                    <img src="../res/img/header.png" class="userImg"/>
                </div>
            </div>
        </div>
        <!--content-->
        <div class="contentDiv">
            <router-view></router-view>
        </div>
        <my-footer></my-footer>
    </div>
</template>
<script>
    import myFooter from './common_component/foot/footer'

    export default {
        components: {myFooter},
        name: 'home',
        data() {
            return {
                activeIndex: '1',
            }
        },
        methods: {
            goLogin: function () {
                this.$router.push({name: 'login'})
            },
            goGame: function () {
                this.$router.push({name: 'game'})
            },
            goBook: function () {
                this.$router.push({name: 'book'})
            },
            handleSelect(key, keyPath) {
                switch (keyPath) {
                    case "1":
                        this.$router.push({name: 'homeContent'});
                        break;
                    case "2":
                        break;
                    case "3":
                        break;
                }
                console.log(key, keyPath);
            }
        }
    }
</script>
<style>
    .contentDiv {
        min-height: 90vh;
        width: 100vw;
        margin-top: 7vh;
    }

    .userImg {
        max-height: 4.5vh;
        border-radius: 50%;
    }

    .user {
        width: 18vw;
        height: auto;
        position: absolute;
        z-index: 99;
        background-color: aqua;
        margin-left: 72vw;
    }

    .logoIcon {
        max-height: 4.5vh;
        margin-top: 0.4vh;
    }

    .logo {
        width: auto;
        height: auto;
        position: absolute;
        z-index: 99;
        margin-left: 8vw;
    }

    .tabMasterStyle {
        position: relative;
        height: auto;
        display: flex;
        align-items: center;
    }

    .tabDivStyle {
        width: 100vw;
        height: 7vh;
        display: flex;
        flex-direction: row;
        position: fixed;
        left: 0;
        top: 0;
    }

    .elMenuStyle {
        width: 100vw;
        padding-left: 18vw;
    }
</style>