<template>
    <l-layout>
        <l-header v-if="$store.state.auth.user"/>
        <nuxt/>
    </l-layout>
</template>

<script>
    import LLayout from "../components/LLayout";
    import LHeader from "../components/LHeader";

    export default {
        components: {
            LHeader,
            LLayout}

    }
</script>
