<template>
    <div class="rootDiv">
        <span class="spanView">©2019  蜀ICP备19039487号</span>
    </div>
</template>
<script>
    export default {
        name: 'myFooter'
    }
</script>
<style>
    .rootDiv {
        width: 100vw;
        height: 3vh;
        background-color: rgba(0, 0, 0, 0.86);
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .spanView {
        width: 100vw;
        height: auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
        color: #a0a0a0;
        font-size: 12px;
    }
</style>