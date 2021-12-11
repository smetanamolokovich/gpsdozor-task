<template>
  <div v-if="show" class="calendar-footer">Weeks</div>
</template>

<script>
export default {
  name: "CalendarFooter",
  props: {
    show: Boolean,
  },
};
</script>

<style></style>
