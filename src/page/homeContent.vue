<template>
    <div style="display: flex;flex-direction: column;padding-top: 5vh; width:100vw;height: auto;max-height: 88vh;overflow-y: auto;background-color: antiquewhite;">
        <div style="padding-left: 0.5vw;padding-right: 0.5vw;">
            <el-carousel :interval="4000" type="card" height="40vh">
                <el-carousel-item v-for="item in topList" :key="item">
                    <div v-html="item.content">
                        {{item.content}}
                    </div>
                </el-carousel-item>
            </el-carousel>
            <div style="display: flex;flex-direction: row;justify-content: center;margin-top: 5vh;width: 100%;">
                <el-card class="item_card" shadow="hover">

                </el-card>
                <el-card class="item_card mg_left" shadow="hover">

                </el-card>
                <el-card class="item_card mg_left" shadow="hover">

                </el-card>
            </div>
            <div style="display: flex;flex-direction: row;justify-content: center;margin-top: 5vh;width: 100%;">
                <el-card class="item_card" shadow="hover">

                </el-card>
                <el-card class="item_card mg_left" shadow="hover">

                </el-card>
                <el-card class="item_card mg_left" shadow="hover">

                </el-card>
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        name: 'homeContent',
        data() {
            return {
                topList: [{}]
            }
        },
        methods: {}
    }
</script>
<style>
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    .item_card {
        width: 25vw;
        height: 30vh;
    }

    .mg_left {
        margin-left: 5vw;
    }
</style>