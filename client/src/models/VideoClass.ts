class VideoClass {
    id: number;
    title: string;
    author: string;
    description: string;
    url: string;
    length: number;

    constructor(id: number, title: string, author: string, description: string, url: string, length: number) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.url = url;
        this.length = length;
    }
}

export default VideoClass