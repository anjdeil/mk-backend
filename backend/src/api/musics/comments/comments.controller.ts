import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CommentsService } from './comments.service';
import {
  commentSchema,
  createCommentSchema,
  updateCommentSchema,
} from '../../../core/swagger.objects';
import { AuthRequest } from '../../../core/types/common';

const userCommentMap = new Map<string, Date>();

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The comment has been successfully created.',
    schema: commentSchema,
  })
  @ApiOperation({ summary: 'Create a comment' })
  @ApiBody({ schema: createCommentSchema })
  @Post()
  @UseGuards(AuthGuard('jwt'))
  public async createComment(@Body() data, @Req() req: AuthRequest) {
    const userId = String(req.user.id);
    const { canComment, nextCommentTime } =
      this.commentsService.checkCanComment(userId, userCommentMap);

    if (!canComment) {
      return {
        message: 'You can only post once every 2 minutes',
        nextCommentTime,
      };
    }

    return await this.commentsService.createComment(data, req.user);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The comment has been successfully updated.',
  })
  @ApiOperation({ summary: 'Update a comment' })
  @ApiBody({ schema: updateCommentSchema })
  @ApiParam({ name: 'id', type: Number })
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  public async updateComment(
    @Body() data,
    @Req() req: AuthRequest,

    @Param('id') id: number,
  ) {
    return await this.commentsService.updateComment(data.id, data, req.user);
  }

  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'The comment has been successfully retrieved.',
  })
  @ApiOperation({ summary: 'Get a comment' })
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  public async getComment(@Param('id') id: number) {
    return await this.commentsService.getComment(id);
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'The comments has been successfully retrieved.',
  })
  @ApiOperation({ summary: 'Get comments by track' })
  @UseGuards(AuthGuard('jwt'))
  @Get('track/:id')
  public async getCommentsByTrack(
    @Param('id') id: number,
    @Req() req: AuthRequest,
  ) {
    const userId = String(req.user.id);
    const { comments } = await this.commentsService.getCommentsByTrack(id);

    return {
      comments: comments,
      nextCommentTime: userCommentMap.get(userId) || null,
    };
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The comment has been successfully deleted.',
  })
  @ApiOperation({ summary: 'Delete a comment' })
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  public async deleteComment(@Param('id') id: number, @Req() req: AuthRequest) {
    return await this.commentsService.deleteComment(id, req.user.id);
  }
}
