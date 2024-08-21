export const avatarSchema = {
  type: 'object',
  properties: {
    avatar: {
      type: 'file',
      format: 'binary',
    },
  },
};

export const userUpdateSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    pseudonym: {
      type: 'string',
    },
    biography: {
      type: 'string',
    },
    avatar: avatarSchema,
    phone: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
  additionalProperties: false,
};

export const userFilterSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    pseudonym: {
      type: 'string',
    },
    biography: {
      type: 'string',
    },
    avatar: avatarSchema,
    phone: {
      type: 'string',
    },
  },
};
