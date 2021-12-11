<template>
  <div v-if="show" class="calendar-weeks">
    <div
      v-for="week in weeks"
      class="week"
      :id="week.weekNumber"
      :key="week.weekNumber"
      :style="{ gridTemplateRows: 'repeat(' + weeks.length + ', 1fr)' }"
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
    year: String,
    month: String,
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
      // element.childNodes.forEach(el => {
      //   if(this.selectedWeek === Number(el.id)) {
      //     el.classList.add('selected')
      //   }
      // });

      this.$emit("selectWeek", week);
    },
    calcWeeksList(year, month) {
      const weeks = [];
      let first, last;

      first = moment()
        .month(month - 1)
        .year(year)
        .startOf("month")
        .week();
      last = moment()
        .month(month - 1)
        .year(year)
        .endOf("month")
        .week();
      first = first <= 52 ? first : 0;

      for (let i = first; i <= last; i++) {
        weeks.push({
          weekNumber: i,
          from: moment()
            .month(month - 1)
            .year(year)
            .week(i)
            .startOf("week"),
          to: moment()
            .month(month - 1)
            .year(year)
            .week(i)
            .endOf("week"),
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
  grid-gap: 1.9rem;
  padding: 7px;
}

.week {
  cursor: pointer;
}

.selected {
  color: #5ca9dd;
}
</style>
