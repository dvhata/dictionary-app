import axios from "axios";

const BASE_URL = "https://dictionary-server-app.herokuapp.com/words/"
class WordApi {
  lookUp = (word?: string) => {
    const url = BASE_URL + "lookUp/" + word;
    console.log(url);
    return axios
      .get(
        url,
      )
      .then((response) => response.data)
      .catch(function(error) {
        console.log(error)})
  };
  search = (word?: string) => {
    const url = BASE_URL + "search/" + word;
    console.log(url);
    return axios
      .get(
        url,
      )
      .then((response) => response.data)
      .catch(function(error) {
        console.log(error)})
  };

  symnonym = (word?: string) => {
    const url = "https://tuna.thesaurus.com/pageData/" + word;
    console.log(url);
    return axios
      .get(
        url,
      )
      .then((response) => response.data)
      .catch(function(error) {
        console.log(error)})
  };

  recent = () => {
    const url = BASE_URL + "recent";
    console.log(url);
    return axios
      .get(
        url,
      )
      .then((response) => response.data)
      .catch(function(error) {
        console.log(error)})
  };

  favorite = () => {
    const url = BASE_URL + "favorite";
    console.log(url);
    return axios
      .get(
        url,
      )
      .then((response) => response.data)
      .catch(function(error) {
        console.log(error)})
  };

  like = (word?: string) => {
    const url = BASE_URL + "like/" + word;
    console.log(url);
    return axios
      .put(
        url, {
          word
        }
      )
      .then((response) => response.data)
      .catch(function(error) {
        console.log(error)})
  };

  add = (word?: string, pronunciation?: string, meaning?:string) => {
    const url = BASE_URL + "add/";
    console.log(url);
    return axios
      .post(
        url, {
          word, pronunciation, meaning
        }
      )
      .then((response) => response.data)
      .catch(function(error) {
        console.log(error)})
  };
}

const wordApi = new WordApi();
export default wordApi;