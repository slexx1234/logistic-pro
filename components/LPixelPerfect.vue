<template>
    <div class="pixel-perfect">
        <button class="pixel-perfect__button" @click.prevent.stop="isVisible = !isVisible">PP</button>
        <img src="/logistic.png" :class="{'pixel-perfect__image': true, 'pixel-perfect__image--visible': isVisible}">
    </div>
</template>

<script>
    export default {
        name: 'l-pixel-perfect',
        data() {
            return {
                isVisible: true,
            }
        }
    }
</script>

<style lang="scss">
    .pixel-perfect {
        &__button {
            position: fixed;
            top: 1rem;
            right: 1rem;
            z-index: 100000;
        }
        &__image {
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            transition: 0.3s linear opacity;
            pointer-events: none;
            &--visible {
                opacity: 0.6;
                z-index: 10000;
            }
        }
    }
</style>
