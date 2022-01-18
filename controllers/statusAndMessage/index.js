const createdSuccessfully = (param) =>
  `'${param}' created successfully.`;

const deletedSuccessfully = (param) =>
  `'${param}' deleted successfully,`;

const modifiedSuccessfully = (param) =>
  `'${param}' modified successfully.`;

const internalError = () =>
  'sorry, internal error.';

module.exports = {
  createdSuccessfully,
  deletedSuccessfully,
  modifiedSuccessfully,
  internalError,
};
