import axios from "axios";

const BASE_URL = "http://localhost:3001/";
class WordApi {
  lookUp = (word?: string) => {
    const url = BASE_URL + "lookUp/" + word;
    console.log(url);
    return axios
      .get(url)
      .then((response) => response.data)
      .catch(function (error) {
        console.log(error);
      });
  };
  search = (word?: string) => {
    const url = BASE_URL + "search/" + word;
    console.log(url);
    return axios
      .get(url)
      .then((response) => response.data)
      .catch(function (error) {
        console.log(error);
      });
  };

  symnonym = (word?: string) => {
    const url = "https://tuna.thesaurus.com/pageData/" + word;
    console.log(url);
    return axios
      .get(url)
      .then((response) => response.data)
      .catch(function (error) {
        console.log(error);
      });
  };

  recent = () => {
    const url = BASE_URL + "recent";
    console.log(url);
    return axios
      .get(url)
      .then((response) => response.data)
      .catch(function (error) {
        console.log(error);
      });
  };

  favorite = () => {
    const url = BASE_URL + "favorite";
    console.log(url);
    return axios
      .get(url)
      .then((response) => response.data)
      .catch(function (error) {
        console.log(error);
      });
  };

  like = (word?: string) => {
    const url = BASE_URL + "like/" + word;
    console.log(url);
    return axios
      .put(url, {
        word,
      })
      .then((response) => response.data)
      .catch(function (error) {
        console.log(error);
      });
  };

  unlike = (word?: string) => {
    const url = BASE_URL + "unlike/" + word;
    console.log(url);
    return axios
      .put(url, {
        word,
      })
      .then((response) => response.data)
      .catch(function (error) {
        console.log(error);
      });
  };

  add = (
    word?: string,
    pronunciation?: string,
    meaning?: string,
    synonym?: string,
    antonyms?: string
  ) => {
    const url = BASE_URL + "add";
    console.log(url);
    return axios
      .post(url, {
        word,
        pronunciation,
        meaning,
        synonym,
        antonyms,
      })
      .then((response) => response.data)
      .catch(function (error) {
        console.log(error);
      });
  };

  update = (
    oldWord?: string,
    word?: string,
    pronunciation?: string,
    meaning?: string,
    synonym?: string,
    antonyms?: string
  ) => {
    const url = BASE_URL + "update/" + oldWord;
    console.log(url);
    return axios
      .put(url, {
        word,
        pronunciation,
        meaning,
        synonym,
        antonyms,
      })
      .then((response) => response.data)
      .catch(function (error) {
        console.log(error);
      });
  };

  delete = (word?: string) => {
    const url = BASE_URL + "delete/" + word;
    console.log(url);
    return axios
      .delete(url)
      .then((response) => response.data)
      .catch(function (error) {
        console.log(error);
      });
  };
}

const wordApi = new WordApi();
export default wordApi;
