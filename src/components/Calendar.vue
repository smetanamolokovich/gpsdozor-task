<template>
  <div class="calendar">
    <div class="calendar-container">
      <div class="calendar-side">
        <CalendarWeeks
          :show="showSide"
          :year="currentYear"
          :month="currentMonth"
          @selectWeek="handleSelectWeek"
        />
      </div>
      <div class="calendar-main">
        <CalendarHeader
          @navigate-date="handleNavigate"
          @month="handleMonthChange"
          @year="handleYearChange"
          :year="currentYear"
          :month="currentMonth"
          :minYear="2018"
        />

        <div class="hr"></div>

        <CalendarGrid
          :year="currentYear"
          :month="currentMonth"
          :selectedWeeks="selectedWeeks"
          @piked-dates="handlePikedDates"
        />
      </div>
    </div>
    <div class="calendar-footer">
      <CalendarTime :show="showFooter" @time="handleTime" />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import CalendarHeader from "./CalendarHeader";
import CalendarTime from "./CalendarTime";
import CalendarGrid from "./CalendarGrid";
import CalendarWeeks from "./CalendarWeeks";

export default {
  name: "v-calendar",
  components: { CalendarHeader, CalendarGrid, CalendarTime, CalendarWeeks },
  data() {
    return {
      currentYear: moment().year(),
      currentMonth: moment().month(),
      showSide: true,
      showFooter: true,
      locale: "cs",
      dow: 1, // first day of week from 1 (monday) to 7 (sunday)
      selectedWeeks: null,
    };
  },
  created() {
    moment.updateLocale(this.locale, {
      week: {
        dow: this.dow,
      },
    });
  },
  methods: {
    updateValue(key, value) {
      this.$emit("input", { ...this.value, [key]: value });
    },
    handleMonthChange(month) {
      this.currentMonth = month;
    },
    handleYearChange(year) {
      this.currentYear = year;
    },
    handleNavigate(type) {
      const operator = moment([this.currentYear, this.currentMonth, 1])[type](
        1,
        "months"
      );
      this.currentMonth = operator.month();
      this.currentYear = operator.year();
    },
    handleSelectWeek(week) {
      this.selectedWeeks = week;
    },
    handleTime(time) {
      console.log(time);
    },
    handlePikedDates(dates) {
      console.log(dates);
    },
  },
};
</script>

<style>
.calendar {
  max-width: 550px;
  max-height: 550px;
  border-radius: 15px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 30px;
  color: #505050;
}

.calendar-container {
  display: flex;
  width: 100%;
  height: 100%;
}

.calendar-side {
  min-width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 15px;
}

.calendar-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.calendar-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

.text-muted {
  color: #a9a9a9 !important;
}

.hr {
  border-bottom: 1px solid #e5e4e2;
  width: 100%;
  margin: 1.5rem 0;
}
.mr-1 {
  margin-right: 1rem;
}
.mr-2 {
  margin-right: 2rem;
}
.mr-3 {
  margin-right: 3rem;
}
</style>
