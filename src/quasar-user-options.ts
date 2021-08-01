import "./styles/quasar.scss";
import lang from "quasar/lang/fr.js";
import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/material-icons-outlined/material-icons-outlined.css";
import "@quasar/extras/material-icons-round/material-icons-round.css";
import "@quasar/extras/material-icons-sharp/material-icons-sharp.css";
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css";
import "@quasar/extras/ionicons-v4/ionicons-v4.css";
import "@quasar/extras/eva-icons/eva-icons.css";
import { Notify } from "quasar";

// To be used on app.use(Quasar, { ... })
export default {
  config: {},
  plugins: { Notify: Notify },
  lang: lang,
};
