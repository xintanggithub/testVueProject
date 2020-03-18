<template>
    <div>
        mh
    </div>
</template>
<script>

    export default {
        name: 'mh',
        inject: ['changeIndex'],
        mounted() {
            this.changeIndexMt();
        },
        methods: {
            changeIndexMt() {
                this.changeIndex(1)
            },
        }
    }

</script>
<style>

</style>