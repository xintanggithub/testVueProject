<template>
    <div>
        changePassword
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