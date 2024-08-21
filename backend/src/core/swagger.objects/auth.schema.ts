export const loginRequestSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      example: 'test@email.com',
    },
    password: {
      type: 'string',
      example: 'password',
    },
  },
};

export const tokenSchema = {
  type: 'object',
  properties: {
    token: {
      type: 'string',
      example: 'token',
    },
    refreshToken: {
      type: 'string',
      example: 'refreshToken',
    },
  },
};

export const signupRequestSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      example: 'test@email.com',
    },
    password: {
      type: 'string',
      example: 'password',
    },
    name: {
      type: 'string',
      example: 'name',
    },
  },
};

export const resetPasswordRequestSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      example: '',
    },
  },
};
