<template>
    <div class="block auth">
        <div class="block__header">
            <l-logo/>
        </div>

        <div class="block__content">
            <l-field label="E-Mail"
                     v-validate="'required|email|max:255'"
                     data-vv-name="email"
                     :error="errors.first('email')"
                     id="email"
                     icon-left="envelope"
                     type="email"
                     v-model="email"/>

            <l-field label="Пароль"
                     v-validate="'required|max:50'"
                     data-vv-name="password"
                     :error="errors.first('password')"
                     id="password"
                     icon-left="key"
                     type="password"
                     v-model="password"/>

            <l-button @click="submit" primary>
                Войти
            </l-button>
        </div>
    </div>
</template>

<script>
    import LButton from '../components/LButton';
    import LField from '../components/LField';
    import LLogo from "../components/LLogo";

    export default {
        layout: 'auth',

        components: {
            LLogo,
            LButton,
            LField,
        },

        data() {
            return {
                email: '',
                password: '',
            }
        },

        methods: {
            submit() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.$store
                            .dispatch('auth/login', {
                                email: this.email,
                                password: this.password,
                            })
                            .then(() => this.$router.push('/'));
                    }
                });
            },
        },
    };
</script>