<template>
    <!-- <div app class="appbar">
        <p class="font-weight-black subtitle-2 text-center" style="font-size: 1.5em">{{ this.$store.state.pageName }}</p>
        <hr/>
    </div> -->
    <v-app-bar app dense dark color="blue darken-1">
        <v-spacer></v-spacer>
        <v-toolbar-title class="font-weight-bold white--text">{{ this.$store.state.pageName }}</v-toolbar-title>
        <v-spacer></v-spacer>
    </v-app-bar>
</template>
<script>
export default {
    name: 'TopBar',
}
</script>
<style>
</style>
