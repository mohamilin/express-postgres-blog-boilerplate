const httpStatus = require('http-status');
const { tagService } = require('../../services');
const catchError = require('../../utils/catchError');

const addTags = catchError(async (req, res) => {
  const tags = await tagService.addTags(req.body);
  res.status(httpStatus.CREATED).json({
    success: true,
    result: {
      tags,
    },
  });
});

const getTags = catchError(async (req, res) => {
  const tags = await tagService.getTags();
  res.status(200).json({
    success: true,
    result: {
      tags,
    },
  });
});

module.exports = {
  addTags,
  getTags,
};
