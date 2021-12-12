<template>
  <select v-if="items.length" v-model="value" @change="$emit('value', value)">
    <option v-for="item in items" :key="item" :value="item">{{ item }}</option>
  </select>
</template>

<script>
export default {
  name: "calendar-selector",
  props: ["items", "selectedValue"],
  data() {
    return {
      value: "",
    };
  },
  mounted() {
    this.value = this.selectedValue;
  },
};
</script>

<style></style>
