<template>
    <div class="etRoot">
        <div style="width: 8vw;">
            <el-menu :default-active="activeIndex" mode="vertical" @select="handleSelect" background-color="#fff"
                     text-color="#000" active-text-color="#E6A23C" style="width: 8vw;height: auto;margin-top: 1.4vh;">
                <el-menu-item index="1">　　　漫画</el-menu-item>
                <el-menu-item index="2">　　　小说</el-menu-item>
            </el-menu>
        </div>
        <el-card shadow="hover" style="width: 84vw;margin-top: 1.4vh;height: 86vh;">
            <router-view></router-view>
        </el-card>
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
                defaultIndexValue: "1",
                activeIndex: '1',
            }
        },
        mounted() {
        },
        methods: {
            changeIndex(val) {
                this.handleSelect("" + val, ["" + val]);
            },
            handleSelect(key, keyPath) {
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
            }
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

</style>