async function asyncHandler(promiseFunction) {
  try {
    const data = await promiseFunction;
    return [data, null];
  } catch (err) {
    console.error(error);
    return [null, error];
  }
}

const asyncAdditiveArray = async (array, newFieldName, callback, dataSources) => {
  let result = [];
  let error;
  for (let i = 0; i < array.length; i += 1) {
    try {
      const data = await callback(array[i], dataSources);
      result.push({
        ...array[i],
        [newFieldName]: data,
      });
    } catch (error) {
      console.error(error);
    }
  }
  return { result, error };
};

module.exports = {asyncHandler, asyncAdditiveArray};
