const inputNames = ["cover", "title", "description", "price"];

const initialBookState = {
  id: new Date().getTime(),
  title: "",
  description: "",
  cover: "",
  price: ""
};

export { inputNames, initialBookState };
