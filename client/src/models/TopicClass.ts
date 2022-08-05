class TopicClass {
  id: number;
  title: string;
  filename: string;
  data: any;
  size: number;
  mimetype: string;
  md5: string;
  file?: File;

  constructor(
    id: number,
    title: string,
    filename: string,
    data: any,
    size: number,
    mimetype: string,
    md5: string,
  ) {
    this.id = id;
    this.title = title;
    this.filename = filename;
    this.data = data;
    this.size = size;
    this.mimetype = mimetype;
    this.md5 = md5;
  }
}

export type TopicRequest = {
  title: string;
  file: File;
};

// export const convertTopicClassToRequest = (topic: TopicClass): TopicRequest => {
//   return {
//     title: topic.title,
//     file: topic.file,
//   };
// };

export default TopicClass;
