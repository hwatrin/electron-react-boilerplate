const initialState = {};

export const ADD_OR_EDIT_BLOCK = 'BLOCKS/ADD_OR_EDIT_BLOCK';
export const DELETE_BLOCK = 'BLOCKS/DELETE_BLOCK';
const blocks = (state = initialState, action: any) => {
  const { payload, type } = action;

  switch (type) {
    case ADD_OR_EDIT_BLOCK:
      return addOrEditBlockHelper({ state: state, payload });
    case DELETE_BLOCK:
      return deleteBlockHelper({ state, payload });
    default:
      return state;
  }
};

const addOrEditBlockHelper = ({
  state,
  payload,
}: {
  state: any;
  payload: Block;
}) => {
  state[payload._id] = payload;
  return state;
};

const deleteBlockHelper = ({
  state,
  payload,
}: {
  state: any;
  payload: Block;
}) => {
  delete state[payload._id];
  return state;
};

export const addOrEditBlockRedux = ({ payload }: { payload: Block }) => ({
  payload,
  type: ADD_OR_EDIT_BLOCK,
});

export const deleteBlockRedux = ({ payload }: { payload: Block }) => ({
  payload,
  type: DELETE_BLOCK,
});

export default blocks;
