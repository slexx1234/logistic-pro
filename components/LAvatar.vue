<template>
    <img :src="$store.state.auth.user.avatar" class="avatar"/>
</template>

<script>
    export default {
        name: 'l-avatar',
    }
</script>