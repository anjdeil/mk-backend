export const billingAddressSchema = {
  type: 'object',
  properties: {
    userId: {
      type: 'number',
      example: 'userId',
    },
    address: {
      type: 'string',
      example: 'address',
    },
    city: {
      type: 'string',
      example: 'city',
    },
    country: {
      type: 'string',
      example: 'country',
    },
    postalCode: {
      type: 'string',
      example: 'postalCode',
    },
    phoneNumber: {
      type: 'string',
      example: 'phoneNumber',
    },
    phoneCode: {
      type: 'string',
      example: '+38',
    },
  },
  additionalProperties: false,
};
