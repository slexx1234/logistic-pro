<template>
    <header class="header">
        <l-container>
            <div class="header__top">
                <l-logo/>
                <l-search/>
                <div class="header__actions">
                    <l-action>
                        <icon name="plus"/>
                    </l-action>
                    <l-avatar/>
                </div>
            </div>
            <div class="header__bottom">
                <l-tabs>
                    <l-tabs-item>Главная</l-tabs-item>
                    <l-tabs-item active>Посылки</l-tabs-item>
                </l-tabs>
                <l-checkbox>Выбрать все</l-checkbox>
            </div>
        </l-container>
    </header>
</template>

<script>
    import LContainer from "./LContainer";
    import LLogo from "./LLogo";
    import LSearch from "./LSearch";
    import LAvatar from "./LAvatar";
    import LAction from "./LAction";
    import LTabs from "./LTabs";
    import LTabsItem from "./LTabsItem";
    import LCheckbox from "./LCheckbox";

    export default {
        components: {
            LCheckbox,
            LTabsItem,
            LTabs,
            LAction,
            LAvatar,
            LSearch,
            LLogo,
            LContainer},
        name: 'l-header'
    }
</script>