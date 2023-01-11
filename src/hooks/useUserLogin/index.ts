import {useEffect, useState} from "react";
import axiosClient from "../../helpers/axios";

const useAxios = (url: string, method: string, payload: any) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const response = await axiosClient.request({
                    data: payload,
                    method,
                    url
                });

                setData(response.data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoaded(true);
            }
        })();
    }, []);

    return { data, error, loaded };
}

export default useAxios;