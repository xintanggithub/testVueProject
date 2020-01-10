<template>
    <div>
        <div class="detail_content_a_style list_root_style" style="padding-left: 6vw;" @scroll="orderScroll" ref="Box">
            <div v-for="(itemData,index) in listData" :key="index">
                <el-card shadow="hover" style="width: 42vw;height: 20vh;margin: 10px;">
                    123
                </el-card>
            </div>
        </div>
        <div v-show="showBootLoading"
             style="width: 100%;height: auto;display: flex;flex-direction: row;justify-content: center;">
            <i v-show="loading" class="el-icon-loading"></i><span style="font-size: 11px;">{{noMore?"正在加载更多...":"已经加载完了"}}</span>
        </div>
    </div>
</template>
<script>
    export default {
        name: "bookAll",
        data() {
            return {
                noMore: true,
                loading: false,
                showBootLoading: false,
                listData: [
                    {title: "11"},
                    {title: "11"},
                    {title: "11"},
                    {title: "11"},
                    {title: "11"},
                    {title: "11"},
                    {title: "11"},
                    {title: "11"},
                    {title: "11"},
                    {title: "11"},
                    {title: "11"},
                    {title: "11"},
                    {title: "11"},
                    {title: "11"},
                    {title: "11"},
                    {title: "11"},
                    {title: "11"},
                    {title: "11"},
                ]
            }
        },
        methods: {
            orderScroll(e) {
                let a = this.$refs.Box.scrollHeight;
                let b = this.$refs.Box.clientHeight;
                let c = this.$refs.Box.scrollTop;
                console.log("====> a", a);
                console.log("====> b+c", b + c);
                this.showBootLoading = (b + c >= a - 3);
                if (this.showBootLoading) {
                    if (!this.noMore) {
                        this.loading = false;
                        this.showBootLoading = true;
                    } else {
                        if (!this.loading) {
                            this.loading = true;
                            this.loadListData();
                        }
                    }
                }
            },
            loadListData() {
                let v = this;
                setTimeout(() => {
                    if (v.listData.length < 40) {
                        v.loading = false;
                        v.showBootLoading = false;
                        v.noMore = true;
                        v.listData.push(
                            {title: "22"}, {title: "22"}, {title: "22"}, {title: "22"},
                            {title: "22"}, {title: "22"}, {title: "22"}, {title: "22"},
                            {title: "22"}, {title: "22"}, {title: "22"}, {title: "22"},
                            {title: "22"}, {title: "22"}, {title: "22"}, {title: "22"})
                    } else {
                        v.loading = false;
                        v.showBootLoading = true;
                        v.noMore = false;
                    }
                }, 1500);
            }
        }

    }
</script>
<style>

</style>