<template>
    <l-container>
        <l-items :loading="$store.state.parcels.isLoading" :items="typeof $store.state.parcels.cache[id] !== 'undefined' ? [$store.state.parcels.cache[id]] : []" :selectable="false" :clickable="false"/>
        <l-alert danger>
            К сожалению я понятия не имею что здесь писать. Были бы какие то примеры, данные, таблицы в excel с историей локаций. Где их могут хранить?
            Номер почтового отделения? Номер вагона поезда? Адресс склада? Получается просто список или как? Похоже да.
        </l-alert>
    </l-container>
</template>

<script>
    import LContainer from "../../components/LContainer";
    import LItems from "../../components/LItems";
    import LPagination from "../../components/LPagination";
    import LFooter from "../../components/LFooter";
    import LSpinner from "../../components/LSpinner";
    import LAlert from "../../components/LAlert";

    export default {
        middleware: 'auth',
        components: {
            LAlert,
            LSpinner,
            LFooter,
            LPagination,
            LItems,
            LContainer,
        },

        mounted() {
            this.$store.dispatch('parcels/getById', this.$route.params.id);
        },

        computed: {
            id() {
                return this.$route.params.id;
            },
        },
    };
</script>

