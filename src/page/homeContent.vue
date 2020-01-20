<template>
    <div style="display: flex;flex-direction: column;">
       <detail :bookId="id"></detail>
    </div>
</template>
<script>

    import detail from '../page/children/book/detail'

    export default {
        components: {detail},
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