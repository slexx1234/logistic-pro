<template>
    <div class="pagination">
        <l-button class="pagination__item pagination__item--prev" v-if="page !== 1" @click="mutatedPage = page - 1">
            <icon name="arrow-left"/>
        </l-button>
        <l-button class="pagination__item" v-for="i in pagesLeftOfCurrent" :key="i" @click="mutatedPage = i">{{ i }}</l-button>
        <l-button class="pagination__item pagination__item--current" primary>{{ page }}</l-button>
        <l-button class="pagination__item" v-for="i in pagesRightOfCurrent" @click="mutatedPage = i" :key="i">{{ i }}</l-button>
        <l-button class="pagination__item pagination__item--next" v-if="page !== this.total" @click="mutatedPage = page + 1">
            <icon name="arrow-right"/>
        </l-button>
    </div>
</template>

<script>
    import * as range from 'lodash.range';
    import LButton from "./LButton";

    export default {
        components: {LButton},
        model: {
            prop: 'page',
            event: 'change',
        },
        name: 'l-pagination',
        props: {
            page: Number,
            total: Number,
        },
        data() {
            return {
                pagesLeftOfCurrent: range(Math.max(1, this.page - 3), this.page),
                pagesRightOfCurrent: range(this.page, Math.min(this.total, this.page + 4)),
                mutatedPage: this.page,
            };
        },
        watch: {
            mutatedPage(page) {
                this.$emit('change', page);
                this.update();
            },
            total() {
                this.update();
            }
        },
        methods: {
            update() {
                this.pagesLeftOfCurrent = range(Math.max(1, this.mutatedPage - 3), this.mutatedPage);
                this.pagesRightOfCurrent = range(this.mutatedPage + 1, Math.min(this.total + 1, this.mutatedPage + 4));
            },
        }
    }
</script>