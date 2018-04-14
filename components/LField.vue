<template>
    <div class="field">
        <label class="field__label" :for="id" v-if="label" v-text="label"></label>
        <div :class="controlClasses">
            <textarea :class="inputClasses"
                      :placeholder="placeholder"
                      :id="id"
                      :name="id"
                      v-model="mutatedValue"
                      v-if="multiline"></textarea>

            <input :class="inputClasses"
                   :type="type"
                   :placeholder="placeholder"
                   :id="id"
                   :name="id"
                   v-model="mutatedValue"
                   v-else>

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
</template>

<script>
    export default {
        model: {
            prop: 'value',
            event: 'input',
        },
        name: 'l-field',
        props: {
            id: String,
            value: String,
            label: String,
            iconLeft: String,
            iconRight: String,
            success: String,
            error: String,
            placeholder: String,
            help: String,
            type: String,
            multiline: Boolean,
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
        },

        data() {
            return {
                mutatedValue: this.value,
            };
        },
        watch: {
            mutatedValue(value) {
                this.$emit('input', value);
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