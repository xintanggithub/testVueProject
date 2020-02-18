<template>
    <div>
        <!--list-->
        <div style="margin-top: 20px;align-items: center;word-wrap: break-word;word-break: break-all;overflow: hidden;">
            <div v-for="item in listData" style="width: 15vw;height: 20vh;background-color: aquamarine;margin: 10px;">
                {{item.title}}
            </div>
        </div>
        <div class="block">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="page"
                    :page-size="pageSize"
                    layout="prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>

    import {queryGameList} from "../../../api/game"

    export default {
        name: 'game',
        data() {
            return {
                total: 0,
                page: 1,
                pageSize: 18,
                keyword: '',
                listData: []
            }
        },
        methods: {
            handleCurrentChange(val) {
                console.log("当前是第" + val + "页 ");
                this.queryGameList();
            },
            async queryGameList() {
                const params = {};
                if (this.keyword) {
                    params["keyword"] = this.keyword;
                }
                params["page"] = this.page;
                params["pageSize"] = this.pageSize;
                //调用接口搜索/查询
                await queryGameList(params).then(data => {
                    console.log("success==> ", data.data.data);
                    this.listData = data.data.data.lists;
                    this.total = data.data.data.totalCount;
                }).catch(error => {
                    console.log("success==> " + error)
                })
            },
        },
        created() {
            this.queryGameList();
        }
    }
</script>