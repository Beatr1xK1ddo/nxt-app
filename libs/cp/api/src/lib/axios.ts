import axios from "axios";
import {getCookieValue} from "@nxt-ui/shared/utils";

const headers: {[header: string]: string} = {};
const authToken = getCookieValue("v2ApiUserToken");
// const authToken = "fd1c49-0bedd1-698d20-e98";

if (authToken) {
    headers["X-AUTH-TOKEN"] = authToken;
}

const instance = axios.create({
    baseURL: "https://qa.nextologies.com/",
    headers,
});
export default instance;
