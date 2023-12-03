import axios, { AxiosResponse } from 'axios';

export const request = 'videos';

interface VideosDataType {
  id: string;
  title: string;
  channel: string;
  image: string;
}

interface Comment {
  id: string;
  name: string;
  comment: string;
  likes: number;
  timestamp: number;
}

interface VideoType {
  id: string;
  title: string;
  channel: string;
  image: string;
  description: string;
  views: string;
  likes: number | string;
  duration: string;
  video: string;
  timestamp: number;
  comments: Comment[];
}

export class ApiService {
  private API_URL: string;
  private request: string;

  constructor() {
    this.API_URL = 'http://localhost:5500';
    this.request = 'videos';
    // headers
  }

  public async getVideos(): Promise<VideosDataType[]> {
    try {
      const response: AxiosResponse<VideosDataType[]> = await axios.get(`${this.API_URL}/${this.request}`);
      return response.data;
    } catch (error) {
      throw new Error(`Videos API error: ${error}`);
    }
  }

  public async getCurrentVideo(id: string): Promise<VideoType> {
    try {
      const response: AxiosResponse<VideoType> = await axios.get(`${this.API_URL}/${this.request}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Videos API error: ${error}`);
    }
  }

  public async postComment(videoId: string, newComment): Promise<AxiosResponse<any, any>> {
    const postCommentUrl = `${this.API_URL}/${this.request}/${videoId}/comments`;
    try {
      const postVideo = await axios.post(postCommentUrl, newComment);
      return postVideo;
    } catch (error) {
      throw new Error(`Comment post error: ${error}`);
    }
  }

  public async deleteComment(videoId: string, commentId: string): Promise<void> {
    const deleteCommentUrl = `${this.API_URL}/${this.request}/${videoId}/comments/${commentId}`;
    try {
      await axios.delete(deleteCommentUrl);
    } catch (error) {
      throw new Error(`Delete comment error: ${error}`);
    }
  }

  public async likeVideo(videoId: string): Promise<void> {
    const likevideoURL = `${this.API_URL}/${request}/${videoId}/likes`;
    try {
        await axios.put(likevideoURL);
    } catch (error) {
        throw new Error(`Like video error: ${error}`);
    }
  }

  public async postVideo(newvideo) {
    const postVideoUrl = `${this.API_URL}/videos`;
    const headers = {
        "Content-Type": "multipart/form-data"
    }

    try {
        await axios.post(
            postVideoUrl,
            newvideo,
            {headers}
        );
    } catch (error) {
        throw new Error(`Post video error: ${error}`);
    }
  }

}
