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
    get: {
      tags: ['Buses'],
      summary: 'FETCH_ALL',
      description: 'FETCH_ALL',
      operationId: 'fetchAll',
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
    delete: {
      tags: ['Buses'],
      summary: 'DELETE_ALL_BUSES',
      description: 'DELETE_ALL_BUSES',
      operationId: 'deleteAllBUSES',
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
  '/api/v1/buses/:id': {
    delete: {
      tags: ['Buses'],
      summary: 'DELETE_SINGLE_BUS',
      description: 'DELETE SINGLE BUS',
      operationId: 'delete',
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

  '/api/v1/buses/:id': {
    put: {
      tags: ['Buses'],
      summary: 'UPDATE',
      description: 'UPDATE',
      operationId: 'Update single bus',
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

  '/api/v1/buses/:id': {
    delete: {
      tags: ['Buses'],
      summary: 'DELETE',
      description: 'DELETE',
      operationId: 'Delete single bus',
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
};

export const busDefinition = {
  buses: {
    type: 'object',
    in: 'body',
    required: ['routeId', 'busType', 'prateNumber'],
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
