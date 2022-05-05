export const bus = {
  '/api/v1/buses': {
    post: {
      tags: ['Buses'],
      summary: 'This will enable operator to perform CRUD operation for bus',
      description: ' ',
      produces: ['application/json'],
      parameters: [
        {
          name: 'Body',
          in: 'body',
          required: true,
          schema: {
            $ref: '#/definitions/buses',
          },
        },
      ],
      responses: {
        200: {
          description: 'User Logged in successfully',
        },
        400: {
          description: 'Please provide email and password!',
        },

        401: {
          description: 'Incorrect email or password',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },
};

export const busDefinition = {
  buses: {
    type: 'object',
    in: 'body',
    required: [
      'routeId',
      'busType',
       'prateNumber'
  ],
    properties: {
      prateNumber: {
        type: 'string',
      },
      busType: {
        type: 'string',
      },
      routeId: {
        type: 'string',
      },
    },
  },
};
