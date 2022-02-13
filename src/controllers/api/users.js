const httpStatus = require('http-status');
const catchError = require('../../utils/catchError');
const { userService, tokenService } = require('../../services');

/**
 * Controller for Auth
 */
const register = catchError(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateTokenAuth(user);
  res.status(httpStatus.CREATED).json({
    success: true,
    result: {
      user,
      tokens,
    },
  });
});

/**
 * Controller for SuperAdmin
 */

module.exports = {
  register,
};
