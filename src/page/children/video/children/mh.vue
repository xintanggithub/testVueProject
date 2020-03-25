<template>
    <div class="mh_root">
        <el-card v-loading="loading" shadow="always" class="mh_content">
            <div style="width: 100%;height: auto;max-height: 80vh;overflow-y: scroll;display: flex;flex-direction: row;flex-wrap: wrap;">
                <div v-for="(itemData,index) in listData">
                    <div style="width: 10vw;display: flex;flex-direction: column;">
                        <el-image :fit="cover" style="width: 8vw;height: 11vw;" :src="itemData.cover"/>
                        <div style="width:8vw;overflow: hidden;-webkit-line-clamp: 1;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;height: 2.2vh;">
                            <span style="font-size: 13px;">{{itemData.name}}</span>
                        </div>
                        <span style="font-size: 12px;color: #909399;">时间：{{itemData.time}}</span>
                        <span style="font-size: 12px;color: #F56C6C;margin-bottom: 10px;width: 8vw;">最新章节：{{itemData.latest}}</span>
                    </div>
                </div>
            </div>
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

    import {queryMhList} from "../../../../api/enterainment"
    import {formatHead} from "~/utils/formatUtils";

    export default {
        name: 'mh',
        inject: ['changeIndex'],
        data() {
            return {
                loading: false,
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
                ],
                listData: [],
            }
        },
        mounted() {
            this.changeIndexMt();
            this.queryList(null)
        },
        methods: {
            formatHeadA(val) {
                return formatHead(val);
            },
            changeIndexMt() {
                this.changeIndex(1)
            },
            tagClick(tag, index) {
                this.indexD = index;
                console.log("click tag ====>", tag);
            },
            async queryList(type) {
                this.loading = true;
                const params = {};
                params['page'] = 1;
                if (type) {
                    params['type'] = type;
                }
                console.log("queryList params====>", params);
                await queryMhList(params).then(data => {
                    console.log("queryList data====>", data.data.data);
                    this.loading = false;
                    this.listData = data.data.data.lists;
                }).catch(err => {
                    console.log("queryList err====>", err);
                    this.loading = false;
                })
            }
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