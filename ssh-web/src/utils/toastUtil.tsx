import { toast, ToastOptions } from 'react-toastify';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

export type ToastType = 'success' | 'error';

export const showToast = (type: ToastType, message: string) => {
  const toastProps: ToastOptions = {
    style: { backgroundColor: '#fffff', color: 'black' },
    progressStyle: {
      background: type === 'success' ? '#0046FF' : 'red',
    },
  };

  toast(
    <div className="flex items-center">
      {type === 'success' ? (
        <FaCheckCircle className="mr-2 text-blue-600" />
      ) : (
        <FaExclamationCircle className="mr-2 text-red-600 " />
      )}
      <span className="text-sm">{message}</span>
    </div>,

    toastProps,
  );
};
