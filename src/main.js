import { createApp } from "vue";
import App from "./App.vue";
import "./styles/index.scss";
import router from "@/router";
import mLibs from "./libs";
import mComponents from "./components";
import "virtual:svg-icons-register";
import { useREM } from "./utils/flexible.js";
import store from "./store/index.js";

useREM();
createApp(App).use(router).use(store).use(mLibs).use(mComponents).mount("#app");
