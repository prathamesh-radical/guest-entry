import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "react-native-config";

export default function useFetch(apiEndpoint, refreshKey) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const token = await AsyncStorage.getItem("token");
                const id = await AsyncStorage.getItem("id");
                const response = await fetch(Config.BACKEND_URL + apiEndpoint + `?user_id=${Number(id)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const result = await response.json();

                if (!response.ok) throw new Error(result.message || `Failed to fetch data from ${apiEndpoint}`);

                const responseMapping = {
                    "/api/apartment": result.apartment,
                    "/api/flat": result.flat,
                    "/api/visitor": result.visitor,
                    "/api/user": result.user,
                };

                setData(responseMapping[apiEndpoint] || result);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [apiEndpoint, refreshKey]);

    return { data, error, loading };
}