<template>
    <div class="st_menu">
        <el-menu :default-active="activeIndex" mode="vertical" @select="handleSelect" background-color="#fff"
                 text-color="#000" active-text-color="#E6A23C" style="width: 10vw;height: 89vh;margin-top: 1vh;">
            <el-menu-item index="1">　　　收藏</el-menu-item>
            <el-menu-item index="2">　　　是的</el-menu-item>
        </el-menu>
        <!--content-->
        <div class="st_content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'setting',
        inject: ['changeIndex33'],
        provide() {
            return {
                changeStOne: this.changeStOne,
                changeStTwo: this.changeStTwo
            }
        },
        data() {
            return {
                tabPosition: 'left',
                defaultIndexValue: "1",
                activeIndex: '1',
            }
        },
        mounted() {
            this.changeIndexThree();
        },
        methods: {
            changeStOne() {
                this.handleSelect("1", ["1"])
            },
            changeStTwo() {
                this.handleSelect("2", ["2"])
            },
            changeIndexThree() {
                this.changeIndex33();
            },
            handleSelect(key, keyPath) {
                if (keyPath[0] === this.defaultIndexValue) {
                    return
                }
                this.defaultIndexValue = keyPath[0];
                switch (keyPath[0]) {
                    case "1":
                        this.$router.push({name: 'collection'});
                        break;
                    case "2":
                        this.$router.push({name: 'changePassword'});
                        break;
                }
                this.activeIndex = key + "";
                console.log(key, keyPath);
            }
        }
    }

</script>
<style>
    .st_content {
        width: 85vw;
        height: 89vh;
        margin-top: 1vh;
    }

    .st_menu {
        display: flex;
        flex-direction: row;
    }

</style>