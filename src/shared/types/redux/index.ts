interface ConfigState {
  currentPage: string;
}

interface Adder {
  blocks: AdderItem[];
}

interface ReduxState {
  pages: any;
  blocks: any;
  adder: Adder;
  config: ConfigState;
}
