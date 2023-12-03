import axios from "axios";

const fetchVideos = async ({ queryKey }) => {
    const request = queryKey[1];
    const API_URL = import.meta.env.VITE_API_URL;
    const apiRes = await axios.get(`${API_URL}/${request}`);
    if (!apiRes) {
        throw new Error(`videos fetch not okay`);
    }
    return apiRes.data;
}

export default fetchVideos;