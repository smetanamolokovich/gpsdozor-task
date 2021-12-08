<template>
  <div class="calendar">
    <div class="calendar-container">
      <div class="calendar-side">
        <CalendarWeeks :show="showWeeks" />
      </div>
      <div class="calendar-main">
        <CalendarHeader />
        <div class="calendar-body">Body</div>
        <div class="calendar-footer">Footer</div>
      </div>
    </div>
  </div>
</template>

<script>
import CalendarHeader from "./CalendarHeader";
import CalendarWeeks from "./CalendarWeeks";

export default {
  name: "v-calendar",
  components: { CalendarHeader, CalendarWeeks },
  props: {},
  data() {
    return {
      showWeeks: false,
    };
  },
};
</script>

<style>
.calendar {
  max-width: 500px;
  max-height: 500px;
  border-radius: 15px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 20px;
  color: #333333;
}

.calendar-container {
  display: flex;
}

.calendar-side {
}

.calendar-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
