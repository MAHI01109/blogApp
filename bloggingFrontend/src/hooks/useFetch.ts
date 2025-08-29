import axios from "@/api/axios";
import { useState, useEffect } from "react";

function useFetch({ url }: { url: string }) {
  console.log(url, "url");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        if (!response.status === 200) throw new Error("Error fetching data");
        const result = response.data.result;
        setData(result);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
