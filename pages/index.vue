<template>
    <l-container>
        <div class="items">
            <table class="items__table">
                <thead class="items__header">
                <tr>
                    <th>Трек код</th>
                    <th>Направление</th>
                    <th>Местоположение</th>
                    <th>Статус</th>
                    <th>Выжность</th>
                    <th>Отправитель</th>
                    <th></th>
                </tr>
                </thead>
                <tbody class="items__content">
                <tr>
                    <td class="items__code">LP09080-VR</td>
                    <td class="items__direction">Киров SV1 <icon name="angle-right"/> Москва SV47</td>
                    <td class="items__location"><icon name="location-arrow"/> Тула SK1</td>
                    <td class="items__status items__status--handed"><icon name="check-circle"/> Вручено</td>
                    <td class="items__important items__important--high"><icon name="exclamation-triangle"/> Срочная доставка</td>
                    <td class="items__sender">Бойдашов В.Н.</td>
                    <td class="items__checkbox">
                        <l-checkbox/>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </l-container>
</template>

<script>
    import LContainer from "../components/LContainer";
    import LCheckbox from "../components/LCheckbox";

    export default {
        components: {
            LCheckbox,
            LContainer,
        }
    }
</script>

