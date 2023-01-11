import axios from "axios";
import {apiHost} from "../../configs/app";
import store from "../../lib/ReduxStore/store";
import {setAccessToken} from "../../lib/ReduxStore/ActionsCreators/AccessTokenActionsCreator";

const axiosClient = axios.create({
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }
    })

axiosClient.interceptors.request.use((config)=>{
        // @ts-ignore
        config.headers.Authorization = `Bearer ${store.getState().accessToken.accessToken}`;
        return config;
    })

axiosClient.interceptors.response.use((config)=>config, (async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get(apiHost+"/api/token/refresh-access-token", {withCredentials: true});
                store.dispatch(setAccessToken(response.data));
                return axiosClient.request(originalRequest);
            } catch (e) {
                console.log("Пользователь не авторизован");
            }
        }

        if (error.response.status === 401) {
            window.location.replace(apiHost+"/sign-in");
        }
        throw error;
    }));

export default axiosClient;