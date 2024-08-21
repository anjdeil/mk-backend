import { omitBy, isEmpty } from 'lodash';
import { FindOptions, Op } from 'sequelize';
import { Model } from 'sequelize-typescript';

import {MusicCategories, MusicFiles, MusicsHistory, User} from '../models';
import { ModelQuery } from '../types/common/modelQuery';

export const processFilters = <TFilters>(filters: TFilters) => {
  const processedFilters = {};
  Object.keys(filters).forEach((key) => {
    if (typeof filters[key] === 'string' && filters[key].length > 0) {
      processedFilters[key] = filters[key];
    }
    if (typeof filters[key] === 'number') {
      processedFilters[key] = filters[key];
    }
    if (typeof filters[key] === 'object' && !isEmpty(filters[key])) {
      // less than or equal
      // { lte: 10 }
      if (filters[key].lte) {
        processedFilters[key] = {
          ...processedFilters[key],
          [Op.lte]: +filters[key].lte,
        };
      }
      // greater than or equal
      // { gte: 10 }
      if (filters[key].gte) {
        processedFilters[key] = {
          ...processedFilters[key],
          [Op.gte]: +filters[key].gte,
        };
      }
      // less than
      // { lt: 10 }
      if (filters[key].lt) {
        processedFilters[key] = {
          ...processedFilters[key],
          [Op.lt]: +filters[key].lt,
        };
      }
      // greater than
      // { gt: 10 }
      if (filters[key].gt) {
        processedFilters[key] = {
          ...processedFilters[key],
          [Op.gt]: +filters[key].gt,
        };
      }
      // not equal
      // { ne: 20 }
      if (filters[key].ne) {
        processedFilters[key] = {
          ...processedFilters[key],
          [Op.ne]: filters[key].ne,
        };
      }
      // equal
      // { eq: 20 }
      if (filters[key].eq) {
        processedFilters[key] = {
          ...processedFilters[key],
          [Op.eq]: filters[key].eq,
        };
      }
      // like
      // { like: '%hat' }
      if (filters[key].like) {
        processedFilters[key] = {
          ...processedFilters[key],
          [Op.like]: filters[key].like,
        };
      }
      // not like
      // { nlike: '%hat' }
      if (filters[key].nlike) {
        processedFilters[key] = {
          ...processedFilters[key],
          [Op.notLike]: filters[key].nlike,
        };
      }
    }
    if (Array.isArray(filters[key])) {
      processedFilters[key] = filters[key];
    }
  });
  return processedFilters;
};

export const processCommonQuery = (query: ModelQuery): FindOptions => {
  const { limit, offset, order, search, filters } = query;
  const where = {
    ...(search &&
      search.value &&
      search.fields &&
      Array.isArray(search.fields) && {
        [Op.or]: search.fields.map((field) => ({
          [field]: { [Op.like]: `%${search.value}%` },
        })),
      }),
    ...(filters && filters),
  };

  const options = {
    ...(limit && { limit: +limit }),
    ...(offset && { offset: +offset }),
    ...(order &&
      order.direction &&
      order.field && {
        order: [[order.field, order.direction]],
      }),
  };

  const result = omitBy({ where, ...options }, (value) => {
    return value === undefined || (typeof value === 'object' && isEmpty(value));
  });
  return result;
};

export const processCommonQueryWithRelationsAndFilters = <TFilters>(
  query: ModelQuery,
  filters: TFilters,
  relations?: (
    | {
        through: { attributes: any[] };
        as: string;
        model: MusicCategories;
        attributes: string[];
        required: boolean;
      }
    | {
        as: string;
        model: MusicFiles;
        attributes: string[];
        where: { cost: any };
        required: boolean;
      }
    | {
        as: string;
        model: MusicsHistory;
        attributes: any[];
        where: { createdAt: { [Op.gte]: Date } };
        required: boolean;
      }
    | {
        as: string;
        model: User;
        attributes: string[];
        where: {};
        required: boolean;
      }
  )[],
): FindOptions => {
  const { limit, offset, order, search } = query;

  const proccessedFilters = {
    ...(isEmpty(search)
      ? {}
      : typeof search.fields === 'string'
      ? { [`${search.fields}`]: { [Op.like]: `%${search.value}%` } }
      : {
          [Op.or]: search.fields.map((field) => ({
            [field]: { [Op.like]: `%${search.value}%` },
          })),
        }),
    ...(filters && filters),
  };
  const options = {
    ...(limit && { limit: +limit }),
    ...(offset && { offset: +offset }),
    ...(order &&
      order.field &&
      order.direction && {
        order: [[order.field, order.direction]],
      }),
    include: relations,
  };

  const result = omitBy({ filters: proccessedFilters, ...options }, (value) => {
    return value === undefined || (typeof value === 'object' && isEmpty(value));
  });
  return result;
};

export const processCommonQueryWithoutSearch = <TFilters>(
  query: ModelQuery,
  filters: TFilters,
  relations: Model[] = [],
): FindOptions => {
  const { limit, offset, order, search } = query;

  const proccessedFilters = {
    ...(filters && filters),
  };
  const options = {
    ...(limit && { limit: +limit }),
    ...(offset && { offset: +offset }),
    ...(order &&
      order.field &&
      order.direction && {
        order: [[order.field, order.direction]],
      }),
    include: relations,
  };

  const result = omitBy(
    { filters: proccessedFilters, ...options, search },
    (value) => {
      return (
        value === undefined || (typeof value === 'object' && isEmpty(value))
      );
    },
  );
  return result;
};
