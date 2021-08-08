interface SelectedLine {
  pos: number; //the line's position on the page
  move: boolean; //whether appropriate blocks should respond to the position changing
}
interface PageInteractors {
  addLine: (index: number, text?: string) => any;
  selectLine: (line: number, move?: boolean) => any;
  forceUpdate: () => any;
}
interface PageData {
  index: number;
  selectedLine: SelectedLine;
  _id: string;
}
