import { ChangeEvent, MouseEvent } from "react";

import { Book } from "../../models";

export default interface BookFormProps {
  book: Book;
  onButtonClick: (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement>, inputName: string) => void;
  use: string;
}
