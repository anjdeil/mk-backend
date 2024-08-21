export const createCommentSchema = {
  type: 'object',
  properties: {
    comment: {
      type: 'string',
      example: 'This is a comment',
    },
    musicId: {
      type: 'number',
      example: 1,
    },
    parentCommentId: {
      type: 'number',
      example: 1,
    },
  },
  required: ['comment', 'musicId'],
};

export const updateCommentSchema = {
  type: 'object',
  properties: {
    comment: {
      type: 'string',
      example: 'This is a comment',
    },
  },
  required: ['comment'],
};

export const commentSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
      example: 1,
    },
    text: {
      type: 'string',
      example: 'This is a comment',
    },
    trackId: {
      type: 'number',
      example: 1,
    },
    music: {},
    parentId: {
      type: 'number',
      example: 1,
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
};
