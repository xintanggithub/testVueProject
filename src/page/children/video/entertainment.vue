<template>
    <div class="etRoot">
        <div style="width: 8vw;">
            <div class="et_search_rt">
                <el-button icon="el-icon-search" class="et_search_bt" circle @click="search"></el-button>
            </div>
            <el-menu :default-active="activeIndex" mode="vertical" @select="handleSelect" background-color="#fff"
                     text-color="#000" active-text-color="#E6A23C" class="et_rt_tab">
                <el-menu-item index="1">漫画</el-menu-item>
                <el-menu-item index="2">小说</el-menu-item>
            </el-menu>
        </div>
        <div class="et_ct_rt">
            <transition :name="direction">
                <router-view class="appView"></router-view>
            </transition>
        </div>
    </div>
</template>
<script>

    export default {
        name: 'et',
        provide() {
            return {
                changeIndex: this.changeIndex,
            }
        },
        data() {
            return {
                direction: "slide-right",
                defaultIndexValue: "1",
                activeIndex: '1',
                scIndex: -1,
            }
        },
        mounted() {
        },
        methods: {
            changeIndex(val) {
                this.handleSelect("" + val, ["" + val]);
            },
            handleSelect(key, keyPath) {
                this.scIndex = -1;
                if (keyPath[0] === this.defaultIndexValue) {
                    return
                }
                this.defaultIndexValue = keyPath[0];
                switch (keyPath[0]) {
                    case "1":
                        this.$router.push({name: 'mh'});
                        break;
                    case "2":
                        this.$router.push({name: 'xs'});
                        break;
                }
                this.activeIndex = key + "";
                console.log(key, keyPath);
            },
            search() {
                this.defaultIndexValue = '0';
                switch (this.activeIndex) {
                    case "1":
                        if (this.scIndex === 1) {
                            return
                        }
                        this.$router.push({name: 'mhsc'});
                        this.scIndex = 1;
                        break;
                    case "2":
                        if (this.scIndex === 2) {
                            return
                        }
                        this.$router.push({name: 'xssc'});
                        this.scIndex = 2;
                        break;
                }
            },
        }
    }

</script>
<style>
    .etRoot {
        height: 90vh;
        width: 100vw;
        padding-top: 0.8vh;
        display: flex;
        flex-direction: row;
    }

    .et_rt_tab {
        width: 4vw;
        height: auto;
        margin-top: 2vh;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        margin-left: 4vw;
        position: absolute;
    }

    .et_ct_rt {
        width: 90vw;
        margin-top: 1.4vh;
        height: 86vh;
    }

    .et_search_rt {
        width: 7.8vw;
        display: flex;
        flex-direction: row-reverse;
        margin-top: 3vh;
    }

    .et_search_bt {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }

    .appView {
        position: absolute;
        width: 100%;
        transition: transform 0.3s ease-out;
    }

    .slide-right-enter {
        transform: translate(-90%, 0);
    }

    .slide-right-leave-active {
        transform: translate(100%, 0);
    }

</style>