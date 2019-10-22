export function phoneFormat(phone) {
  var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!myreg.test(phone)) {
    return false;
  } else {
    return true;
  }
}

/**
 * @desc 隐藏手机号码中间
 */
export function phoneConceal(options) {
  return options.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
}
