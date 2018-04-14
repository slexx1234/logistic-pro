<template>
    <l-layout>
        <l-header/>
        <nuxt/>
        <l-footer/>
    </l-layout>
</template>

<script>
    import LLayout from "../components/LLayout";
    import LHeader from "../components/LHeader";
    import LFooter from "../components/LFooter";

    export default {
        components: {
            LFooter,
            LHeader,
            LLayout}

    }
</script>
