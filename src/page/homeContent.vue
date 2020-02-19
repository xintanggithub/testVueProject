<template>
    <div class="top_root">
        <div class="top_child">
            <el-carousel :interval="interval" type="card" height="40vh">
                <el-carousel-item v-for="item in topList" :key="item">
                    <div v-html="item.content">{{item.content}}</div>
                </el-carousel-item>
            </el-carousel>
            <div class="top_menu">
                <el-card @click.native="cardOne" class="item_card" shadow="hover">
                    <div class="kl1">
                        <div class="kl2">
                            <div class="kl3">
                                <img class="img_st" src="../assets/hp/books.png">
                            </div>
                            <div class="kl4">
                                <div class="text_color" style="width: auto;">
                                    支持主流的Markdown、富文本格式
                                </div>
                                <div class="text_color" style="width: auto;">
                                    提供共享、私密发布
                                </div>
                            </div>
                        </div>
                    </div>
                </el-card>
                <el-card @click.native="cardTwo" class="item_card mg_left" shadow="hover">
                    <div class="kl1">
                        <div class="kl2">
                            <div class="kl3">
                                <img class="img_st" src="../assets/hp/browser-games.png">
                            </div>
                            <div class="kl4">
                                <div class="text_color" style="width: auto;">
                                    休闲、趣味、轻量的玩儿法
                                </div>
                                <div class="text_color" style="width: auto;">
                                    还可以共享你觉得好玩儿有趣小游戏
                                </div>
                            </div>
                        </div>
                    </div>
                </el-card>
                <el-card @click.native="cardThree" class="item_card mg_left" shadow="hover">
                    <div class="kl1">
                        <div class="kl2">
                            <div class="kl3">
                                <img class="img_st" src="../assets/hp/other.png">
                            </div>
                            <div class="kl4">
                                <div class="text_color" style="width: auto;">
                                    主站推荐，好玩儿、好看、有趣的
                                </div>
                                <div class="text_color" style="width: auto;">
                                    没有喜欢的？也可上传推荐哦
                                </div>
                            </div>
                        </div>
                    </div>
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
                topList: [{}, {}, {}],
                interval: 4000,
            }
        },
        methods: {
            cardOne() {
                this.$router.push({name: 'book'});
            },
            cardTwo() {
                this.$router.push({name: 'game'});
            },
            cardThree() {
            },
        }
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

    .top_root {
        display: flex;
        flex-direction: column;
        padding-top: 5vh;
        width: 100vw;
        height: auto;
        max-height: 88vh;
        overflow-y: auto;
    }

    .top_child {
        padding-left: 0.5vw;
        padding-right: 0.5vw;
    }

    .top_menu {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 5vh;
        width: 100%;
    }

    .img_st {
        width: 5vw;
    }

    .text_color {
        color: #909399;
    }

    .kl1 {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .kl2 {
        width: auto;
        height: 26vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .kl3 {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .kl4 {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 3vh;
    }
</style>