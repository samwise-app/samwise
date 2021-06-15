function errorHandler(error) {
  if (error.includes('already exists'))
    return { error: { type: 'INFO', code: '01' }, message: 'This item already exists in the database' };
  if (error.includes('Failing row'))
    return {
      error: {
        type: 'ERROR',
        code: '02',
      },
      message: 'Your inputs failed row constraints - check for non-nullable fields',
    };
  // Default Error Handler
  return { type: 'UNKNOWN', code: 'XX', message: error };
}

module.exports = errorHandler;
