<template>
    <div :class="classes"><slot/></div>
</template>

<script>
    export default {
        name: 'l-alert',
        props: {
            danger: Boolean,
        },
        computed: {
            classes() {
                return {
                    alert: true,
                    'alert--danger': this.danger,
                }
            }
        }
    }
</script>