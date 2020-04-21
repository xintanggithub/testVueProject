<template>
    <div>
        <div class="dt_mh_t">
            <div class="mh_dt_lg_ml" @click="goHome">
                <img src="../../../../res/img/logo_icon.png" class="logo_rt"/>
            </div>
            <my-user hideLoginOut></my-user>
            <div style="position: absolute;right: 3vh;top: 2.5vh;">
                <el-button type="danger" @click="goBack" icon="el-icon-close" circle></el-button>
            </div>
        </div>
        <div v-loading="loading" class="mh_detail_root">
            <div style="width: 80vw;display: flex;flex-direction: row;margin-left: 8vw; margin-top: 3vh;">
                <div style="width: 17vw;background-color: antiquewhite;">
                    <el-image fit="contain" style="width: 17vw;"
                              src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4128770553,3892991454&fm=26&gp=0.jpg"/>
                </div>
                <div style="margin-left: 1vw;display: flex;flex-direction: column;max-width: 35vw;">
                    <span class="mh_detail_title2 dt_mh_mt"> <el-link
                            target="_blank">{{detailData.content.name}}</el-link></span>
                    <span class="dt_mh_mt" style="margin-top: 15px;">
                        <el-tag type="warning" size="mini" :key="index"
                                :style="index!==0?'margin-left: 0.5vw;':''"
                                v-for="(tag,index) in loadTag(detailData.content.tag)" :disable-transitions="false">
                            <i class="el-icon-collection-tag"></i>
                                    {{tag}}
                        </el-tag>
                    </span>
                    <span class="dt_mh_mt"><el-link target="_blank">作者: {{detailData.content.author}}</el-link></span>
                    <span class="dt_mh_mt"><el-link target="_blank">状态: {{detailData.content.status}}</el-link></span>
                    <span class="dt_mh_mt"><el-link target="_blank">更新时间: {{detailData.content.time}}</el-link></span>
                    <span class="dt_mh_mt"><el-link type="info">{{detailData.content.introduce}}</el-link></span>
                </div>
            </div>
            <div style="width: 100%;height: 1px;background-color: rgba(0,0,0,0.32);margin-top: 2vh;margin-left: 8vw;margin-right: 8vw;"></div>
            <div style="width: 99%;padding-left: 8vw;padding-top: 2vh;">
                <div v-for="(itemData,index) in detailData.list">
                    <div style="margin-bottom: 1vh;">
                        <el-link type="info">{{itemData.num}}</el-link>
                    </div>
                </div>
            </div>
            <!--todo 监听滚动，标题 图标放到顶部显示，下滑时，隐藏-->
        </div>
        <my-footer></my-footer>
    </div>
</template>
<script>

    import myUser from '../../../common_component/user/myUser'
    import myFooter from '../../../common_component/foot/footer'
    import {detailMh} from "../../../../api/enterainment"

    export default {
        components: {myFooter, myUser},
        name: 'mhDetail',
        props: {
            url: {
                url: String,
                default: ""
            }
        },
        inject: ['closeMh'],
        data() {
            return {
                loading: false,
                detailData: {
                    content: {},
                    list: {}
                },
            }
        },
        mounted() {
            console.log("mounted itemData ===>", this.url);
            this.queryDetail(this.url);
        },
        methods: {
            loadTag(val) {
                if (null === val || "" === val || undefined === val) {
                    return ["暂无标签"]
                }
                return val.split(" ");
            },
            async queryDetail(url) {
                if (!url) {
                    return
                }
                this.loading = true;
                const params = {};
                params['url'] = url;
                console.log("queryDetail params ===>", params);
                await detailMh(params).then(data => {
                    console.log("queryDetail data ===>", data.data.data);
                    console.log("queryDetail list ===>", data.data.list);
                    this.detailData.content = data.data.data;
                    this.detailData.list = data.data.list;
                    this.loading = false;
                }).catch(err => {
                    console.log("queryDetail err ===>", err);
                    this.loading = false
                })
            },
            loadDetail(url) {
                console.log("itemData ===>", url);
                this.queryDetail(url)
            },
            goBack() {
                console.log("22323");
                try {
                    this.closeMh();
                } catch (e) {
                    console.log(e)
                }
            },
            goHome() {
                this.$router.push('/')
            },
        }
    }
</script>
<style>
    .dt_mh_t {
        width: 100vw;
        height: 9vh;
        display: flex;
        margin-top: -5vh;
        flex-direction: row;
        align-items: center;
        background-color: white;
    }

    .mh_detail_title2 {
        width: 8vw;
        overflow: hidden;
        -webkit-line-clamp: 1;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        height: 2.2vh;
    }

    .mh_detail_root {
        width: 100vw;
        height: 87vh;
        display: flex;
        flex-direction: row;
        overflow-y: scroll;
        flex-wrap: wrap;
    }

    .mh_dt_lg_ml {
        margin-left: 8vw;
    }

    .logo_rt {
        max-height: 4.5vh;
        margin-top: 0.4vh;
    }

    .dt_mh_mt {
        margin-top: 11px;
    }
</style>