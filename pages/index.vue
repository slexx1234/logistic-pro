<template>
    <l-container>
        <l-items :loading="$store.state.parcels.isLoading" :items="$store.state.parcels.currentParcels" @select="onSelect"/>
        <l-pagination v-model="page" :total="$store.state.parcels.totalPages"/>
        <l-footer/>
    </l-container>
</template>

<script>
    import LContainer from "../components/LContainer";
    import LItems from "../components/LItems";
    import LPagination from "../components/LPagination";
    import LFooter from "../components/LFooter";

    export default {
        middleware: 'auth',
        components: {
            LFooter,
            LPagination,
            LItems,
            LContainer,
        },

        data() {
            return {
                page: Number(this.$route.query.page) || 1,
            };
        },

        mounted() {
            this.$store.dispatch('parcels/loadPage', this.page);
        },

        watch: {
            page(page) {
                // Вероятно надо менять URL, но надо ещё держать скрол
                // на одном месте, потом как нибудь TODO
                // this.$router.push('/parcels/' + page);

                this.$store.dispatch('parcels/loadPage', page);
            },
        },

        methods: {
            onSelect() {

            },
        },
    };
</script>

