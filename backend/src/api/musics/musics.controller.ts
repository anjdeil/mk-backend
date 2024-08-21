import {
  Body,
  Controller,
  Get,
  Logger,
  LoggerService,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { MusicsService } from './musics.service';
import { AllowedRoles } from '../../core/decorators';
import { UpdateMusicDto } from '../../core/dto';
import { Roles } from '../../core/enums';
import { JwtOptionalAuthGuard, RolesGuard } from '../../core/guards';
import {
  CommonFilterSchema,
  createMusicSchema,
  musicSchema,
  updateMusicSchema,
} from '../../core/swagger.objects';
import { CompressResult, TMusicCreateFiles } from '../../core/types';
import { AuthRequest } from '../../core/types/common';

@ApiTags('musics')
@Controller('musics')
export class MusicsController {
  private readonly logger: LoggerService = new Logger(MusicsController.name);
  constructor(private readonly musicsService: MusicsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all musics' })
  @ApiResponse({ status: 200, description: 'Return all musics.' })
  @ApiQuery({ type: CommonFilterSchema })
  public async findAll(@Req() req: AuthRequest) {
    return await this.musicsService.findAll(req.filters);
  }

  @Get('top')
  @ApiOperation({ summary: 'Get all top' })
  @ApiResponse({ status: 200, description: 'Return top .' })
  @ApiQuery({ type: CommonFilterSchema })
  public async getTop(@Req() req: AuthRequest) {
    req.filters.order = [['listenCount', 'DESC']];
    req.filters.limit = 10;
    return await this.musicsService.findAll(req.filters);
  }

  @Get('my-music')
  @ApiOperation({ summary: 'Get all musics of current user' })
  @ApiResponse({
    status: 200,
    description: 'Return all musics of current user.',
    schema: {
      type: 'array',
      items: musicSchema,
    },
  })
  @ApiBearerAuth()
  @ApiQuery({ type: CommonFilterSchema })
  @AllowedRoles(Roles.SELLER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  public async findAllMyMusic(@Req() req: AuthRequest) {
    return await this.musicsService.findAllMyMusic(req.filters, req.user.id);
  }

  @ApiOperation({ summary: 'Get music by id' })
  @ApiResponse({
    status: 200,
    description: 'Return music by id.',
    schema: musicSchema,
  })
  @ApiParam({ name: 'id', type: Number })
  @UseGuards(JwtOptionalAuthGuard)
  @Get(':id')
  public async findOneById(@Param('id') id: number, @Req() req: AuthRequest) {
    return await this.musicsService.findOneById(id, req.user);
  }

  @ApiOperation({ summary: 'Create new music' })
  @ApiResponse({
    status: 201,
    description: 'The music has been successfully created.',
    schema: musicSchema,
  })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @AllowedRoles(Roles.SELLER)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'mp3', maxCount: 1 },
      { name: 'wav', maxCount: 9 },
      { name: 'stems', maxCount: 9 },
      { name: 'previewImage', maxCount: 1 },
      { name: 'previewTrack', maxCount: 1 },
    ]),
  )
  @ApiBody({ schema: createMusicSchema })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  public async create(
    @Req() req: AuthRequest,
    @UploadedFiles()
    files: TMusicCreateFiles,
    @Body() data,
  ) {
    this.logger.debug('FILES', files);
    return await this.musicsService.create(data, files, req.user);
  }

  @ApiOperation({ summary: '[TEST] Creates compressed mp3' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @Post('compress')
  public async createCompressedMp3(
    @UploadedFile()
    file: Express.Multer.File,
  ): Promise<string> {
    this.logger.debug({
      status: 'recieved',
      filename: file?.originalname,
      filesize: file?.size,
    });
    return this.musicsService.compress(file);
  }

  //TODO delete after implementation of music player chunk track loader
  @ApiOperation({ summary: '[OPTIONAL] Creates compressed mp3' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: `Returns an array of compressed tracks,
    returns empty array f there is nothing to compress`,
  })
  @UseInterceptors(FileInterceptor('file'))
  @Patch('generate-compressed-all')
  public async genereateCompressedFiles(): Promise<CompressResult[]> {
    return this.musicsService.generateCompressed();
  }

  @ApiOperation({ summary: 'Update music' })
  @ApiResponse({
    status: 200,
    description: 'The music has been successfully updated.',
  })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ schema: updateMusicSchema })
  @ApiBearerAuth()
  @AllowedRoles(Roles.SELLER, Roles.ADMIN, Roles.MODERATOR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put(':id')
  public async update(
    @Param('id') id,
    @Body() data: UpdateMusicDto,
    @Req() req: AuthRequest,
  ) {
    return await this.musicsService.update(id, data, req.user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Download music' })
  @ApiResponse({
    status: 200,
    description: 'The music has been successfully downloaded.',
  })
  @ApiParam({ name: 'id', type: Number })
  @UseGuards(AuthGuard('jwt'))
  @Get('download/:id')
  public async download(@Param('id') id: number, @Req() req: AuthRequest) {
    return await this.musicsService.downloadMusic(id, req.user);
  }
}
