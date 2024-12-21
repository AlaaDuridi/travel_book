import Swal from 'sweetalert2';
import { Theme } from '@mui/material';

const injectSwalStyles = (theme: Theme) => {
  const customSwalStyles = `
    .swal2-popup {
      border-radius: ${theme.spacing(2.5)}; 
    }
    .swal2-container {
      z-index: 1500; 
    }
    .swal2-confirm, 
    .swal2-confirm:focus, 
    .swal2-confirm:hover, 
    .swal2-confirm:active {
      background-color: ${theme.palette.primary.main};
      border: none;
      color: ${theme.palette.primary.contrastText};
      border-radius: ${theme.spacing(5)};
      padding: ${theme.spacing(1.5, 3)};
      margin-right: ${theme.spacing(2)};
      cursor: pointer;
      box-shadow: none;
      text-decoration: none;
      outline: none;
    }
    .swal2-cancel, 
    .swal2-cancel:focus, 
    .swal2-cancel:hover, 
    .swal2-cancel:active {
      background-color: ${theme.palette.grey[500]};
      color: ${theme.palette.primary.contrastText};
      border-radius: ${theme.spacing(5)};
      padding: ${theme.spacing(1.5, 2)};
      cursor: pointer;
      box-shadow: none;
      text-decoration: none;
      outline: none;
      border: none;
    }
  `;

  if (!document.getElementById('custom-swal-styles')) {
    const style = document.createElement('style');
    style.id = 'custom-swal-styles';
    style.textContent = customSwalStyles;
    document.head.appendChild(style);
  }
};

export const deleteAlert = async (
  theme: Theme,
  onConfirm: () => Promise<void>,
  title = 'Are you sure?',
  text = "You won't be able to revert this!",
  confirmButtonText = 'Yes, delete it!',
  cancelButtonText = 'Cancel',
) => {
  injectSwalStyles(theme);

  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    iconColor: theme.palette.primary.main,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    customClass: {
      confirmButton: 'swal2-confirm',
      cancelButton: 'swal2-cancel',
    },
    buttonsStyling: false,
  });

  if (result.isConfirmed) {
    Swal.fire({
      title: 'Deleting...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      await onConfirm();
      Swal.fire({
        title: 'Deleted!',
        text: 'The item has been deleted.',
        icon: 'success',
        iconColor: theme.palette.primary.main,
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'swal2-confirm',
        },
        buttonsStyling: false,
      });
    } catch {
      // Close the loading dialog and show an error message
      Swal.fire({
        title: 'Error!',
        text: 'An unexpected error occurred. Please try again.',
        icon: 'error',
        iconColor: theme.palette.error.main,
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'swal2-confirm',
        },
        buttonsStyling: false,
      });
    }
  }
};

export const confirmAlert = async (
  theme: Theme,
  onConfirm: () => Promise<void>,
  title = 'Are you sure?',
  text = "You won't be able to revert this!",
  confirmMessage?: string,
  confirmButtonText = 'Yes!',
  cancelButtonText = 'Cancel',
) => {
  injectSwalStyles(theme);

  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    iconColor: theme.palette.primary.main,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    customClass: {
      confirmButton: 'swal2-confirm',
      cancelButton: 'swal2-cancel',
    },
    buttonsStyling: false,
  });

  if (result.isConfirmed) {
    Swal.fire({
      title: 'Processing...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      await onConfirm();
      Swal.fire({
        title: 'Confirmed!',
        text: confirmMessage ? confirmMessage : 'The action has been completed successfully.',
        icon: 'success',
        iconColor: theme.palette.primary.main,
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'swal2-confirm',
        },
        buttonsStyling: false,
      });
    } catch {
      // Close the loading dialog and show an error message
      Swal.fire({
        title: 'Error!',
        text: 'An unexpected error occurred. Please try again.',
        icon: 'error',
        iconColor: theme.palette.error.main,
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'swal2-confirm',
        },
        buttonsStyling: false,
      });
    }
  }
};

export const cancelAlert = async (
  theme: Theme,
  onConfirm: () => void,
  title = 'Are you sure?',
  text = "You won't be able to revert this!",
  confirmButtonText = 'Yes, close it!',
  cancelButtonText = 'Cancel',
) => {
  injectSwalStyles(theme);

  const result = await Swal.fire({
    title,
    text,
    icon: 'question',
    iconColor: theme.palette.primary.main,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    customClass: {
      confirmButton: 'swal2-confirm',
      cancelButton: 'swal2-cancel',
    },
    buttonsStyling: false,
  });

  if (result.isConfirmed) {
    Swal.fire({
      title: 'Cancelling...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      await onConfirm();
      Swal.fire({
        title: 'Operation canceled!',
        text: 'The operation has been stopped.',
        icon: 'success',
        iconColor: theme.palette.primary.main,
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'swal2-confirm',
        },
        buttonsStyling: false,
      });
    } catch {
      Swal.fire({
        title: 'Error!',
        text: 'An unexpected error occurred. Please try again.',
        icon: 'error',
        iconColor: theme.palette.error.main,
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'swal2-confirm',
        },
        buttonsStyling: false,
      });
    }
  }
};
