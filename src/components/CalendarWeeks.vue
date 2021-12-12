<template>
  <div v-if="show" class="calendar-weeks">
    <div
      v-for="week in weeks"
      class="week"
      :id="week.weekNumber"
      :key="week.weekNumber"
      :style="{ gridTemplateRows: 'repeat(' + weeks.length + ', 1fr)' }"
      :class="{ selected: selectedWeek === week.weekNumber }"
      @click="handleClick(week, $el)"
    >
      {{ week.weekNumber }}. tyden
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "CalendarWeeks",
  props: {
    show: Boolean,
    year: Number,
    month: Number,
  },
  data() {
    return {
      weeks: [],
      selectedWeek: null,
    };
  },
  watch: {
    year(newVal) {
      this.weeks = this.calcWeeksList(newVal, this.month);
    },
    month(newVal) {
      this.weeks = this.calcWeeksList(this.year, newVal);
    },
  },
  mounted() {
    this.weeks = this.calcWeeksList(this.year, this.month);
  },
  methods: {
    handleClick(week) {
      this.selectedWeek = week.weekNumber;
      this.$emit("selectWeek", week);
    },
    calcWeeksList(year, month) {
      const weeks = [];
      let first, last;
      const date = moment([year, month, 1]);

      first = moment(date).startOf("month").startOf("week").weeks();
      last = moment(date).endOf("month").endOf("week").weeks();
      first = first <= moment(date).weeksInYear() ? first : 1;
      last = last === 1 ? 53 : last;

      for (let i = first; i <= last; i++) {
        weeks.push({
          weekNumber: i,
          from: moment(date).weeks(i).day(1),
          to: moment(date).weeks(i).day(7),
        });
      }

      return weeks;
    },
  },
};
</script>

<style>
.calendar-weeks {
  display: grid;
  grid-gap: 2.1rem;
  padding: 7px;
  text-align: center;
}

.week {
  cursor: pointer;
  font-size: 15px;
}

.selected {
  color: #5ca9dd;
  font-weight: bold;
}
</style>
