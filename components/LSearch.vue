<template>
    <div class="search">
        <l-field class="search__field" v-model="mutatedValue" icon-right="search" placeholder="Поиск посылок"/>
        <div class="search__result items__content" v-if="false">
            <div class="search__item">
                <div class="search__item-top">
                    <div class="items__code">LP09080-RS</div>
                    <div class="items__status items__status--send"><icon name="paper-plane"/> В пути</div>
                    <div class="items__sender">Бойдашёв В.Н.</div>
                </div>
                <div class="search__item-bottom">
                    <div class="items__direction">Киров SV1 <icon name="angle-right"/> Москва SV47</div>
                    <div class="items__time">5 дней назад</div>
                </div>
            </div>
            <div class="search__item">
                <div class="search__item-top">
                    <div class="items__code">LP09080-RS</div>
                    <div class="items__status items__status--handed"><icon name="check-circle"/> Вручено</div>
                    <div class="items__sender">Бойдашёв В.Н.</div>
                </div>
                <div class="search__item-bottom">
                    <div class="items__direction">Киров SV1 <icon name="angle-right"/> Москва SV47</div>
                    <div class="items__time">58 дней назад</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import LField from "./LField";

    export default {
        components: {LField},
        name: 'l-search',
        model: {
            prop: 'value',
            event: 'input'
        },
        props: {
            value: String,
        },
        data() {
            return {
                mutatedValue: this.value,
            };
        },
        watch: {
            mutatedValue(value) {
                this.$emit('input', value);
            },
        },
    }
</script>
