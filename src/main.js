import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCalendarAlt,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Calendar from "./components/Calendar";

Vue.config.productionTip = false;

library.add(faCalendarAlt);
library.add(faChevronLeft);
library.add(faChevronRight);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("v-calendar", Calendar);

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
