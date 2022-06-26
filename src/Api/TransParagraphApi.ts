import axios from "axios";

const BASE_URL = "https://dictionary-server-app.herokuapp.com/words/"
class TransParagraphApi {
  trans = (text?: string, source?: string, target?: string) => {
    const url = "https://script.google.com/macros/s/AKfycbyYd8VhpEnQ057AURLU6ASgE7c5pdcBHpL47-zs_7tCB3ekgR8S/exec?q=" + text + "&target=" +target + "&source=" + source;
    console.log(url);
    return axios
      .get(
        url,
      )
      .then((response) => response.data)
      .catch(function(error) {
        console.log(error)})
  };
}

const transParagraphApi = new TransParagraphApi();
export default transParagraphApi;