const className = {
  header: "text-center font-bold text-2xl pt-5 py-3",
  container: "justify-around flex gap-4 flex-wrap",
  card: "relative border border-gray-400 bg-white w-[270px] h-[400px] rounded-md p-2 flex flex-col", // two last properties needed to apply the last styles on price to be at the bottom of the card
  img: "h-[170px] my-4 w-[100%] rounded-md object-contain",
  title: "font-bold text-center",
  description: "mx-2 my-2 text-sm",
  price: "font-bold text-sm text-center flex flex-1 items-end justify-center",
  error: "bg-red-600",
  addNewBookBtn:
    "flex m-auto my-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 border rounded-full",
  deleteBtn: "h-4 w-4 absolute cursor-pointer right-1 top-1",
  editBtn: "h-4 w-4 absolute cursor-pointer right-1 top-7"
};

export default className;
