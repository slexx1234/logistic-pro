import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';

import russian from 'vee-validate/dist/locale/ru';
import russianLocale from '../locales/ru';

Vue.use(VeeValidate, {
    locale: 'ru',
});

Validator.localize('ru', {
    messages: russian.messages,
    attributes: russianLocale.validate.attributes,
    custom: russianLocale.validate.custom,
});
