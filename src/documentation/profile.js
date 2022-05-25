export const Profile = {
  '/api/v1/profile/:id/update': {
    post: {
      tags: ['Profile'],
      summary: 'CREATE',
      description: 'CREATE',
      consumes: ['application/json'],
      produces: ['application/json'],
      parameters: [
        {
          name: 'body',
          in: 'body',
          description: 'Create Profile',
          required: true,
          schema: {
            $ref: '#/definitions/update',
          },
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

  '/api/v1/profile': {
    get: {
      tags: ['Profile'],
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
  },
  '/api/v1/profile/:id': {
    delete: {
      tags: ['Profile'],
      summary: 'DELETE',
      description: 'DELETE',
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
};

export const ProfileDefinition = {
  update: {
    type: 'object',
    in: 'body',
    required: [
      'firstName',
      'lastName',
      'phone',
      'email',
      'role',
      'profilePic',
      'province',
      'district',
      'sector',
      'cell',
      'village',
      'bio',
      'category',
      'gender',
      'nationalId',
    ],
    properties: {
      firstname: {
        type: 'string',
      },
      lastname: {
        type: 'string',
      },
      profilePic: {
        type: 'string',
      },
      phone: {
        type: 'integer',
      },
      email: {
        type: 'string',
      },
      role: {
        type: 'string',
      },
      province: {
        type: 'string',
      },
      district: {
        type: 'string',
      },
      sector: {
        type: 'string',
      },
      cell: {
        type: 'string',
      },
      village: {
        type: 'string',
      },
      bio: {
        type: 'string',
      },
      category: {
        type: 'string',
      },

      gender: {
        type: 'string',
      },
      nationalId: {
        type: 'string',
      },
    },
  },
};
