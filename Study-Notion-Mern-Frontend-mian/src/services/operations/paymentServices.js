import { toast } from 'react-hot-toast';
import { apiConnector } from '../apiConnector';
import { paymentApi } from '../apis';
import { setPaymentLoading } from '../../redux/slices/profileSlice';
import { resetCart } from '../../redux/slices/cartSlice';

// Load script to the document
export const loadScript = (script) => {
  return new Promise((resolve) => {
    const scriptEle = document.createElement('script');
    scriptEle.src = script;
    scriptEle.onload = () => {
      resolve(true);
    };

    scriptEle.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(scriptEle);
  });
};

export const buyCourses = async (courses, user, token, cartResetTrue, dispatch, navigate) => {
  const toastId = toast.loading('Processing purchase...');
  dispatch(setPaymentLoading(true));
  try {
    const response = await apiConnector(
      'POST',
      paymentApi.POST_MOCK_PURCHASE_API,
      { courses },
      { Authorization: `Bearer ${token}` }
    );

    if (response?.data?.success) {
      toast.success('Purchase successful. You are enrolled.');
      if (cartResetTrue) dispatch(resetCart());
      navigate('/dashboard/enrolled-courses');
    }
  } catch (error) {
    toast.error(error?.response?.data?.error || 'Could not complete purchase. Try again.');
  }
  dispatch(setPaymentLoading(false));
  toast.dismiss(toastId);
};

export const createOrder = async (courses, token) => {
  const toastId = toast.loading('Sending contact details ...');
  try {
    await apiConnector(
      'POST',
      paymentApi.POST_CREATE_ORDER_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    toast.error(error?.response?.data?.error || 'Contact failed');
  }
  toast.dismiss(toastId);
};

export const sendPaymentSuccess = async (response, token) => {
  const toastId = toast.loading('Sending Payment Success Email...');
  try {
    await apiConnector('POST', paymentApi.POST_SEND_PAYMENT_SUCCESS_EMAIL_API, response, {
      Authorization: `Bearer ${token}`,
    });
  } catch (error) {
    toast.error(error?.response?.data?.error || 'Failed to send Payment Success Email');
  }
  toast.dismiss(toastId);
};

export const verifyPaymentSignature = async (response, courses, token, cartResetTrue, dispatch, navigate) => {
  const toastId = toast.loading('Verifying Payment...');
  dispatch(setPaymentLoading(true));
  try {
    apiConnector(
      'POST',
      paymentApi.POST_VERIFY_PAYMENT_SIGNATURE_API,
      { ...response, courses },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    navigate('/dashboard/enrolled-courses');
    if (cartResetTrue) dispatch(resetCart());
  } catch (error) {
    toast.error(error?.response?.data?.error || '⚠️ Payment Verification Failed');
  }
  dispatch(setPaymentLoading(false));
  toast.dismiss(toastId);
};
