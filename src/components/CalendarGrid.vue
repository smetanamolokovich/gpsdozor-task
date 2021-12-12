<template>
  <div class="calendar-grid">
    <div class="week-days">
      <span v-for="day in weekDays" :key="day" class="text-muted">
        {{ day.toUpperCase() }}
      </span>
    </div>
    <div class="month-days">
      <div class="row" v-for="(row, i) in rows" :key="i">
        <div
          class="wrapper"
          v-for="day in row"
          :key="day.daysOfMonth"
          :class="{
            today: isToday(day.date),
            'text-muted': !day.isCurrentMonth,
            hover: isBetween(day.date) || isHovered(day.date),
            ['under-selected-' + day.dayOfMonth]: isSelected(day.date),
          }"
          @mouseover="hover(day.date)"
          @mouseleave="out()"
        >
          <div class="cell" :class="{ selected: isSelected(day.date) }">
            <button class="month-day" @click="pickDates(day.date)">
              {{ day.dayOfMonth }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "CalendarGrid",
  props: {
    year: Number,
    month: Number,
    selectedWeeks: Object,
  },
  data() {
    let d = moment();
    return {
      daysOfMonth: moment().daysInMonth(),
      today: moment(),
      days: [],
      weekDays: moment.weekdaysMin(true),
      weekRange: [],
      pickedDate: d,
      selectEndDate: false,
      endDate: d,
      hoverEndDate: d,
      format: "YYYY-MM-DD",
    };
  },
  computed: {
    rows() {
      return this.days.reduce(function (p, c, i) {
        if (i % 7 === 0) {
          p[p.length] = [];
        }
        p[p.length - 1].push(c);
        return p;
      }, []);
    },
  },
  mounted() {
    this.createCalendar();
    console.log(this.rows);
  },
  watch: {
    month(newVal) {
      this.createCalendar(newVal + 1);
    },
    year(newVal) {
      this.createCalendar(this.month + 1, newVal);
    },
    selectedWeeks({ from, to }) {
      console.log({ from, to });

      this.pickedDate = from;
      this.endDate = to;
      this.hoverEndDate = to;
    },
  },
  methods: {
    isToday(d) {
      return moment(d.format(this.format)).isSame(
        this.today.format(this.format)
      );
    },
    isSelected(d) {
      return (
        d.isSame(this.pickedDate.format(this.format)) ||
        d.isSame(this.endDate.format(this.format))
      );
    },
    isBetween(d) {
      return (
        d.isAfter(this.pickedDate.format(this.format)) &&
        d.isBefore(this.endDate.format(this.format))
      );
    },
    isHovered(d) {
      return (
        d.isAfter(this.pickedDate.format(this.format)) &&
        d.isBefore(this.hoverEndDate.format(this.format))
      );
    },
    pickDates(d) {
      if (
        !this.selectEndDate ||
        d.isBefore(this.pickedDate.format(this.format))
      ) {
        this.endDate = d;
        this.pickedDate = d;
        this.selectEndDate = true;
        this.hoverEndDate = d;
      } else if (
        (this.selectEndDate &&
          d.isAfter(this.pickedDate.format(this.format))) ||
        d.isSame(this.pickedDate.format(this.format))
      ) {
        this.endDate = d;
        this.selectEndDate = false;
      }

      this.$emit("piked-dates", {
        from: this.pickedDate,
        to: !this.endDate.isSame(this.pickedDate.format(this.format))
          ? this.endDate
          : null,
      });
    },
    hover(d) {
      if (
        (this.selectEndDate &&
          d.isAfter(this.pickedDate.format(this.format))) ||
        d.isSame(this.pickedDate.format(this.format))
      ) {
        this.hoverEndDate = d;
      }
    },
    out() {
      this.hoverEndDate = this.pickedDate;
    },
    createCalendar(month = this.month + 1, year = this.year) {
      const currentMonthDays = this.createDaysForCurrentMonth(month, year);
      const previousMonthDays = this.createDaysForPreviousMonth(month, year);
      const nextMonthDays = this.createDaysForNextMonth(month, year);

      this.days = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
    },
    createDaysForCurrentMonth(month, year) {
      const numberOfDaysInMonth = moment(`${year}-${month}-01`).daysInMonth();

      return [...Array(numberOfDaysInMonth)].map((day, index) => {
        return {
          date: moment(`${year}-${month}-${index + 1}`),
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
            ),
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
          ),
          dayOfMonth: index + 1,
          isCurrentMonth: false,
          selected: false,
        };
      });
    },
  },
};
</script>

<style scoped>
.week-days {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
  color: #888888;
}

.week-days span {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  font-size: 16px;
}

.month-days {
}

.row {
  display: flex;
  margin: 10px 0;
  justify-content: center;
}

.month-day {
  width: 30px;
  height: 30px;
  display: inline-block;
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
  background-color: #5ca9dd;
  font-weight: bold;
  color: #ffffff !important;
  border-radius: 50%;
  z-index: 1;
}
.cell {
  padding: 5px;
}

div[class*="under-selected"]:nth-of-type(1) {
  background-color: #eaeaea;
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
}
div[class*="under-selected"]:last-of-type {
  background-color: #eaeaea;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
}
.hover {
  background-color: #eaeaea;
  color: #888888 !important;
  border-radius: unset;
  border: unset;
}
</style>
