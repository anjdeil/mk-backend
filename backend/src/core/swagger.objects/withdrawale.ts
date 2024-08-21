export const withdrawaleSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
      description: 'Withdrawal ID',
      example: 1,
    },
    userId: {
      type: 'number',
      description: 'User ID',
      example: 1,
    },
    amount: {
      type: 'number',
      description: 'Amount',
      example: 100,
    },
    createdAt: {
      type: 'string',
      description: 'Created At',
      example: '2021-01-01 00:00:00',
    },
    updatedAt: {
      type: 'string',
      description: 'Updated At',
      example: '2021-01-01 00:00:00',
    },
  },
};

export const createWithdrawaleSchema = {
  type: 'object',
  properties: {
    amount: {
      type: 'number',
      description: 'Amount',
      example: 100,
    },
  },
};

export const updateWithdrawaleSchema = {
  type: 'object',
  properties: {
    bankTransactionId: {
      type: 'string',
      description: 'Bank Transaction ID',
      example: '1234567890',
    },
  },
};
