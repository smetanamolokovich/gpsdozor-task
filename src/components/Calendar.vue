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
          @month="handleMonthChange"
          @year="handleYearChange"
          :year="currentYear"
          :month="currentMonth"
        />
        <div class="hr"></div>
        <CalendarBody
          :year="currentYear"
          :month="currentMonth"
          :selectedWeeks="selectedWeeks"
        />
        <CalendarFooter :show="showFooter" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import CalendarHeader from "./CalendarHeader";
import CalendarFooter from "./CalendarFooter";
import CalendarBody from "./CalendarBody";
import CalendarWeeks from "./CalendarWeeks";

export default {
  name: "v-calendar",
  components: { CalendarHeader, CalendarBody, CalendarFooter, CalendarWeeks },
  data() {
    return {
      currentYear: moment().format("YYYY"),
      currentMonth: moment().format("M"),
      showSide: true,
      showFooter: false,
      locale: "cs",
      dow: 1,
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
    handleMonthChange(month) {
      this.currentMonth = month;
    },
    handleYearChange(year) {
      this.currentYear = year;
    },
    handleSelectWeek(week) {
      this.selectedWeeks = week;
    },
  },
};
</script>

<style>
.calendar {
  width: 500px;
  min-width: 450px;
  max-height: 450px;
  border-radius: 15px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 30px;
  color: #505050;
}

.calendar-container {
  display: flex;
}

.calendar-side {
  min-width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.calendar-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
