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

const login = catchError(async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.login(email, password);
  const tokens = await tokenService.generateTokenAuth(user);
  res.status(200).json({
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
  login,
};
