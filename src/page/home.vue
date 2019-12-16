<template>
    <div>
        home page
        <button v-on:click="goLogin">login</button>
        <button v-on:click="goHome">home</button>
        <button v-on:click="goGame">game</button>
        <button v-on:click="goBook">book</button>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        name: 'home',
        methods: {
            goLogin: function () {
                this.$router.push({name: 'login'})
            },
            goGame: function () {
                this.$router.push({name: 'game'})
            },
            goHome: function () {
                this.$router.push({name: 'homeContent'})
            },
            goBook: function () {
                this.$router.push({name: 'book'})
            }
        }
    }
</script>
<style>

</style>