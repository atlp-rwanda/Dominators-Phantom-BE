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
  },
  '/api/v1/users/logout': {
    post: {
      tags: ['Authentication'],
      summary: 'This will logout a user',
      description: ' ',
      produces: ['application/json'],
      parameters: [
        {
          name: 'Authorization',
          in: 'header',
          required: false,
        },
      ],
      responses: {
        200: {

          description: 'Logged out successfully',


        },

        
        401: {
          description: 'You are not allowed. Check Your token',
        },
        
      },
    },
  },

  

  }

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
