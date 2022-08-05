import { Request, Response } from "express";

const httpStatus = require('http-status');
const { videoService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const createVideo = catchAsync(async (req: Request, res: Response) => {
  const video = await videoService.createVideo(req.body);
  res.status(httpStatus.CREATED).send(video);
});

const getAllVideos = catchAsync(async (req: Request, res: Response) => {
  const videos = await videoService.findAll();
  res.send(videos);
});

const getVideoById = catchAsync(async (req: Request, res: Response) => {
  const video = await videoService.findById(+req.params.videoId);
  res.send(video);
});

const deleteVideo = catchAsync(async (req: Request, res: Response) => {
  await videoService.deleteVideo(+req.params.videoId);
  res.status(httpStatus.NO_CONTENT).send();
});

const updateVideo = catchAsync(async (req: Request, res: Response) => {
  const video = await videoService.updateVideo(+req.params.videoId, req.body);
  res.send(video);
});

module.exports = {
  createVideo,
  getAllVideos,
  getVideoById,
  deleteVideo,
  updateVideo,
};
