<template>
    <div class="user">
        <img src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3190441126,995644236&fm=26&gp=0.jpg" class="userImg"/>
        <div style="display: flex;flex-direction: column;">
            <div class="nameStyle">好像最多显示十二个字符吧</div>
            <div style="margin-left: 1vw;">
                <el-button type="text" size="mini">个人中心</el-button>
                <el-button type="text" size="mini">退出</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'myUser'
    }

</script>
<style>
    .user {
        width: 18vw;
        height: auto;
        position: absolute;
        z-index: 99;
        margin-left: 77vw;
        display: flex;
        flex-direction: row;
    }

    .userImg {
        height: 4.5vh;
        width: 4.5vh;
        border-radius: 50%;
        justify-content: center;
    }

    .nameStyle {
        color: #303133;
        font-size: 13px;
        margin-left: 1vw;
    }

</style>