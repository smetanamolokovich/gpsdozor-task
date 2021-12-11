<template>
  <div class="calendar-body">
    <CalendarGrid
      :daysInMonth="days"
      :today="today"
      :weekDays="weekDays"
      :selectedWeekDays="weekRange"
    />
  </div>
</template>

<script>
import moment from "moment";
import CalendarGrid from "./CalendarGrid";

export default {
  name: "CalendarBody",
  components: { CalendarGrid },
  props: {
    year: String,
    month: String,
    selectedWeeks: Object,
  },
  data() {
    return {
      daysOfMonth: moment().daysInMonth(),
      today: moment().format("YYYY-MM-DD"),
      days: [],
      weekDays: moment.weekdaysMin(true),
      weekRange: [],
    };
  },
  watch: {
    month(newVal) {
      this.createCalendar(newVal);
    },
    year(newVal) {
      this.createCalendar(this.month, newVal);
    },
    selectedWeeks(newVal) {
      this.createCalendar();
      this.weekRange = [];
      this.weekRange = this.generateWeekRange(newVal);

      if (this.weekRange.length) {
        for (let i = 0; i < this.weekRange.length; i++) {
          for (let j = 0; j < this.days.length; j++) {
            if (moment(this.weekRange[i]).isSame(this.days[j].date)) {
              this.days[j].selected = true;

              break;
            }
          }
        }
      }
    },
  },
  mounted() {
    this.createCalendar();
  },
  methods: {
    createCalendar(month = this.month, year = this.year) {
      const currentMonthDays = this.createDaysForCurrentMonth(month, year);
      const previousMonthDays = this.createDaysForPreviousMonth(month, year);
      const nextMonthDays = this.createDaysForNextMonth(month, year);

      this.days = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
    },
    createDaysForCurrentMonth(month, year) {
      const numberOfDaysInMonth = moment(`${year}-${month}-01`).daysInMonth();

      return [...Array(numberOfDaysInMonth)].map((day, index) => {
        return {
          date: moment(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
          dayOfMonth: index + 1,
          isCurrentMonth: true,
          selected: false,
        };
      });
    },
    createDaysForPreviousMonth(month, year) {
      const currentMonthDays = this.createDaysForCurrentMonth(month, year);
      const firstDayOfTheMonthWeekday =
        moment(currentMonthDays[0].date).weekday() + 1;

      const previousMonth = moment(`${year}-${month}-01`).subtract(1, "month");

      const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
        ? firstDayOfTheMonthWeekday - 1
        : 6;

      const previousMonthLastMondayDayOfMonth = moment(currentMonthDays[0].date)
        .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
        .date();

      return [...Array(visibleNumberOfDaysFromPreviousMonth)].map(
        (day, index) => {
          return {
            date: moment(
              `${previousMonth.year()}-${previousMonth.month() + 1}-${
                previousMonthLastMondayDayOfMonth + index
              }`
            ).format("YYYY-MM-DD"),
            dayOfMonth: previousMonthLastMondayDayOfMonth + index,
            isCurrentMonth: false,
            selected: false,
          };
        }
      );
    },
    createDaysForNextMonth(month, year) {
      const currentMonthDays = this.createDaysForCurrentMonth(month, year);
      const lastDayOfTheMonthWeekday =
        moment(`${year}-${month}-${currentMonthDays.length}`).weekday() + 1;

      const nextMonth = moment(`${year}-${month}-01`).add(1, "month");

      const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
        ? 7 - lastDayOfTheMonthWeekday
        : lastDayOfTheMonthWeekday;

      return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
        return {
          date: moment(
            `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
          ).format("YYYY-MM-DD"),
          dayOfMonth: index + 1,
          isCurrentMonth: false,
          selected: false,
        };
      });
    },
    generateWeekRange(week) {
      const range = [];

      const from = moment(week.from);
      const to = moment(week.to);

      while (from.isSameOrBefore(to)) {
        range.push(from.format("YYYY-MM-DD"));
        from.add(1, "days");
      }

      return range;
    },
  },
};
</script>

<style scoped></style>
