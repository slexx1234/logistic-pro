<template>
    <div class="search">
        <input class="search__input" placeholder="Поиск посылок"/>
        <icon class="search__icon" name="search"/>
        <div class="search__result items__content" v-show="false">
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
