// moment 初始化配置
const moment = require('./../lib/moment.min');

moment.locale('en', {
  longDateFormat: {
    l: "YYYY-MM-DD",
    L: "YYYY-MM-DD HH:mm:ss"
  }
});

export {moment};
