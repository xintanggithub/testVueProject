<template>
    <div>
        <div class="tabDivStyle">
            <div class="tabMasterStyle">
                <div style="position: absolute;z-index: 98;">
                    <el-menu class="elMenuStyle" :default-active="activeIndex" mode="horizontal"
                             @select="handleSelectPC"
                             background-color="#fff"
                             text-color="#000"
                             active-text-color="#E6A23C">
                        <el-menu-item index="1">首页</el-menu-item>
                    </el-menu>
                </div>
                <div class="logo">
                    <img @click="goHome" src="../../res/img/logo_icon.png" class="logoIconPC"/>
                </div>
            </div>
        </div>
        <div class="contentDivPC">

        </div>
        <my-footer></my-footer>
    </div>
</template>
<script>
    import myFooter from '../common_component/foot/footer'

    export default {
        components: {myFooter},
        name: 'mine',
        data() {
            return {}
        },
        created() {
        },
        methods: {
            handleSelectPC(key, keyPath) {
                switch (keyPath[0]) {
                    case "1":
                        this.goHome();
                        break;
                }
            },
            goHome() {
                this.$router.push('/')
            }
        }
    }
</script>
<style>
    .contentDivPC {
        min-height: 90vh;
        width: 100vw;
        margin-top: 7vh;
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

    .logoIconPC {
        max-height: 4.5vh;
        margin-top: 0.4vh;
        cursor: pointer;
    }

    .elMenuStyle {
        width: 100vw;
        padding-left: 18vw;
    }

    .tabMasterStyle {
        position: relative;
        height: auto;
        display: flex;
        align-items: center;
    }

    .logo {
        width: auto;
        height: auto;
        position: absolute;
        z-index: 99;
        margin-left: 8vw;
    }
</style>