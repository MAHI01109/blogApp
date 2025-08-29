import axios from "@/api/axios";
import { useState } from "react";

function usePost({ url, data }: { url: string; data: any }) {
  const [message, setmessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const postdata = async () => {
    try {
      const response: any = await axios.post(url, data);
      if (!response.status === 201) throw new Error("something went worng");
      setmessage(response.data.message);
    } catch (error: any) {
      console.log(error.message);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  postdata();
  return { message, error, loading };
}

export default usePost;
