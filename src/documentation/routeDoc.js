export const route = {
  '/api/v1/routes': {
    post: {
      tags: ['Routes'],
      summary: ' Create Route',
      description: ' Create Route',
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
      summary: 'Fetch_All Routes',
      description: 'Fetch_All Routes',
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
      summary: 'Delete_All_Routes',
      description: 'Delete_All_Routes',
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
