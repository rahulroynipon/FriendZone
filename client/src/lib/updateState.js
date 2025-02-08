const updateState = (
  set,
  key,
  { loading, error, message, success, update = {} }
) => {
  set((state) => {
    // Extract previous state values
    const prevState = {
      loading: state.isLoading[key],
      error: state.isError[key],
      success: state.isSuccess[key],
      message: state.message,
    };

    // Prevent unnecessary state updates
    if (
      prevState.loading === loading &&
      prevState.error === error &&
      prevState.success === success &&
      prevState.message === message &&
      JSON.stringify(update) === JSON.stringify(state[key])
    ) {
      return state; // Avoid triggering a re-render if the state hasn't changed
    }

    return {
      ...state,
      isLoading: { ...state.isLoading, [key]: loading ?? state.isLoading[key] },
      isError: { ...state.isError, [key]: error ?? state.isError[key] },
      isSuccess: { ...state.isSuccess, [key]: success ?? state.isSuccess[key] },
      message: message || state.message,
      ...update, // Merge additional updates
    };
  });
};

export default updateState;
