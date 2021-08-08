const initialState: ConfigState = {
  currentPage: 'none',
};

export const SET_CURRENT_PAGE = 'CONFIG/SET_CURRENT_PAGE';

const config = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: payload };
    default:
      return state;
  }
};

export const setCurrentPageRedux = ({ payload }: { payload: string }) => ({
  payload,
  type: SET_CURRENT_PAGE,
});

export default config;
