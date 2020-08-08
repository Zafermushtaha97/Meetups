<template>
    <v-alert  type="error"  dismissible @input="onclose">
        {{text}}
    </v-alert>
</template>

<script>
    export default {
        name: "alert",
        props:['text'],
        methods:{
            onclose(){
                this.$emit('dismissed')
            }
        }
    }
</script>

<style scoped>

</style>