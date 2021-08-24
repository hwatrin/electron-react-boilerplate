const initialState = {
  blocks: [
    { title: 'Plain Text', description: '' },
    { title: 'Heading 1', description: '' },
    { title: 'Heading 2', description: '' },
    { title: 'Heading 3', description: '' },
  ],
};

const adder = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  }
};

export default adder;
