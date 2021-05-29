/**
 * 通用工具类
 */
class Util {

  /**
   * 得到两个数之间的随机数
   * @param Min
   * @param Max
   * @returns {*}
   */
  getRandomNum(Min, Max) {
    let Range = Max - Min;
    let Rand = Math.random();
    return (Min + Math.round(Rand * Range));
  }

  /**
   * 金额千分位显示
   * formatAmount(1000.1465) => 1,000.15
   *
   * 金额数字
   * @param amount
   * 保留小数位数
   * @param num
   * @returns {string}
   */
  formatAmount(amount, num = 2) {
    let formatData = parseFloat((amount + '').replace(/[^\d\.-]/g, '')).toFixed(num) + '';
    let numArray = formatData.split('.')[0].split('').reverse();
    let decimal = formatData.split('.')[1];
    let result = '';
    numArray.forEach((item, index) => {
      result += numArray[index] + ((index + 1) % 3 === 0 && (index + 1) !== numArray.length ? ',' : '');
    });
    return result.split('').reverse().join('') + '.' + decimal;
  }

  /**
   * 还原千分位数字
   * restoreMoney('1,000.122') => 1000.122
   *
   * 千分位数字
   * @param number
   * @returns {number}
   */
  restoreMoney(number) {
    return parseFloat(number.replace(/[^\d\.-]/g, ""));
  }

  /**
   * 过滤得到含有子串的数组
   *
   * @param searchString
   * @param arrayParam
   * 二维数组时使用 查找某个KEY的值 包含子串内容
   * @param key
   * @returns {[]}
   */
  findArrayString(searchString, arrayParam, key = '') {
    let returnArray = [];
    let temp = '';
    arrayParam.forEach(item => {
      temp = key === '' ? item : item[key];
      if (temp.indexOf(searchString) !== -1) {
        returnArray.push(item);
      }
    });
    return returnArray;
  }

  /**
   * 隐藏手机号码中间四位
   * @param phone
   * @returns {string|*}
   */
  hidePhoneSomeNum(phone){
    phone = phone.toString();
    if (phone.length === 11) {
      let reg = /^(\d{3})\d{4}(\d{4})$/;
      return phone.replace(reg, '$1****$2');
    } else {
      return phone;
    }
  }

   static getRpx(){
    let winWidth = wx.getSystemInfoSync().windowWidth;
    return 750/winWidth;
  }

}

export {Util};
