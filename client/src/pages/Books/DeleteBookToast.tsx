import { ToastContentProps } from "react-toastify";

const className = {
  buttonContainer: "flex justify-end",
  button:
    "flex justify-center my-2 text-sm px-4 py-2 border rounded-2xl text-center"
};

interface DeleteMsgProps extends Partial<ToastContentProps<{}>> {
  onClick: () => void;
}

const DeleteBookToast = ({ closeToast, onClick }: DeleteMsgProps) => {
  return (
    <div>
      Are you sure you want to delete this book?
      <div className={className.buttonContainer}>
        <button className={`${className.button} mr-2`} onClick={onClick}>
          Delete
        </button>
        <button className={className.button} onClick={closeToast}>
          Close
        </button>
      </div>
    </div>
  );
};

export default DeleteBookToast;
