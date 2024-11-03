export interface RichTextContent {
  type: "paragraph" | "heading" | "list" | "quote";
  text: string;
  style?: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
  };
}

export interface RichTextEditorProps {
  initialContent?: RichTextContent[];
  onChange?: (content: RichTextContent[]) => void;
  placeholder?: string;
  maxLength?: number;
  readOnly?: boolean;
}
