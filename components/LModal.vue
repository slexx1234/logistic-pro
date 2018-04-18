<template>
    <transition name="modal">
        <div class="modal" @click.prevent.stop="closeOnClickWrap" v-if="activeMutated">
            <div class="modal__container">
                <button class="modal__close" @click.prevent.stop="close">
                    <icon name="times"/>
                </button>
                <slot/>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'l-modal',
        model: {
            event: 'toggle',
            prop: 'active',
        },
        props: {
            active: Boolean,
        },
        data() {
            return {
                activeMutated: this.active,
            };
        },
        watch: {
            active(active) {
                this.activeMutated = active;
            },
        },
        methods: {
            toggle() {
                this.activeMutated = !this.activeMutated;
                if (this.activeMutated) {
                    this.$emit('open');
                } else {
                    this.$emit('close');
                }
                this.$emit('toggle', this.activeMutated);
            },
            close() {
                this.activeMutated = false;
                this.$emit('close');
                this.$emit('toggle', false);
            },
            open() {
                this.activeMutated = true;
                this.$emit('open');
                this.$emit('toggle', true);
            },
            closeOnClickWrap(e) {
                if (e.target.classList.contains('modal')) {
                    this.close();
                }
            }
        }
    }
</script>