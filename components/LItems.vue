<template>
    <div :class="{ items: true, 'items--loading': loading }">
        <table class="items__table">
            <thead class="items__header">
                <tr>
                    <th width="200">Трек код</th>
                    <th>Направление</th>
                    <th>Местоположение</th>
                    <th width="200">Статус</th>
                    <th width="200">Выжность</th>
                    <th>Отправитель</th>
                    <th></th>
                </tr>
            </thead>
            <tbody class="items__content">
                <tr v-if="Array.isArray(items) && items.length > 0" v-for="item in items" :key="item.key">
                    <td class="items__code" v-text="item.code"></td>
                    <td class="items__direction">{{ item.from }} <icon name="angle-right"/> {{ item.to }}</td>
                    <td class="items__location"><icon name="location-arrow"/> {{ item.location }}</td>
                    <td :class="{ 'items__status': true, ['items__status--' + item.status]: true }">
                        <template v-if="item.status === 'handed'">
                            <icon name="check-circle"/> Вручено
                        </template>
                        <template v-else-if="item.status === 'send'">
                            <icon name="paper-plane"/> В пути
                        </template>
                        <template v-else>
                            {{ item.status }}
                        </template>
                    </td>
                    <td :class="{ 'items__important': true, ['items__important--' + item.important]: true }">
                        <template v-if="item.important === 'high'">
                            <icon name="exclamation-triangle"/> Срочная доставка
                        </template>
                        <template v-else-if="item.important === 'low'">
                            <icon name="info"/> Обычная
                        </template>
                        <template v-else>
                            {{ item.important }}
                        </template>
                    </td>
                    <td class="items__sender">{{ item.sender }}</td>
                    <td class="items__checkbox">
                        <l-checkbox @change="changeSelect(item.key)"/>
                    </td>
                </tr>
            </tbody>
        </table>
        <transition name="fade">
            <div class="items__spinner" v-if="loading">
                <l-spinner/>
            </div>
        </transition>
    </div>
</template>

<script>
    import LCheckbox from "../components/LCheckbox";
    import LSpinner from "./LSpinner";

    export default {
        name: 'l-items',
        components: {
            LSpinner,
            LCheckbox,
        },
        props: {
            items: Array,
            loading: {
                default: false,
                type: Boolean,
            },
        },
        data() {
            return {
                selected: [],
            };
        },
        watch: {
            items(items) {
                this.selected = [];
            },
        },
        methods: {
            changeSelect(id) {
                if (this.selected.includes(id)) {
                    this.selected.splice(this.selected.indexOf(id), 1);
                } else {
                    this.selected.push(id);
                }
                this.$emit('select', this.selected);
            },
        }
    }
</script>

