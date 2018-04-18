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
                    <l-button @click="editModal = true" small warning>
                        <icon name="edit"/>
                        Изменить
                    </l-button>
                    <l-button @click="remove" small danger>
                        <icon name="times"/>
                        Удалить
                    </l-button>
                    <l-button @click="clear" small>
                        <icon name="ban"/>
                        Отмена
                    </l-button>
                </l-button-group>
            </transition>
        </l-container>
        <l-modal v-model="editModal">
            <l-select v-model="status"
                      label="Статус:"
                      :options="statuses"
                      v-validate="'required'"
                      data-vv-name="status"
                      :error="errors.first('status')"
                      small/>

            <l-field v-model="location"
                     label="Локация:"
                     v-validate="'required'"
                     data-vv-name="location"
                     :error="errors.first('location')"
                     small/>

            <l-button-group>
                <l-button @click="save" small primary>
                    <icon name="save"/>
                    Сохранить
                </l-button>
                <l-button @click="editModal = false" small>
                    <icon name="ban"/>
                    Отмена
                </l-button>
            </l-button-group>
        </l-modal>
    </footer>
</template>

<script>
    import LContainer from "./LContainer";
    import LButtonGroup from "./LButtonGroup";
    import LButton from "./LButton";
    import LModal from "./LModal";
    import LField from "./LField";
    import LSelect from "./LSelect";

    export default {
        components: {
            LSelect,
            LField,
            LModal,
            LButton,
            LButtonGroup,
            LContainer
        },
        name: 'l-footer',

        computed: {
            items() {
                let result = [];
                for(let key in this.$store.state.parcels.selected) {
                    if (this.$store.state.parcels.selected[key]) {
                        result.push(key);
                    }
                }
                return result;
            },
        },

        data() {
            return {
                editModal: false,
                status: { id: 'handed', label: 'Вручено' },
                statuses: [
                    { id: 'handed', label: 'Вручено' },
                    { id: 'send', label: 'В пути' },
                ],
                location: '',
            };
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

            clear() {
                this.$store.commit('parcels/clearSelected');
            },

            remove() {
                this.$store.dispatch('parcels/remove', {
                    ids: this.items,
                });
            },

            save() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.editModal = false;
                        this.$store.dispatch('parcels/update', {
                            ids: this.items,
                            status: this.status.id,
                            location: this.location,
                        });
                    }
                });
            },
        }
    }
</script>
