<template>
  <div v-if="show" class="calendar-time">
    <span for="time">Cas od</span>
    <div class="time">
      <input
        class="digits"
        placeholder="00"
        type="number"
        v-model="hours"
        min="0"
        :max="isUSTime() ? '12' : '24'"
        maxlength="2"
        @change="handleDigits($event, 'hours')"
        @keypress.prevent
      />
      :
      <input
        class="digits"
        placeholder="00"
        type="number"
        v-model="minutes"
        min="0"
        max="59"
        pattern="\d*"
        maxlength="2"
        @change="handleDigits($event, 'minutes')"
      />
      :
      <input
        class="digits"
        placeholder="00"
        type="number"
        min="0"
        max="59"
        maxlength="2"
        v-model="seconds"
        @change="handleDigits($event, 'seconds')"
      />
    </div>
    <div class="time" v-if="isUSTime()">
      <span class="midday" @click="midday = midday === 'am' ? 'pm' : 'am'">{{
        midday.toUpperCase()
      }}</span>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "CalendarTime",
  props: {
    show: Boolean,
  },
  data() {
    return {
      locale: moment.locale(),
      time: moment().format("hh:mm:ss"),
      hours: "",
      minutes: "",
      seconds: "",
      midday: "am",
    };
  },
  mounted() {
    console.log(moment.locale());
  },
  methods: {
    handleDigits(event, type) {
      const digits = event.target.value;
      if (digits.length > 2) return;
      if (digits.length < 2) this[type] = "0" + event.target.value;

      this.$emit(
        "time",
        `${this.hours || "00"}:${this.minutes || "00"}:${
          this.seconds || "00"
        }` + `${this.isUSTime() && " " + this.midday}`
      );
    },
    isUSTime() {
      return this.locale === "us";
    },
  },
};
</script>

<style>
.time {
  display: inline;
  border: 1px solid #e5e4e2;
  border-radius: 5px;
  padding: 10px 20px;
  outline: none;
  margin-left: 10px;
}

.digits {
  width: 30px;
  padding: 0;
  margin: 0;
  border: none;
  text-align: center;
  outline: none;
}

.midday {
  cursor: pointer;
}
</style>
