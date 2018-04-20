<template>
    <l-container>
        <l-items :loading="$store.state.parcels.isLoading" :items="typeof $store.state.parcels.cache[id] !== 'undefined' ? [$store.state.parcels.cache[id]] : []" :selectable="false" :clickable="false"/>

        <h2>История локации посылки:</h2>
        <l-spinner v-if="loadingHistory"/>
        <table class="table" v-else>
            <thead>
                <tr>
                    <th>Локация</th>
                    <th>Пользователь изменил</th>
                    <th>Дата</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="history in $store.state.parcels.history[id]['location']" :key="history.id">
                    <td v-text="history.value"></td>
                    <td v-text="history.username"></td>
                    <td v-text="history.datetime"></td>
                </tr>
            </tbody>
        </table>
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

        data() {
            return {
                loadingHistory: true,
            };
        },

        mounted() {
            this.$store.dispatch('parcels/getById', this.$route.params.id);
            this.$store
                .dispatch('parcels/getHistory', {
                    id: this.$route.params.id,
                    key: 'location',
                })
                .then(() => {
                    this.loadingHistory = false;
                })
        },

        computed: {
            id() {
                return this.$route.params.id;
            },
        },
    };
</script>

