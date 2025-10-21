// Global Toast Utility Functions
// Import this file anywhere in your app to use toast notifications

import { 
  showToast, 
  showSuccessToast, 
  showErrorToast, 
  showInfoToast, 
  showWarningToast 
} from '../Api/HelperFunction';

// Re-export all toast functions for easy access
export {
  showToast,
  showSuccessToast,
  showErrorToast,
  showInfoToast,
  showWarningToast
};

// Example usage:
// import { showSuccessToast, showErrorToast } from '../utils/toast';
// 
// // Show success message
// showSuccessToast('Login successful!');
// 
// // Show error message
// showErrorToast('Something went wrong');
// 
// // Show info message
// showInfoToast('Please check your email');
// 
// // Show warning message
// showWarningToast('Please fill all fields');
// 
// // Show custom type toast
// showToast('Custom message', 'success');
