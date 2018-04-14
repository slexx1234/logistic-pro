<template>
    <div :class="classes" @click="checkedMutated = !checkedMutated">
        <div class="checkbox__indicator">
            <icon name="check"/>
        </div>
        <div class="checkbox__label">
            <slot/>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'l-checkbox',
        props: {
            checked: Boolean,
        },
        model: {
            event: 'change',
            prop: 'checked',
        },
        data() {
            return {
                checkedMutated: this.checked,
            };
        },
        computed: {
            classes() {
                let result = ['checkbox'];
                if (this.checkedMutated) result.push('checkbox--checked');
                return result;
            }
        },
        watch: {
            checkedMutated(isChecked) {
                this.$emit('change', isChecked);
            },
        },
    }
</script>