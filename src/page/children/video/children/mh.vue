<template>
    <div class="mh_root">
        <el-card shadow="always" class="mh_content">

        </el-card>
        <div class="mg_tag_root">
            <el-tag class="tag_top"
                    v-for="(tag,index)  in tags"
                    :key="tag.title"
                    @click="tagClick(tag,index)"
                    :type="tag.type">
                {{tag.title}}{{indexD===index?'◆':''}}
            </el-tag>

        </div>
    </div>
</template>
<script>

    export default {
        name: 'mh',
        inject: ['changeIndex'],
        data() {
            return {
                indexD: 0,
                tags: [
                    {title: "　全部　", value: "qb", type: "info"},
                    {title: "少年热血", value: "shaonianrexue", type: "danger"},
                    {title: "武侠格斗", value: "wuxiagedou", type: "warning"},
                    {title: "恐怖灵异", value: "kongbulingyi", type: "success"},
                    {title: "耽美人生", value: "danmeirensheng", type: "danger"},
                    {title: "少女爱情", value: "shaonvaiqing", type: "warning"},
                    {title: "恋爱生活", value: "lianaishenghuo", type: "warning"},
                    {title: "生活漫画", value: "shenghuomanhua", type: "success"},
                    {title: "科幻魔幻", value: "kehuanmohuan", type: "success"},
                    {title: "竞技体育", value: "jingjitiyu", type: "success"},
                    {title: "爆笑喜剧", value: "baoxiaoxiju", type: "warning"},
                    {title: "侦探推理", value: "zhentantuili", type: "success"},
                    {title: "最新更新", value: "new", type: "success"},
                    {title: "热门排行", value: "hot", type: "success"},
                    {title: "已完结　", value: "wanjie", type: "danger"},
                    {title: "连载中　", value: "lianzai", type: "danger"},
                    {title: "国产漫画", value: "guochan", type: "info"},
                    {title: "日韩漫画", value: "rihan", type: "danger"},
                    {title: "港台漫画", value: "gangtai", type: "success"},
                    {title: "欧美漫画", value: "omei", type: "success"}
                ]
            }
        },
        mounted() {
            this.changeIndexMt();
        },
        methods: {
            changeIndexMt() {
                this.changeIndex(1)
            },
            tagClick(tag, index) {
                this.indexD = index;
                console.log("click tag ====>", tag)
            },
        }
    }

</script>
<style>
    .mh_root {
        display: flex;
        flex-direction: row;
        width: 91vw;
    }

    .mh_content {
        width: 84vw;
        height: 86vh;
    }

    .mg_tag_root {
        width: 7vw;
        height: 80vh;
        margin-left: -1vw;
        margin-top: 4vh;
    }

    .tag_top {
        margin-top: 0.5vh;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        cursor: pointer;
    }

</style>