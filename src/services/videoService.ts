import { PrismaClient, Video } from "@prisma/client";
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const prisma = new PrismaClient();

const createVideo = async (body: Video) => {
  const createdVideo = prisma.video.create({
    data: {
      author: body.author,
      description: body.description,
      length: body.length,
      title: body.title,
      url: body.url,
    },
  });
  return createdVideo;
};

const findAll = async () => {
  const videos = prisma.video.findMany();
  return videos;
};

const findById = async (videoId: number) => {
  const video = await prisma.video.findUnique({
    where: {
      id: videoId,
    },
  });
  if (!video) {
    throw new ApiError(
      `Video with id ${videoId} not found`,
      httpStatus.NOT_FOUND
    );
  }
  return video;
};

const deleteVideo = async (videoId: number) => {
  await findById(videoId);
  return prisma.video.delete({
    where: {
      id: videoId,
    },
  });
};

const updateVideo = async (videoId: number, updateBody: Video) => {
  let video: any = await findById(videoId);
  video = prisma.video.update({
    where: { id: videoId },
    data: {
      author: updateBody.author,
      description: updateBody.description,
      length: updateBody.length,
      title: updateBody.title,
      url: updateBody.url,
    },
  });
  return video;
};

module.exports = {
  createVideo,
  findAll,
  findById,
  deleteVideo,
  updateVideo,
};
export {};
