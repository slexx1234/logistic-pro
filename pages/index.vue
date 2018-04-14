<template>
    <l-container>
        <l-items/>
    </l-container>
</template>

<script>
    import LContainer from "../components/LContainer";
    import LItems from "../components/LItems";

    export default {
        middleware: 'auth',
        components: {
            LItems,
            LContainer,
        }
    }
</script>

