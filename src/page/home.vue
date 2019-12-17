<template>
    <div>
        <!-- tab -->
        <div style="width: 100vw;height: 7vh;display: flex;flex-direction: row;position: fixed;left: 0;top: 0;">
            <button v-on:click="goLogin">login</button>
            <button v-on:click="goHome">home</button>
            <button v-on:click="goGame">game</button>
            <button v-on:click="goBook">book</button>
        </div>
        <!--content-->
        <div style="min-height: 89vh;width: 100vw;background-color: blue;margin-top: 7vh;">
            <router-view></router-view>
            <div style="width: 100%;height: 1500px;background-color: azure;"></div>
        </div>

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