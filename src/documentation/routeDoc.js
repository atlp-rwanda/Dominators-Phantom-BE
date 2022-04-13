export const route = {
  '/api/v1/routes': {
    post: {
      tags: ['Routes'],
      summary: 'CREATE',
      description: 'CREATE',
      operationId: 'create',
      consumes: ['application/json'],
      produces: ['application/json'],
      parameters: [
        {
          name: 'body',
          in: 'body',
          description: 'Create Route',
          required: true,
          schema: {
            $ref: '#/definitions/Create',
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
    get: {
      tags: ['Routes'],
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
      tags: ['Routes'],
      summary: 'DELETE_ALL_ROUTES',
      description: 'DELETE_ALL_ROUTES',
      operationId: 'deleteAllRoutes',
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

export const createDefinition = {
  Create: {
    type: 'object',
    in: 'body',
    required: ['origin', 'destination', 'code', 'distance'],
    properties: {
      origin: {
        type: 'string',
      },
      destination: {
        type: 'string',
      },
      code: {
        type: 'string',
      },
      distance: {
        type: 'string',
      },
    },
  },
};
