<template>
    <div :class="{ items: true, 'items--loading': loading, 'items--clickable': clickable }">
        <table class="items__table">
            <thead class="items__header">
                <tr>
                    <th width="200">Трек код</th>
                    <th>Направление</th>
                    <th>Местоположение</th>
                    <th width="200">Статус</th>
                    <th width="200">Выжность</th>
                    <th>Отправитель</th>
                    <th v-if="selectable"></th>
                </tr>
            </thead>
            <tbody class="items__content">
                <tr v-if="Array.isArray(items) && items.length > 0" v-for="item in items" :key="item.key">
                    <td class="items__code" v-text="item.code" @click="to(item)"></td>
                    <td class="items__direction" @click="to(item)">{{ item.from }} <icon name="angle-right"/> {{ item.to }}</td>
                    <td class="items__location" @click="to(item)"><icon name="location-arrow"/> {{ item.location }}</td>
                    <td :class="{ 'items__status': true, ['items__status--' + item.status]: true }" @click="to(item)">
                        <l-items-status :status="item.status"/>
                    </td>
                    <td :class="{ 'items__important': true, ['items__important--' + item.important]: true }" @click="to(item)">
                        <l-items-important :important="item.important"/>
                    </td>
                    <td class="items__sender" @click="to(item)">{{ item.sender }}</td>
                    <td class="items__checkbox" v-if="selectable">
                        <l-checkbox @change="changeSelect(item.key)" :checked="$store.state.parcels.selected[item.key]"/>
                    </td>
                </tr>
            </tbody>
        </table>
        <transition name="fade">
            <div v-if="loading">
                <l-spinner/>
            </div>
        </transition>
    </div>
</template>

<script>
    import LCheckbox from "../components/LCheckbox";
    import LSpinner from "./LSpinner";
    import LButton from "./LButton";
    import LItemsStatus from "./LItemsStatus";
    import LItemsImportant from "./LItemsImportant";

    export default {
        name: 'l-items',
        components: {
            LItemsImportant,
            LItemsStatus,
            LButton,
            LSpinner,
            LCheckbox,
        },
        props: {
            items: Array,
            loading: {
                default: false,
                type: Boolean,
            },
            selectable: {
                default: true,
                type: Boolean,
            },
            clickable: {
                default: true,
                type: Boolean,
            },
        },

        watch: {
            items(items) {
                this.$emit('select');
            },
        },

        methods: {
            changeSelect(id) {
                this.$store.commit('parcels/select', { id, value: !this.$store.state.parcels.selected[id] });
                this.$emit('select');
            },
            to(item) {
                if (this.clickable) {
                    this.$router.push('/parcels/' + item.key);
                }
            }
        }
    }
</script>

