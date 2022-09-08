import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router/index";
import { pinia } from "@/store";
import "@/permission";
import "@/style/index.scss";
import { pluginRegister } from "@/plugins/index";
const app = createApp(App);

pluginRegister(app);
app.use(router);
app.use(pinia);

app.mount("#app");
