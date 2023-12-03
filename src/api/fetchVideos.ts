import axios from "axios";

const fetchVideos = async ({ queryKey }) => {
    const request = queryKey[1];
    const apiRes = await axios.get(`http://localhost:5500/${request}`);
    if (!apiRes) {
        throw new Error(`videos fetch not okay`);
    }
    return apiRes.data;
}

export default fetchVideos;