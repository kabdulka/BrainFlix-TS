

export interface VideosDataType {

    id: string
    title: string
    channel: string
    image: string
}

export interface NewVideo {
  title: string
  description: string
}

export interface newComment {
  comment: string
}

export interface CommentType {
  id: string
  name: string
  comment: string
  likes: number
  timestamp: number
}

// export interface CondensedVideoType {
//   id: string
//   title: string
//   channel: string
//   image: string
// }

export interface VideoType {
  id: string
  title: string
  channel: string
  image: string
  description: string
  views: string
  likes: number | string
  duration: string
  video: string
  timestamp: number
  comments: CommentType[]
}