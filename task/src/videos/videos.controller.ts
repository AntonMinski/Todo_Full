import { Controller, Get, Param } from '@nestjs/common';
import { videos } from './videos';

@Controller('videos')
export class VideosController {
  constructor() {}
  @Get('/videos')
  getVideos() {
    return videos;
  }

  @Get('/:id')
  getProduct(@Param('id') id: string) {
    const result = videos.find((v) => v.id == id);
    return result;
  }
}
