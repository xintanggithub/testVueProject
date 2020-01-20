<template>
    <div style="display: flex;flex-direction: column;">
    </div>
</template>
<script>

    export default {
        name: 'homeContent',
        data() {
            return {
                id:"book59f09672-1239-42f3-8b29-141a3cdb32e8"
            }
        },
        methods: {
            edit() {
                this.$router.push('/edit');
            },
            queryDetail() {
                this.$router.push('/detail');
            }
        }
    }
</script>
<style>
</style>