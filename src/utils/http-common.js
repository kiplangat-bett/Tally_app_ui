import axios from "axios";

export default axios.create({
  baseURL: "https://usawagenda.herokuapp.com",
  // baseURL: "http://localhost:2222",

});
