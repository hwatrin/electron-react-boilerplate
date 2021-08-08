import { v4 } from 'uuid';

export const blankPage = (page_id = v4()): { page: Page; block: Block } => {
  const block_id = v4();
  return {
    page: {
      _id: page_id,
      user_id: 'og_user',
      created: new Date(),
      lastEdited: new Date(),
      title: '',
      blocks: [block_id],
    },
    block: {
      _id: block_id,
      discriminator: 'PlainText',
      page_id,
      text: '',
      data: {
        created: new Date(),
        lastEdited: new Date(),
      },
    },
  };
};

const initialState: any = {};

export const ADD_PAGE = 'PAGES/ADD_PAGE';
export const EDIT_PAGE = 'PAGES/EDIT_PAGE';
export const DELETE_PAGE = 'PAGES/DELETE_PAGE';
export const ADD_BLOCK_REFERENCE = 'PAGES/ADD_BLOCK_REFERENCE';
export const DELETE_BLOCK_REFERENCE = 'PAGES/DELETE_BLOCK_REFERENCE';

const pages = (state = initialState, action: any) => {
  const { payload, type, page_id, index } = action;

  switch (type) {
    case ADD_PAGE:
      return addPageHelper({ state, payload });
    case ADD_BLOCK_REFERENCE:
      return addBlockReferenceHelper({ state, payload, page_id, index });
    case DELETE_BLOCK_REFERENCE:
      return deleteBlockReferenceHelper({ state, payload, page_id });
    case EDIT_PAGE:
    case DELETE_PAGE:
    default:
      return state;
  }
};

const addPageHelper = ({ state, payload }: { state: any; payload: Page }) => {
  state[payload._id] = payload;
  return state;
};

const addBlockReferenceHelper = ({
  state,
  payload,
  page_id,
  index,
}: {
  state: any;
  payload: string;
  page_id: string;
  index: number;
}) => {
  state[page_id].blocks.splice(index, 0, payload);
  return state;
};

const deleteBlockReferenceHelper = ({
  state,
  payload,
  page_id,
}: {
  state: any;
  payload: number;
  page_id: string;
}) => {
  console.log(state[page_id].blocks);
  state[page_id].blocks.splice(payload, 1);
  console.log(state[page_id].blocks);

  return state;
};

export const deleteBlockReferenceRedux = ({
  payload,
  page_id,
}: {
  payload: number;
  page_id: string;
}) => ({
  payload,
  page_id,
  type: DELETE_BLOCK_REFERENCE,
});

export const addPageRedux = ({ payload }: { payload: Page }) => ({
  payload,
  type: ADD_PAGE,
});

export interface BlockReferenceParams {
  payload: string;
  page_id: string;
  index: number;
}

export const addBlockReferenceRedux = ({
  payload,
  page_id,
  index,
}: BlockReferenceParams) => ({
  payload,
  page_id,
  index,
  type: ADD_BLOCK_REFERENCE,
});

export default pages;
