export const historySchema = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
    },
    title: {
      type: 'string',
      example: 'title',
    },
    previewImage: {
      type: 'string',
      example: 'http://localhost:3000/previewImage.jpg',
    },
    previewTrack: {
      type: 'string',
      example: 'http://localhost:3000/previewTrack.mp3',
    },
    artistName: {
      type: 'string',
      example: 'artistName',
    },
    artistId: {
      type: 'number',
      example: 1,
    },
    createdAt: {
      type: 'string',
      example: '2021-01-01T00:00:00.000Z',
    },
    updatedAt: {
      type: 'string',
      example: '2021-01-01T00:00:00.000Z',
    },
  },
};
