<template>
    <button :class="classes" @click.prevent.stop="onClick">
        <slot/>
    </button>
</template>

<script>
    export default {
        name: 'l-button',
        props: {
            primary: Boolean,
            small: Boolean,
            warning: Boolean,
            danger: Boolean,
        },
        computed: {
            classes() {
                let result = ['button'];

                if (this.primary) result.push('button--primary');
                if (this.small) result.push('button--small');
                if (this.warning) result.push('button--warning');
                if (this.danger) result.push('button--danger');

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