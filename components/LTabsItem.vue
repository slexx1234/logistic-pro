<template>
    <div :class="classes">
        <slot/>
    </div>
</template>

<script>
    export default {
        name: 'l-tabs-item',
        props: {
            active: Boolean,
        },

        computed: {
            classes() {
                let result = ['tabs__item'];

                if (this.active) result.push('tabs__item--active');

                return result;
            },
        },
    }
</script>