import App from "./src/index";
import Moment from "react-moment";
import moment from "moment";

Moment.globalMoment = moment;
Moment.globalLocale = "ko";
Moment.globalLocal = true;
Moment.globalFormat = "YYYY-MM-DD HH:mm:ss";

export default App;
