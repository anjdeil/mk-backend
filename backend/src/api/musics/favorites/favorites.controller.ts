import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';

import { FavoritesService } from './favorites.service';
import { AuthRequest } from '../../../core/types/common';

@ApiTags('favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':musicId')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The music has been successfully added to favorites.',
  })
  @ApiOperation({ summary: 'Add track to favorites' })
  @ApiParam({ name: 'musicId', type: Number })
  public async addToFavorite(
    @Param('musicId') musicId,
    @Req() req: AuthRequest,
  ) {
    return await this.favoritesService.addToFavorite(musicId, req.user);
  }

  @ApiParam({ name: 'musicId', type: Number })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The music has been successfully removed from favorites.',
  })
  @ApiOperation({ summary: 'Remove track from favorites' })
  @Delete(':musicId')
  @UseGuards(AuthGuard('jwt'))
  public async removeFromFavorite(
    @Param('musicId') musicId: number,
    @Req() req: AuthRequest,
  ) {
    return await this.favoritesService.removeFromFavorite(musicId, req.user.id);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The favorites has been successfully retrieved.',
  })
  @ApiOperation({ summary: 'Get favorites by user' })
  @Get()
  @UseGuards(AuthGuard('jwt'))
  public async getFavoritesByUser(@Req() req: AuthRequest) {
    return await this.favoritesService.getFavoritesByUser(req.user.id);
  }
}
