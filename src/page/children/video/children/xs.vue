<template>
    <div>
        xs
    </div>
</template>
<script>
    export default {
        name: 'xs',
        inject: ['changeIndex'],
        mounted() {
            this.changeIndexMt2();
        },
        methods: {
            changeIndexMt2() {
                this.changeIndex(2)
            },
        }
    }
</script>
<style>

</style>