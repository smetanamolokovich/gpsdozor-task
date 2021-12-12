<template>
  <div class="calendar-header">
    <button role="button" class="btn prev-btn" @click="prevMonth">
      <font-awesome-icon icon="chevron-left" />
    </button>
    <div class="selectors">
      <select
        v-if="months.length"
        name="month"
        class="month mr-1"
        v-model="currentMonth"
        @change="$emit('month', currentMonth)"
      >
        <option v-for="(month, idx) in months" :key="month" :value="idx">
          {{ month[0].toUpperCase() + month.slice(1) }}
        </option>
      </select>

      <select
        v-if="years.length"
        name="year"
        class="year"
        v-model="currentYear"
        @change="$emit('year', currentYear)"
      >
        <option v-for="year in years" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
    </div>
    <button role="button" class="btn next-btn" @click="nextMonth">
      <font-awesome-icon icon="chevron-right" />
    </button>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "CalendarHeader",
  props: {
    year: Number,
    month: Number,
    minYear: Number,
  },
  data() {
    return {
      years: [],
      months: [],
      currentYear: "",
      currentMonth: "",
      maxYear: moment().year(),
    };
  },
  mounted() {
    this.years = this.generateYears();
    this.months = moment.months();
    this.currentYear = this.year;
    this.currentMonth = this.month;
  },
  methods: {
    generateYears() {
      const years = [];
      const range = this.maxYear - this.minYear;
      for (let i = 0; i <= range; i++) {
        years.push(this.minYear + i);
      }

      return years;
    },
    prevMonth() {
      const sub = moment([this.currentYear, this.currentMonth, 1]).subtract(
        1,
        "months"
      );

      if (this.years.includes(sub.years())) {
        this.$emit("navigate-date", "subtract");
        this.currentMonth = sub.months();
        this.currentYear = !this.years.includes(sub.years())
          ? this.currentYear
          : sub.years();
      }
    },
    nextMonth() {
      const add = moment([this.currentYear, this.currentMonth, 1]).add(
        1,
        "months"
      );

      if (this.years.includes(add.years())) {
        this.$emit("navigate-date", "add");
        this.currentMonth = add.months();
        this.currentYear = !this.years.includes(add.years())
          ? this.currentYear
          : add.years();
      }
    },
  },
};
</script>

<style scoped>
.calendar-header {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.btn {
  border: none;
  cursor: pointer;
  outline: none;
  background-color: transparent;
}
.selectors > select {
  position: relative;
  cursor: pointer;
  color: inherit;

  font-size: 18px;
  border: none;
  background-color: transparent;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding-right: 20px;

  background-image: url("https://cdn-icons-png.flaticon.com/512/57/57055.png");
  background-repeat: no-repeat;
  background-position: calc(100% - 3px) center;
  background-size: 10px;
}

.month {
  font-weight: bold;
}
.year {
  font-weight: unset;
}
</style>
