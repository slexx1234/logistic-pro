<template>
    <div class="search">
        <input class="search__input" placeholder="Поиск посылок"/>
        <icon class="search__icon" name="search"/>
    </div>
</template>

<script>
    export default {
        name: 'l-search',
        model: {
            prop: 'value',
            event: 'input'
        },
        props: {
            value: String,
        }
    }
</script>
