<template>
    <div>
        <template v-if="important === 'high'">
            <icon name="exclamation-triangle"/> Срочная доставка
        </template>
        <template v-else-if="important === 'low'">
            <icon name="info"/> Обычная
        </template>
        <template v-else>
            {{ important }}
        </template>
    </div>
</template>

<script>
    export default {
        name: 'l-items-important',
        props: {
            important: String,
        }
    }
</script>