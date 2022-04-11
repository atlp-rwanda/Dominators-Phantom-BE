export const user = {
  '/api/v1/users/login': {
    post: {
      tags: ['Authentication'],
      summary: 'This will login a user',
      description: ' ',
      produces: ['application/json'],
      parameters: [
        {
          name: 'Body',
          in: 'body',
          required: true,
          schema: {
            $ref: '#/definitions/Login',
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
  }
};

export const userDefinition = {
  Login: {
    type: 'object',
    in: 'body',
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
    },
  },
};
