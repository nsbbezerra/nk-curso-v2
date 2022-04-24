import axios from "axios";
import { configs } from ".";

const api = axios.create({
  baseURL: configs.api_url,
});

export { api };
