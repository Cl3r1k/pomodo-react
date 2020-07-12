export const authReducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return { ...state, isAuthenticated: true };

    case 'SIGN_OUT':
      return { ...state, isAuthenticated: false };

    default:
      throw new Error(`Unknown action.type ${action.type}`);
  }
};
