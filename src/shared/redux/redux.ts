interface ConfigState {
  currentPage: string;
}

interface ReduxState {
  pages: any;
  blocks: any;
  config: ConfigState;
}
