import axios from "axios";

let headers: {[header: string]: string} | undefined = undefined;
let baseURL = "https://dev-api-qa.nextologies.com/";

if (process.env["NODE_ENV"] === "development") {
    baseURL = "https://dev-api-qa.nextologies.com/";
    headers = {
        "X-AUTH-TOKEN": "qa89kC388lzLcssHpE9MmpQeUhcDpzNb2J0ngjCu",
    };
}

export default axios.create({baseURL, headers});
