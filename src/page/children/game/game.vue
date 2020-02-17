<template>
    <div>
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

    export default {
        name: 'game',
        data() {
            return {
                total: 0,
                page: 1,
                pageSize: 18,
                keyword: '',
            }
        },
        methods: {
            handleCurrentChange(val) {
                console.log("当前是第" + val + "页 ");
                this.queryGameList();
            },
            queryGameList() {
                const params = {};
                if (this.keyword) {
                    params["keyword"] = this.keyword;
                }
                params["page"] = this.page;
                params["pageSize"] = this.pageSize
                //调用接口搜索/查询
            },
        },
        created() {
            this.queryGameList();
        }
    }
</script>