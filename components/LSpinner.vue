<template>
    <no-ssr>
        <spinner message="Загрузка..." class="spinner" :size="62"/>
    </no-ssr>
</template>

<script>
    const components = {};

    if (process.browser) {
        components.Spinner = require('vue-simple-spinner');
    }

    export default {
        name: 'l-spinner',
        ssr: false,
        components,
    }
</script>
