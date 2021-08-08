interface BlockData {
  lastEdited: Date;
  created: Date;
}

interface PlainText {
  _id: string;
  text: string;
  discriminator: 'PlainText';
  data: BlockData;
  page_id: string;
}

interface Link {
  _id: string;
  pageLinked_id: string;
  discriminator: 'Link';
  data: BlockData;
  page_id: string;
}

type Block = PlainText | Link;
