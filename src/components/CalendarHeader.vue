<template>
  <div class="calendar-header">
    <button role="button" class="btn prev-btn">
      <font-awesome-icon icon="chevron-left" />
    </button>
    <div class="selectors">
      <select name="month" class="month mr-1">
        <option value="1">Leden</option>
      </select>
      <select name="year" class="year">
        <option value="2021">2021</option>
      </select>
    </div>
    <button role="button" class="btn next-btn">
      <font-awesome-icon icon="chevron-right" />
    </button>
  </div>
</template>

<script>
export default {
  name: "CalendarHeader",
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
