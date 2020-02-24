<template>
    <div>
        敬请期待
    </div>
</template>
<script>
    export default {
        name: 'changePassword',
        inject: ['changeStTwo'],
        mounted() {
            this.change();
        },
        methods: {
            change() {
                this.changeStTwo();
            },

        }
    }
</script>
<style>

</style>