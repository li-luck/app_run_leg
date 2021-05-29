//该文件用来处理统一的弹窗方法
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
const app = getApp();


export const notify = (message, context, type, callback = () => { }) => {
  console.log("context", context);
  console.log("type", type);
  Notify({
    message: message,
    duration: 2000,
    safeAreaInsetTop:true,
    context:context,
    type: type,
    onClose: () => {
      callback();
    }
  });
}
export const toastText = (message, context, callback = () => { }) => {
  Toast({
    mask: true,
    message: message,
    duration: 1000,
    forbidClick: true,
    context: context,
    onClose: () => {
      callback();
    }
  });
}
export const toastSuccess = (message, context, callback = () => { }) => {
  Toast({
    type: "success",
    mask: true,
    message: message,
    duration: 1000,
    forbidClick: true,
    zIndex:9999,
    context: context,
    onClose: () => {
      callback();
    }
  });
}
export const toastFail = (message, context, callback = () => { }) => {
  Toast({
    type: "fail",
    mask: true,
    message: message,
    duration: 1000,
    zIndex:9999,
    forbidClick: true,
    context: context,
    onClose: () => {
      callback();
    }
  });
}
export const toastLoading = (message, context, callback = () => { }) => {
  const toast = Toast({
    type: "loading",
    mask: true,
    message: message,
    duration: 0,
    loadingType: 'spinner',
    forbidClick: true,
    context: context,
    onClose: () => {
      callback();
    }
  });
  return toast;
}

export const dialog = (title, message, context, callback = () => { }) => {
  Dialog.confirm({
    title: title,
    message: message,
    context: context
  })
    .then(() => {
      callback();
    })
    .catch(() => {
    });
}
export const clearToast = () => {
  Toast.clear();
}
const allToast = { notify, toastText, toastSuccess, toastFail, toastLoading, clearToast ,dialog}
export default allToast
