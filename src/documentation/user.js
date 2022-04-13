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
<<<<<<< HEAD
<<<<<<< HEAD
          description: 'User Logged in successfully',
=======
          description: 'User Loged in successfully',
        },
        400: {
          description: 'Please provide email and password!',
>>>>>>> f1fa83b... Added login feature, jwt on a succesful login and documentation
=======
          description: 'User Logged in successfully',
>>>>>>> 9a5d282... Added language translation
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  }
=======
  },
>>>>>>> f1fa83b... Added login feature, jwt on a succesful login and documentation
=======

  }

>>>>>>> bcab845... added Get Post Delete Put for routes
=======
  },
>>>>>>> 7f55af9... ft crud operation for bus:
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
