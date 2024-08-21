export const getOrdersResponseSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
        example: 1,
      },
      fileId: {
        type: 'number',
      },
      userId: {
        type: 'number',
      },
      createdAt: {
        type: 'string',
        example: '2020-12-12T12:12:12.000Z',
      },
      updatedAt: {
        type: 'string',
        example: '2020-12-12T12:12:12.000Z',
      },
    },
  },
};
