import { InternalServerErrorException } from '@nestjs/common';
import * as moment from 'moment';

import { Relevance } from '../enums/relevance';

export const getRelevanceTimeRange = (relevance: Relevance) => {
  try {
    switch (relevance) {
      case Relevance.week:
        return moment().subtract(1, 'week').toDate();
      case Relevance.month:
        return moment().subtract(1, 'month').toDate();
      case Relevance.threeMonths:
        return moment().subtract(3, 'month').toDate();
      case Relevance.sixMonths:
        return moment().subtract(6, 'month').toDate();
      case Relevance.year:
        return moment().subtract(1, 'year').toDate();
      default:
        return moment().subtract(100, 'year').toDate();
    }
  } catch (error) {
    throw new InternalServerErrorException(error.message);
  }
};
