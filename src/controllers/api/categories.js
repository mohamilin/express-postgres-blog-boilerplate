const httpStatus = require('http-status');
const catchError = require('../../utils/catchError');
const { categoryService } = require('../../services');
const AppError = require('../../utils/AppError');

const addCategory = catchError(async (req, res) => {
  const { user } = req;
  const payload = req.body;
  const category = await categoryService.addCategory(user, payload);
  res.status(httpStatus.CREATED).json({
    success: true,
    result: {
      category,
    },
  });
});

const getCategory = catchError(async (req, res) => {
  const category = await categoryService.getCategory();
  res.send({
    success: true,
    result: {
      category,
    },
  });
});

const getCategoryById = catchError(async (req, res) => {
  const { id } = req.params;
  const category = await categoryService.getCategoryById(id);
  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, `id ${id} tidak ditemukan`);
  }
  res.send({
    success: true,
    result: {
      category,
    },
  });
});
module.exports = {
  addCategory,
  getCategory,
  getCategoryById,
};
