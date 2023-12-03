import axios from "axios";
import { getRandomVid } from "../util/helpers";

export const fetchVideo = async ({ queryKey }) => {

    const API_URL = import.meta.env.VITE_API_URL;
    const [_, request, videoId, videos] = queryKey;

    if (!videoId) {
        const randNum = getRandomVid(videos?.length);
        const currentVidId = videos[randNum]?.id
        const apiRes = await axios.get(`http://localhost:5500/${request}/${currentVidId}`);

        if (!apiRes) {
            throw new Error(`vvideoIdeo fetch not okay`);
        }
        return apiRes.data;

    } else {
        const apiRes = await axios.get(`http://localhost:5500/${request}/${videoId}`);
        if (!apiRes) {
            throw new Error(`vvideoIdeo fetch not okay`);
        }
        console.log(apiRes.data);
        return apiRes.data;
    }
}

