import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../config/navigator";

// const SERVER_URL = "https://www.kkiri.site/api";
const SERVER_URL = "https://api.dev.kkiri-diary.co.kr";

const apiClient = axios.create({
    baseURL: SERVER_URL,
    headers: {
        Authorization: ""
    }
});

function getKey() {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem("userKey", (err, result) => {
            resolve(result);
        });
    });
}

apiClient.interceptors.request.use(
    async function (config) {
        // 요청을 보내기 전에 수행할 일
        const key = await getKey();

        config.headers = {
            Authorization: key
        };
        if (!key) {
            throw "error";
        }

        return config;
    },
    function (error) {
        // 오류 요청을 보내기전 수행할 일
        navigate("Login", null);
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    async function (response) {
        const key = response.headers.authorization;

        try {
            await AsyncStorage.setItem("userKey", key || "");
        } catch (error) {
            console.log(error);
        }
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export { apiClient, SERVER_URL };
