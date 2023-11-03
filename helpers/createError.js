const CLIError = (message) => {
  const error = new Error(message);
  return error;
};

module.exports = {
  CLIError,
};
