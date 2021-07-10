

// Works through an asynchronus array and adds newly recieved data to each element of that array
const asyncAdditiveArray = async (array, callback, dataSources) => {
  let result = [];
  let error;
  for (let i = 0; i < array.length; i += 1) {
    try {
      const data = await callback(array[i], dataSources);
      result.push({
        ...array[i],
        ...data,
      });
    } catch (error) {
      console.error(error);
    }
  }
  return { result, error };
};


module.exports = {asyncAdditiveArray};
