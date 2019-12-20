<template>
    <div>
        <div class="rootDivForget">
            forget
        </div>
        <my-footer></my-footer>
    </div>
</template>
<script>
    import myFooter from '../common_component/foot/footer'

    export default {
        components: {myFooter},
        name: 'forget'
    }

</script>
<style>
    .rootDivForget {
        width: 100vw;
        height: 97vh;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
</style>