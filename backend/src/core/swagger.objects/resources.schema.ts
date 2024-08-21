export const createResourceSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      example: 'name',
    },
  },
};

export const updateResourceSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      example: 'name',
    },
  },
};

export const resourcesResponseSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
        example: 1,
      },
      name: {
        type: 'string',
        example: 'name',
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

export const resourceResponseSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
      example: 1,
    },
    name: {
      type: 'string',
      example: 'name',
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
