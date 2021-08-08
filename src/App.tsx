import React, { useEffect } from 'react';
import { connect, Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Page from './shared/components/Page';
import getStore from './shared/redux';
import { addPageRedux, blankPage } from './shared/redux/pages';
import { setCurrentPageRedux } from './shared/redux/config';
import { addOrEditBlockRedux } from './shared/redux/blocks';

const { store } = getStore();

interface Props {
  currentPage: string;
  addBlock: ({ payload }: { payload: Block }) => any;
  addPage: ({ payload }: { payload: Page }) => any;
  setCurrentPage: ({ payload }: { payload: string }) => any;
}

let Index = ({ currentPage, setCurrentPage, addBlock, addPage }: Props) => {
  useEffect(() => {
    if (currentPage === 'none') {
      const { page, block } = blankPage();
      addPage({ payload: page });
      addBlock({ payload: block });
      setCurrentPage({ payload: page._id });
    }
  });

  if (currentPage === 'none') {
    return <></>;
  }

  return (
    <div>
      <Page page_id={currentPage} />
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  currentPage: state.config.currentPage,
});

const mapDispatchToProps = {
  addPage: addPageRedux,
  addBlock: addOrEditBlockRedux,
  setCurrentPage: setCurrentPageRedux,
};

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route
            path="/"
            component={connect(mapStateToProps, mapDispatchToProps)(Index)}
          />
        </Switch>
      </Router>
    </Provider>
  );
}
