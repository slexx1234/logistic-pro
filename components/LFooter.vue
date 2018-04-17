<template>
    <footer class="footer">
        <l-container>
            <div class="footer__text" v-if="items.length === 0">
                Ничего не выбрано
            </div>
            <div class="footer__text" v-if="items.length > 0">
                {{ plural(items.length, 'Выбран', 'Выбрано', 'Выбрано') }} {{ items.length }} {{ plural(items.length, 'элемент', 'элемента', 'элементов') }}
            </div>
            <transition name="fade">
                <l-button-group class="footer__actions" v-if="items.length > 0">
                    <l-button small warning>
                        <icon name="edit"/>
                        Изменить
                    </l-button>
                    <l-button small danger>
                        <icon name="times"/>
                        Удалить
                    </l-button>
                    <l-button small>
                        <icon name="ban"/>
                        Отмена
                    </l-button>
                </l-button-group>
            </transition>
        </l-container>
    </footer>
</template>

<script>
    import LContainer from "./LContainer";
    import LButtonGroup from "./LButtonGroup";
    import LButton from "./LButton";

    export default {
        components: {
            LButton,
            LButtonGroup,
            LContainer},
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
