import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { CART_REPOSITORY } from '../constants';
import Cart from '../models/cart.entity';
import Music from '../models/music.entity';
import MusicFiles from '../models/musicFiles.entity';
import User from '../models/user.entity';
import { TCart } from '../types/cart';

@Injectable()
export class CartRepository {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepository: typeof Cart,
  ) {}

  public async create(cart: TCart): Promise<Cart> {
    try {
      return await this.cartRepository.create<Cart>(cart);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async bulkCreate(userId: number, fileIds: number[]): Promise<Cart[]> {
    try {
      const cartItems = fileIds.map((fileId) => ({ userId, fileId }));
      return await this.cartRepository.bulkCreate<Cart>(cartItems);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findAll(userId: number): Promise<Cart[]> {
    try {
      return await this.cartRepository.findAll<Cart>({
        attributes: [],
        where: { userId: userId },
        include: [
          {
            model: MusicFiles,
            attributes: ['id', 'cost', 'type'],
            include: [
              {
                model: Music,
                attributes: [
                  'title',
                  'previewImage',
                  'previewTrack',
                  'id',
                  'description',
                ],
              },
              { model: User, attributes: ['id', 'name', 'pseudonym'] },
            ],
          },
        ],
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findOne(options: any): Promise<Cart | null> {
    try {
      return await this.cartRepository.findOne<Cart>(options);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async delete(fileId: number, userId: number): Promise<number> {
    try {
      return await this.cartRepository.destroy({ where: { fileId, userId } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async deleteAll(userId: number): Promise<number> {
    try {
      return await this.cartRepository.destroy({ where: { userId } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async deleteAllByFileIds(
    userId: number,
    fileIds: number[],
  ): Promise<void> {
    try {
      await this.cartRepository.destroy({ where: { userId, fileId: fileIds } });
    } catch (error) {
      console.log('error :>> ', error);
      throw new InternalServerErrorException(error.message);
    }
  }

  public async deleteAllByFiles(fileIds: number[]): Promise<void> {
    try {
      await this.cartRepository.destroy({ where: { fileId: fileIds } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
