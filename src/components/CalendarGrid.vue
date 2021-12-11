<template>
  <div class="calendar-grid">
    <div class="week-days">
      <span v-for="day in weekDays" :key="day" class="text-muted">{{
        day.toUpperCase()
      }}</span>
    </div>
    <div class="month-days">
      <button
        v-for="day in daysInMonth"
        :key="day.date"
        class="month-day"
        :class="{
          today: day.date === today,
          'text-muted': !day.isCurrentMonth,
          selected: day.selected,
        }"
      >
        {{ day.dayOfMonth }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CalendarGrid",
  props: {
    daysInMonth: Array,
    today: String,
    weekDays: Array,
    selectedWeekDays: Array,
  },
  mounted() {
    console.log(this.daysInMonth);
  },
};
</script>

<style scoped>
.week-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1.2rem;
  margin-bottom: 10px;
  color: #888888;
}

.week-days span {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
}

.month-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1.2rem;
}

.month-day {
  width: 30px;
  height: 30px;
  display: inline-block;
  padding: 5px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  color: inherit;
}

.today {
  border: 1px solid #5ca9dd;
  border-radius: 50%;
}

.selected {
  background-color: #eaeaea;
  font-weight: bold;
  color: #505050;
}
</style>
