<template>
    <div>
        <div class="mh_root">
            <el-card v-loading="loading" shadow="always" class="mh_content">
                <div>
                    <div class="mh_list_root">
                        <div v-for="(itemData,index) in listData">
                            <div class="mh_item_root" @click="mhItemClick(itemData)">
                                <el-image :fit="fitStr" style="width: 8vw;height: 11vw;" :src="itemData.cover"/>
                                <div class="mh_title">
                                    <span style="font-size: 13px;">{{itemData.name}}</span>
                                </div>
                                <span class="mh_time">更新时间：{{itemData.time}}</span>
                                <span class="mh_last">最新章节：{{itemData.latest}}</span>
                            </div>
                        </div>
                    </div>
                    <el-pagination
                            layout="prev, pager, next, total"
                            @current-change="handleCurrentChange"
                            :page-size="100"
                            :total="total">
                    </el-pagination>
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
        <el-drawer :visible.sync="drawerDetail" :direction="direction"
                   :modal-append-to-body="false" :show-close="false" size="100%">
            <mhDetail ref="mhDetailMh" :url="url"></mhDetail>
        </el-drawer>
    </div>
</template>
<script>

    import {queryMhList} from "../../../../api/enterainment"
    import mhDetail from './mhDetail'

    export default {
        components: {mhDetail},
        name: 'mh',
        inject: ['changeIndex'],
        provide() {
            return {
                closeMh: this.closeMh
            }
        },
        data() {
            return {
                url: '',
                fitStr: "cover",
                direction: 'btt',
                drawerDetail: false,
                total: 0,
                page: 1,
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
            closeMh() {
                this.drawerDetail = false;
            },
            mhItemClick(itemData) {
                console.log("mhItem click ====>", itemData);
                console.log("mhItem click2 ====>", this.drawerDetail);
                this.drawerDetail = true;
                this.url = itemData.url;
                try {
                    this.$refs.mhDetailMh.loadDetail(this.url);
                } catch (e) {
                }
            },
            changeIndexMt() {
                this.changeIndex(1)
            },
            tagClick(tag, index) {
                console.log("click index=> " + index + " tag ====>", tag);
                if (this.indexD === index) {
                    return
                }
                this.indexD = index;
                if (this.indexD === 0) {
                    this.queryList(null);
                } else {
                    this.queryList(tag.value);
                }
            },
            async queryList(type) {
                this.loading = true;
                this.listData = [];
                const params = {};
                params['page'] = this.page;
                if (type) {
                    params['type'] = type;
                }
                console.log("queryList params====>", params);
                await queryMhList(params).then(data => {
                    console.log("queryList data====>", data.data.data);
                    this.loading = false;
                    this.total = data.data.data.totalCount;
                    this.listData = data.data.data.lists;
                }).catch(err => {
                    console.log("queryList err====>", err);
                    this.loading = false;
                })
            },
            handleCurrentChange(val) {
                this.page = val;
                console.log("当前是第" + val + "页 ");
                if (this.indexD === 0) {
                    this.queryList(null);
                } else {
                    this.queryList(this.tags[this.indexD].value);
                }
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

    .mh_last {
        font-size: 12px;
        color: #F56C6C;
        margin-bottom: 10px;
        width: 8vw;
    }

    .mh_time {
        font-size: 11px;
        color: #909399;
    }

    .mh_title {
        width: 8vw;
        overflow: hidden;
        -webkit-line-clamp: 1;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        height: 2.2vh;
    }

    .mh_item_root {
        width: 10vw;
        display: flex;
        flex-direction: column;
    }

    .mh_list_root {
        width: 100%;
        height: 80vh;
        overflow-y: scroll;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

</style>