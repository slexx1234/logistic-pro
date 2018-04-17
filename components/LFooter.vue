<template>
    <footer class="footer">
        <l-container>
            <template v-if="items.length === 0">
                Ничего не выбрано
            </template>
            <template v-else>
                {{ plural(items.length, 'Выбран', 'Выбрано', 'Выбрано') }} {{ items.length }} {{ plural(items.length, 'элемент', 'элемента', 'элементов') }}
            </template>
        </l-container>
    </footer>
</template>

<script>
    import LContainer from "./LContainer";

    export default {
        components: {LContainer},
        name: 'l-footer',
        props: {
            items: Array,
        },
        methods: {
            plural(number, one, two, five) {
                let n = Math.abs(number);
                n %= 100;
                if (n >= 5 && n <= 20) {
                    return five;
                }
                n %= 10;
                if (n === 1) {
                    return one;
                }
                if (n >= 2 && n <= 4) {
                    return two;
                }
                return five;
            },
        }
    }
</script>
