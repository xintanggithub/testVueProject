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
                <my-user></my-user>
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
    import myUser from './common_component/user/myUser'

    export default {
        components: {myFooter, myUser},
        name: 'home',
        data() {
            return {
                defaultIndexValue: "1",
                activeIndex: '1',
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                if (keyPath[0] === this.defaultIndexValue) {
                    return
                }
                this.defaultIndexValue = keyPath[0];
                switch (keyPath[0]) {
                    case "1":
                        this.$router.push({name: 'homeContent'});
                        break;
                    case "2":
                        this.$router.push({name: 'game'});
                        break;
                    case "3":
                        this.$router.push({name: 'book'});
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
        height: 9vh;
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