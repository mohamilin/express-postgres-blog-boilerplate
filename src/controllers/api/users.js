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
    message: 'success login',
    result: {
      user,
      tokens,
    },
  });
});

const refreshToken = catchError(async (req, res) => {
  const token = await userService.refreshTokens(req.body.refreshToken);
  res.send({ ...token });
});

const logout = catchError(async (req, res) => {
  await userService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

/**
 * Controller for SuperAdmin
 */

module.exports = {
  register,
  login,
  logout,
  refreshToken,
};
