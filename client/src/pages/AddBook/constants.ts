const inputNames = ["cover", "title", "description", "price"];

const initialState = {
  id: new Date().getTime(),
  title: "",
  description: "",
  cover: "",
  price: ""
};

export { initialState, inputNames };
