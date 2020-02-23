<template>
    <div>
        <div class="tabDivStyle">
            <div class="tabMasterStyle">
                <div style="position: absolute;z-index: 98;">
                    <el-menu class="elMenuStyle" :default-active="defaultIndex" mode="horizontal"
                             @select="handleSelectPC"
                             background-color="#fff"
                             text-color="#000"
                             active-text-color="#E6A23C">
                        <el-menu-item index="11">首页</el-menu-item>
                        <el-menu-item index="22">个人中心</el-menu-item>
                        <el-menu-item index="33">其他</el-menu-item>
                    </el-menu>
                </div>
                <div class="logo">
                    <img @click="goHome" src="../../res/img/logo_icon.png" class="logoIconPC"/>
                </div>
            </div>
        </div>
        <div class="contentDivPC">
            <router-view></router-view>
        </div>
        <my-footer></my-footer>
    </div>
</template>
<script>
    import myFooter from '../common_component/foot/footer'

    export default {
        components: {myFooter},
        name: 'mine',
        provide() {
            return {
                changeIndex33: this.changeIndex33,
                changeIndex22: this.changeIndex22,
            }
        },
        data() {
            return {
                currentIndex: '22',
                defaultIndex: '22',
            }
        },
        created() {
        },
        methods: {
            changeIndex33() {
                this.handleSelectPC("33", ["33"]);
            },
            changeIndex22() {
                this.handleSelectPC("22", ["22"]);
            },
            handleSelectPC(key, keyPath) {
                if (keyPath[0] === this.currentIndex) {
                    return
                }
                this.currentIndex = keyPath[0];
                switch (keyPath[0]) {
                    case "11":
                        this.goHome();
                        break;
                    case "22":
                        this.$router.push('/mine/minContent');
                        break;
                    case "33":
                        this.$router.push({
                            path: '/mine/setting',
                            query: {
                                key: "collectionIndex",
                                msgKey: '0'
                            }
                        });
                        break;
                }
                this.defaultIndex = key + "";
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
        height: 9vh;
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