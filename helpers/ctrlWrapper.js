require("colors");

const ctrlWrapper = (ctrl) => {
  const func = async (data) => {
    try {
      await ctrl(data);
    } catch (error) {
      console.error(`${error.message}`.red);
    }
  };
  return func;
};

module.exports = {
  ctrlWrapper,
};
