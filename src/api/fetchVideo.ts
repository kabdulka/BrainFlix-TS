import axios from "axios";
import { getRandomVid } from "../util/helpers";

export const fetchVideo = async ({ queryKey }) => {

    const API_URL = import.meta.env.VITE_API_URL;
    const [_, request, videoId, videos] = queryKey;

    if (!videoId) {
        const randNum = getRandomVid(videos?.length);
        const currentVidId = videos[randNum]?.id
        const apiRes = await axios.get(`${API_URL}/${request}/${currentVidId}`);

        if (!apiRes) {
            throw new Error(`vvideoIdeo fetch not okay`);
        }
        return apiRes.data;

    } else {
        const apiRes = await axios.get(`${API_URL}/${request}/${videoId}`);
        if (!apiRes) {
            throw new Error(`vvideoIdeo fetch not okay`);
        }
        return apiRes.data;
    }
}

