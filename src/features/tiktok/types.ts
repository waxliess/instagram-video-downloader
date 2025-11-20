export type TikTokVideo = {
  code: number;
  msg: string;
  processed_time: number;
  data: {
    id: string;
    region: string;
    title: string;
    cover: string;
    origin_cover: string;
    duration: number;
    play: string;
    wmplay: string;
    hdplay: string;
    music: string;
    music_info: {
      id: string;
      title: string;
      play: string;
      cover: string;
      author: string;
      original: boolean;
      duration: number;
      album: string;
    };
    author: {
      id: string;
      unique_id: string;
      nickname: string;
      avatar: string;
    };
  };
};
