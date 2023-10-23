import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
    return (
        <ToastContainer
            position="top-center"
            autoClose={2000} // Duration for which the toast is visible (in milliseconds)
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    );
};

export default Toast;

export const showSuccessToast = (message: String) => {
    toast.success(message);
};

export const showErrorToast = (message: String) => {
    toast.error(message);
};
