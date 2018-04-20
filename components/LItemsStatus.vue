<template>
    <div>
        <template v-if="status === 'handed'">
            <icon name="check-circle"/> Вручено
        </template>
        <template v-else-if="status === 'send'">
            <icon name="paper-plane"/> В пути
        </template>
        <template v-else>
            {{ status }}
        </template>
    </div>
</template>

<script>
    export default {
        name: 'l-items-status',
        props: {
            status: String,
        }
    }
</script>