/* eslint-disable import/no-extraneous-dependencies */
import Swal from 'sweetalert2';

// 錯誤訊息回饋
export function showErrorMsg(msg) {
  Swal.fire({
    title: 'Error!',
    text: msg,
    icon: 'error',
    confirmButtonText: 'Ok',
  });
}
// 狀態toast
export function showStatusMsgToast(
  msg,
  icon = 'success',
  delay = 750,
  option = {},
) {
  setTimeout(
    () => Swal.fire({
      icon,
      toast: true,
      text: msg,
      timer: 1500,
      showConfirmButton: false,
      position: 'bottom-end',
      background: '#BDFFD861',
      padding: '.75rem 1rem',
      ...option,
    }),
    delay,
  );
}

export function formatNum(num) {
  return num.toLocaleString('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function debounce(callback, delay = 350) {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
