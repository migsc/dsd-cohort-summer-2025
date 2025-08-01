import { momentLocalizer } from "react-big-calendar";
import moment from "moment-timezone";

moment.tz.setDefault("Texas");
const localizer = momentLocalizer(moment);

export default localizer;
