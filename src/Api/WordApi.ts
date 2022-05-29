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

//   districtRegist = (
//     token?: string,
//     permission?: string,
//     name?: string,
//     id?: string
//   ) => {
//     const url = "/district";
//     return axiosClient
//       .post(
//         url,
//         { permission, name, id },
//         {
//           headers: { Authorization: "Bearer " + token },
//         }
//       )
//       .then((response) => response.data);
//   };

//   districtDelete = (token?: string, id?: any) => {
//     const url = "/district/" + id;
//     return axiosClient
//       .delete(url, {
//         headers: { Authorization: "Bearer " + token },
//       })
//       .then((response) => response.data);
//   };

//   districtUpdate = (
//     token?: string,
//     permissionModal?: any,
//     permission?: any,
//     name?: string,
//     id?: string
//   ) => {
//     const url = "/district/" + permissionModal;
//     return axiosClient
//       .put(
//         url,
//         {
//           permission,
//           name,
//           id,
//         },
//         {
//           headers: { Authorization: "Bearer " + token },
//         }
//       )
//       .then((response) => response.data);
//   };
}

const wordApi = new WordApi();
export default wordApi;