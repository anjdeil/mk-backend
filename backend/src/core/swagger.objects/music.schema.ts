export const createMusicSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      example: 'Music name',
    },
    description: {
      type: 'string',
      example: 'Music description',
    },
    previewTrack: {
      type: 'file',
      format: 'binary',
    },
    previewImage: {
      type: 'file',
      format: 'binary',
    },
    requirements: {
      type: 'string',
      example: 'Music requirements',
    },
    bpm: {
      type: 'number',
      example: 100,
    },
    duration: {
      type: 'number',
    },
    mp3: {
      type: 'file',
      format: 'binary',
    },
    mp3Price: {
      type: 'number',
      example: 100,
    },
    wav: {
      type: 'array',
      items: {
        type: 'file',
        format: 'binary',
      },
    },
    wavPrices: {
      type: 'array',
      items: {
        type: 'number',
        example: 100,
      },
    },
    stems: {
      type: 'array',
      items: {
        type: 'file',
        format: 'binary',
      },
    },
    stemsPrices: {
      type: 'array',
      items: {
        type: 'number',
        example: 100,
      },
    },
    categories: {
      type: 'array',
      items: {
        type: 'number',
        example: 1,
      },
    },
    types: {
      type: 'array',
      items: {
        type: 'number',
        example: 1,
      },
    },
    instruments: {
      type: 'array',
      items: {
        type: 'number',
        example: 1,
      },
    },
    keys: {
      type: 'array',
      items: {
        type: 'number',
        example: 1,
      },
    },
    moods: {
      type: 'array',
      items: {
        type: 'number',
        example: 1,
      },
    },
  },
};

export const updateMusicSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      example: 'Music name',
    },
    description: {
      type: 'string',
      example: 'Music description',
    },
    requirements: {
      type: 'string',
      example: 'Music requirements',
    },
    stems: {
      type: 'string',
      example: 'Music stems',
    },
    bpm: {
      type: 'number',
      example: 100,
    },
    duration: {
      type: 'number',
    },
    categories: {
      type: 'array',
      items: {
        type: 'number',
        example: 1,
      },
    },
    types: {
      type: 'array',
      items: {
        type: 'number',
        example: 1,
      },
    },
    instruments: {
      type: 'array',
      items: {
        type: 'number',
        example: 1,
      },
    },
    keys: {
      type: 'array',
      items: {
        type: 'number',
        example: 1,
      },
    },
    moods: {
      type: 'array',
      items: {
        type: 'number',
        example: 1,
      },
    },
  },
};

export const musicSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
      example: 1,
    },
    title: {
      type: 'string',
      example: 'Music name',
    },
    description: {
      type: 'string',
      example: 'Music description',
    },
    previewTrack: {
      type: 'string',
      example: 'https://www.w3schools.com/tags/horse.mp3',
    },
    previewImage: {
      type: 'string',
      example: 'https://www.w3schools.com/tags/horse.jpg',
    },
    requirements: {
      type: 'string',
      example: 'Music requirements',
    },
    stems: {
      type: 'string',
      example: 'Music stems',
    },
    bpm: {
      type: 'number',
      example: 100,
    },
    duration: {
      type: 'number',
    },
    mp3: {
      type: 'string',
      example: 'https://www.w3schools.com/tags/horse.mp3',
    },
    mp3Price: {
      type: 'number',
      example: 100,
    },
    wav: {
      type: 'array',
      items: {
        type: 'string',
        example: 'https://www.w3schools.com/tags/horse.wav',
      },
    },
    wavPrices: {
      type: 'array',
      items: {
        type: 'number',
        example: 100,
      },
    },
    categories: {
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
            example: 'Category name',
          },
        },
      },
    },
    keys: {
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
            example: 'Key name',
          },
        },
      },
    },
    types: {
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
            example: 'Track type name',
          },
        },
      },
    },
    instruments: {
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
            example: 'Instrument name',
          },
        },
      },
    },
    moods: {
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
            example: 'Mood name',
          },
        },
      },
    },
  },
};
