<template>
  <div v-if="show" class="calendar-weeks">Weeks</div>
</template>

<script>
export default {
  name: "CalendarWeeks",
  props: {
    show: Boolean,
  },
};
</script>

<style></style>
