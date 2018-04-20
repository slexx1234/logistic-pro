<template>
    <div class="search">
        <l-field class="search__field" v-model="mutatedValue" icon-right="search" placeholder="Поиск посылок"/>
        <div class="search__overflow" @click="isShowResult = false" v-if="isShowResult"></div>
        <transition name="fade">
            <div class="search__result items__content" v-if="isShowResult">
                <div class="search__item" v-for="parcel in parcels" :key="parcel.key" @click="toParcel(parcel.key)">
                    <div class="search__item-top">
                        <div class="items__code">{{ parcel.code }}</div>
                        <div :class="'items__status items__status--' + parcel.status">
                            <l-items-status :status="parcel.status"/>
                        </div>
                        <div class="items__sender">{{ parcel.sender }}</div>
                    </div>
                    <div class="search__item-bottom">
                        <div class="items__direction">{{ parcel.from }} <icon name="angle-right"/> {{ parcel.to }}</div>
                        <div class="items__time">5 дней назад</div>
                    </div>
                </div>
                <div class="search__no-result" v-if="parcels.length === 0">
                    Не чего не найдено!
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import LField from "./LField";
    import LItemsStatus from "./LItemsStatus";

    export default {
        components: {
            LItemsStatus,
            LField},
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
                parcels: [],
                isShowResult: false,
            };
        },
        watch: {
            mutatedValue(value) {
                if (typeof value === 'string') {
                    value = value.trim();
                } else {
                    value = '';
                }

                this.$emit('input', value);

                if (value.length > 2) {
                    this.$store.dispatch('parcels/search', value)
                        .then(parcels => {
                            this.isShowResult = true;
                            this.parcels = parcels;
                        });
                }
            },
        },
        methods: {
            toParcel(id) {
                this.$router.push('/parcels/' + id);
                this.isShowResult = false;
            }
        }
    }
</script>
