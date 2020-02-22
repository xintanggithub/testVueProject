<template>
    <div>
        setting
    </div>
</template>
<script>
    export default {
        name: 'setting',
        inject: ['changeIndex33'],
        mounted() {
            this.changeIndexThree();
        },
        methods: {
            changeIndexThree() {
                this.changeIndex33();
            }
        }
    }

</script>
<style>

</style>