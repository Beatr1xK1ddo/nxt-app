import axios from "axios";
import {getCookieValue} from "@nxt-ui/shared/utils";

const headers: {[header: string]: string} = {};
const authToken = "fa1c8a-252847-4b5b04-dec";

if (authToken) {
    headers["X-AUTH-TOKEN"] = authToken;
}

const instance = axios.create({
    baseURL: "https://qa.nextologies.com/",
    headers,
});
export default instance;
