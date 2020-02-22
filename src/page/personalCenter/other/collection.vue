<template>
    <div>
        collection
    </div>
</template>
<script>

    export default {
        name: "collection",
        inject: ['changeStOne'],
        mounted() {
            this.change();
        },
        methods: {
            change() {
                this.changeStOne();
            },

        }
    }

</script>
<style>

</style>