export const AssignDriverToBuse = {
  '/api/v1/assign/bus/:busId/driver/:driverId': {
    post: {
      tags: ['Assign'],
      summary: 'Assign Driver to Buses',
      description: 'Assign Drivers to Buse',
      consumes: ['application/json'],
      produces: ['application/json'],
      parameters: [
        {
          name: 'Accept-Language',
          in: 'header',
          description: 'the Accept-Language',
          required: false,
          type: 'string',
        },
        {
          name: 'busId',
          in: 'path',
          description: 'Buse Id',
          required: true,
          type: 'string',
        },
        {
          name: 'driverId',
          in: 'path',
          description: 'Driver Id',
          required: true,
          type: 'string',
        },
        {
          name: 'Authorization',
          in: 'header',
          required: false,
        },
      ],
      responses: {
        200: {
          description: 'Success',
        },
        400: {
          description: 'Bad request',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },
  '/api/v1/assign/': {
    get: {
      tags: ['Assign'],
      summary: 'Get all Assigned Drivers',
      description: 'Get All Drivers with Assigned Buses',
      operationId: 'GetAllAssignedToDriver',
      produces: ['application/json'],
      parameters: [
        {
          name: 'page',
          in: 'query',
          description: 'the page',
          required: false,
          type: 'string',
        },
        {
          name: 'size',
          in: 'query',
          description: 'the size',
          required: false,
          type: 'string',
        },
        {
          name: 'Authorization',
          in: 'header',
          required: false,
        },
      ],
      responses: {
        200: {
          description: 'OK',
          schema: {
            type: 'string',
          },
        },
      },
    },
  },

  '/api/v1/assign/:id': {
    delete: {
      tags: ['Assign'],
      summary: 'UnAssigned driver to buse',
      description: 'UnAssign The Driver to Buses',
      operationId: 'UnAssignedDriver',
      consumes: ['application/json'],
      produces: ['application/json'],
      parameters: [
        {
          name: 'Accept-Language',
          in: 'header',
          description: 'the Accept-Language',
          required: false,
          type: 'string',
        },
        {
          name: 'id',
          in: 'path',
          description: 'Assigned Id',
          required: true,
          type: 'string',
        },
      ],
      responses: {
        200: {
          description: 'OK',
          schema: {
            type: 'string',
          },
        },
      },
    },
    get: {
      tags: ['Assign'],
      summary: 'Get A single driver ',
      description: 'Get A single driver with his/her Buse',
      operationId: 'Single Assigned Driver',
      consumes: ['application/json'],
      produces: ['application/json'],
      parameters: [
        {
          name: 'Accept-Language',
          in: 'header',
          description: 'the Accept-Language',
          required: false,
          type: 'string',
        },
        {
          name: 'id',
          in: 'path',
          required: true,
          type: 'string',
          description: 'Assigned Id',
        },
      ],
      responses: {
        200: {
          description: 'OK',
          schema: {
            type: 'string',
          },
        },
      },
    },
    patch: {
      tags: ['Assign'],
      summary: 'Assign Driver to another  Buses',
      description: 'Update driver to another buse',
      consumes: ['application/json'],
      produces: ['application/json'],
      parameters: [
        {
          name: 'body',
          in: 'body',
          description: 'Update s',
          required: true,
          schema: {
            $ref: '#/definitions/Assign',
          },
        },
        {
          name: 'Accept-Language',
          in: 'header',
          description: 'the Accept-Language',
          required: false,
          type: 'string',
        },
        {
          name: 'Authorization',
          in: 'header',
          required: false,
        },
        {
          name: 'id',
          in: 'path',
          description: 'Id for Assign',
          required: true,
          type: 'string',
        },
      ],
      responses: {
        200: {
          description: 'Success',
        },
        400: {
          description: 'Bad request',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },
};

export const AssignDefinition = {
  Assign: {
    type: 'object',
    in: 'body',
    required: ['userId', 'buseId'],
    properties: {
      userId: {
        type: 'number',
      },
      buseId: {
        type: 'string',
      },
    },
  },
};
