<template>
    <no-ssr>
        <div :class="wrapClasses">
            <label class="field__label" :for="id" v-if="label" v-text="label"></label>
            <div :class="controlClasses">
                <v-select v-model="mutatedValue" :searchable="searchable" :options="options"/>

                <span class="field__icon field__icon--left" v-if="iconLeft">
                    <icon :name="iconLeft"/>
                </span>
                <span class="field__icon field__icon--right" v-if="iconRight">
                    <icon :name="iconRight"/>
                </span>
            </div>
            <p class="field__help" v-if="help" v-text="help"></p>
            <p class="field__help field__help--success" v-if="success" v-text="success"></p>
            <p class="field__help field__help--danger" v-if="error" v-text="error"></p>
        </div>
    </no-ssr>
</template>

<script>
    const components = {};

    if (process.browser) {
        components['v-select'] = require('vue-select').default;
    }

    export default {
        name: 'l-select',
        components,
        model: {
            event: 'change',
            prop: 'value',
        },
        props: {
            id: String,
            value: [String, Object, Number],
            label: String,
            iconLeft: String,
            iconRight: String,
            success: String,
            error: String,
            placeholder: String,
            help: String,
            type: String,
            multiline: Boolean,
            small: Boolean,
            options: Array,
            searchable: Boolean,
        },
        computed: {
            controlClasses() {
                return {
                    'field__control': true,
                    'field__control--icon-left': this.iconLeft,
                    'field__control--icon-right': this.iconRight,
                };
            },
            inputClasses() {
                return {
                    'field__input': true,
                    'field__input--success': this.success,
                    'field__input--danger': this.error,
                };
            },
            wrapClasses() {
                return {
                    field: true,
                    'field--small': this.small,
                    'field--select': true,
                };
            },
        },
        data() {
            return {
                mutatedValue: this.value,
            };
        },
        watch: {
            mutatedValue(value) {
                this.$emit('change', value);
            },
        },
        methods: {
            validate() {
                this.$validator.validateAll().then((result) => {

                });
            },
        }
    }
</script>