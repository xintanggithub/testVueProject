<template>
    <div>
        <div class="editTopDetail2">
            <div class="editLogDetail" @click="goHome">
                <img src="../../../res/img/logo_icon.png" class="logoIconDetail"/>
            </div>
            <div class="titlesDetail">
                <span style="font-size: 18px;color: black;">标题：001</span>
            </div>
            <my-user hideLoginOut></my-user>
        </div>
        <div class="editContentDetail" style="background-color: antiquewhite;margin-top: -10px;">

        </div>
        <!--<mavon-editor :value="mdValue" :subfield="false" :defaultOpen="'preview'" :toolbarsFlag="false"-->
        <!--:editable="false" :scrollStyle="true" :ishljs="true"></mavon-editor>-->
        <my-footer></my-footer>
    </div>
</template>
<script>

    import myFooter from '../../common_component/foot/footer'
    import myUser from '../../common_component/user/myUser'

    export default {
        components: {myFooter, myUser},
        name: "detail",
        data() {
            return {
                id: "",
                mdValue: "12312313wqeqeqeq"
            }
        },
        created() {
            this.id = this.$route.params.id;
            console.log("====> detail id === ", this.id)
        },
        methods: {
            goHome() {
                this.$router.push('/')
            }
        }
    }
</script>
<style>
    .titlesDetail {
        margin-left: 3.7vw;
        width: 55vw;
        max-lines: 2;
        max-height: 5vh;
        display: -webkit-box;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        word-break: break-all;
    }

    .editTopDetail2 {
        width: 100vw;
        height: 9vh;
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: white;
    }

    .editContentDetail {
        width: 100%;
        height: 89.1vh;
        display: flex;
        flex-direction: row;
    }

    .logoIconDetail {
        max-height: 4.5vh;
        margin-top: 0.4vh;
    }

    .editLogDetail {
        margin-left: 8vw;
    }
</style>