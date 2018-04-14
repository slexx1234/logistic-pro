<template>
    <button :class="classes" @click.prevent.stop="onClick">
        <slot/>
    </button>
</template>

<script>
    export default {
        name: 'button',
        props: {
            primary: Boolean,
        },
        computed: {
            classes() {
                let result = ['button'];

                if (this.primary) result.push('button--primary');

                return result;
            }
        },
        methods: {
            onClick(e) {
                this.$emit('click', e);
            }
        }
    }
</script>