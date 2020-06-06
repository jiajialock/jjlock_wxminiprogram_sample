var app = getApp();
if (app.globalData === undefined) {
  app.globalData = {};
}
var isAndroid = undefined;
var data = {};
var globalData = app.globalData;
const AVAILABLE_DEVICE_NAME = "Yun";
const BLUETOOTH_READ_SERVICE_ID = 'FF91';
const BLUETOOTH_WRITE_SERVICE_ID = 'FF92';
const BLUETOOTH_NOTIFY_SERVICE_ID = 'FF93';
const FRESH_CARD_TIME = 10;
var cardTimer = undefined;
/**
 * 连接蓝牙超时
*/
const CONNECT_OUT_TIME = 30;
/**time.js */

/**
 * 获取当前时间
*/
const getCurrentTime = () => {
  return parseInt(new Date().getTime() / 1000);
}


/**
 * 时间戳转时间
*/
const timeToDate = (time, bool = true) => {
  const date = new Date(time);
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  let newDate = [year, month, day].map(formatNumber).join('-');
  if (!bool) {
    return newDate
  }
  return newDate + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 获取时间
*/
const getDateTime = (time = undefined) => {
  let date = undefined;
  if (time) {
    date = new Date(time);
  } else {
    date = new Date();
    time = date.getTime();
  }
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  return { year, month, day, hour, minute, second, time };
}

/**
   * 获取下一天日期
  */
const getNextDay = (month, day) => {
  day++;
  if (day > 30) {
    month *= 1;
    if ([1, 3, 5, 7, 8, 10, 12].indexOf(month) !== -1) {
      month++;
      day = 1;
    }
  } else if (day > 28) {
    if (month == 2) {
      const isRun = year % 400 == 0 && year % 100 != 0 || year % 400 == 0;
      if (isRun) {
        month++;
        day = 1;
      }
    }
  }
  month = month < 10 ? "0" + month * 1 : month;
  day = day < 10 ? "0" + day * 1 : day;
  return { nextMonth: month, nextDay: day };
}

let timer = undefined;
/**
 * 每秒倒计时方法
 * second : 秒数
 * call : 回调方法
*/
const timeCountdown = (second, call) => {
  second--;
  if (second >= 0) {
    call(second);
    timer = setTimeout(() => {
      timeCountdown(second, call);
    }, 1000)
  } else {
    stopTimeCountdown();
  }
}

/**
 * 停止倒计时
*/
const stopTimeCountdown = () => {
  if (timer) clearTimeout(timer);
}

/**
 * 时间相隔天数
*/
const dateSeparatedDay = (startDate, endDate) => {
  startDate = Date.parse(new Date(startDate));
  endDate = Date.parse(new Date(endDate));
  return Math.abs(parseInt((startDate - endDate) / 1000 / 3600 / 24));
}
/**
 * 设置超时时间方法
 * second : 秒数
 * call : 超时回调
*/
let outTime = undefined;
const settingOutTime = (second, call) => {
  outTime = setTimeout(() => {
    call();
    clearOutTime();
  }, second * 1000);
}

/**
 * 清除设置超时
*/
const clearOutTime = () => {
  if (outTime) clearTimeout(outTime);
}
/** */

/** message.js */
/**
 * 提示弹出框
 * content 提示内容
 * call 回调函数
 * showCancel 是否显示取消按钮
 * title 标题
 */
const message = (content, call, showCancel = false, title = "提示") => {
  wx.showModal({
    title,
    content,
    showCancel,
    success: (res) => {
      if (res.confirm && call) {
        call();
      }
    }
  })
}

/**
 * 消息弹窗
 * title: 标题
 * icon : 图标
*/
const info = (title, icon = "success") => {
  wx.showToast({
    title,
    icon,
    duration: 1000,
    mask: true
  })
}

/**
 * 加载进度
 * bool 开关状态
 * title 标题
 * mask 是否显示透明蒙层，防止触摸穿透
 */
const loading = (bool = true, title = "数据加载中...", mask = true) => {
  if (bool) {
    wx.showLoading({
      title, mask
    })
  } else {
    wx.hideLoading();
  }
}
/** */

/**error.js */
const minLoginError = "小程序登录失败请重新打开微信";
const input = "请输入";
const inputAccount = input + "账户";
const inputPassword = input + "密码";
const inputOldPassword = input + "旧密码";
const inputNewPassword = input + "新密码";
const newPasswordError = "两次输入的新密码不一直，请重新输入";
const inputRandomNumber = input + "随机数";
const inputRandomNumberError = input + "4位随机数";
const inputLockAsName = input + "锁别称";
const inputCardAsName = input + "卡别称";
const inputMobile = input + "手机号码";
const codeNotFound = "手机验证码不能为空";
const timeError = "开始时间必须小于结束时间";
const synchronizeDataString = "是否确定同步数据?";
const synchronizeTimeString = "是否确定同步时间?";
const notFoundLock = "没有找到锁";
const inputName = input + "名称";
const inputAcceptAccount = input + "接收者用户名"
const logoutLockString = "是否确定注销当前设备?";
const authorizePhone = "请授权手机号码信息";
const systemError = "出错了，请稍后重试!";
const androidPositionError = "需要授权地址才能使用蓝牙";
const currentDeviceBind = "当前设备已经被绑定过了，请重新选择";
const connectionBluetoothIng = "蓝牙连接中...";
const connectionIng = "蓝牙未连接成功，请稍后重试...";
const lockBindIng = "正在绑定锁...";
const connectionBluetoothSuccess = "蓝牙连接成功!";
const bindLockSuccess = "绑定锁成功!";
const unLockSuccess = "解绑锁成功!";
const unLockFail = "解绑失败!";
const notConnectionLock = "请打开蓝牙设备连接锁!";
const lockStandbyStatus = "请确保门锁面板亮着!";
const unLockIng = "注销中...";
const getElectricityIng = "获取电量中...";
const openLockIng = "开锁中...";
const lockAddIng = "添加中..."
const openLockSuccess = "开锁成功...";
const logSynchronizeSuccess = "记录同步成功...";
const logSynchronizeFail = "记录同步失败...";
const logSynchronizeIng = "记录同步中...";
const timeSynchronizeSuccess = "时间同步成功...";
const timeSynchronizeIng = "时间同步中...";
const addCardIng = "新增卡片中,请稍后...";
const addCardSuccess = "新增卡片成功...";
const addCardFail = "新增卡片失败...";
const editCardIng = "修改卡片中,请稍后...";
const editCardSuccess = "修改卡片成功...";
const editCardFail = "修改卡片失败";
const deleteCardIng = "删除卡片中,请稍后...";
const deleteCardSuccess = "删除卡片成功...";
const deleteCardFail = "删除卡片失败...";
const cardNumber = "卡片数量已经达到上限了";
const cardExist = "卡片已经被添加过了";
const noFoundCard = "没有找到卡片信息！";
const connectTimeOut = "蓝牙连接超时";
const addCardSettingFail = "添加卡配置失败";
const openLockError = "开锁太频繁了，请稍后重试!";

const opFrequencyError = "操作太频繁了，请稍后重试!";
const openLockTimeOut = "开锁失败，请检查锁是否在身边！";

const opLockTimeOut = "操作失败，请检查锁是否在身边！";
const lockDeleteTips = "删除前请拍亮门锁面板，确定删除?";
const lockMoveTips = "确定转移当前锁?";
const keyAliasNull = "钥匙别称不能为空！";
const keyAccountNull = "钥匙发送账户不能为空！";
const keySendSuccess = "钥匙发送成功";
const keyModifySuccess = "钥匙修改成功";

const errorInfo = {
  10000: '未开启蓝牙设备',
  10001: '请打开蓝牙设备,进行适配',
  10002: '没有找到指定设备,Android请开启定位服务',
  10003: '连接失败',
  10004: '没有找到指定服务',
  10005: '没有找到指定特征值',
  10006: '当前连接已断开',
  10007: '当前特征值不支持此操作',
  10008: '其余所有系统上报的异常',
  10009: 'Android 系统特有，系统版本低于 4.3 不支持 BLE',
  40001: '暂时无法连接此设备',
  40002: '设备已经被他人使用',
  40003: '开锁失败',
  40004: '获取电量失败',
  40005: '关锁失败',
  40006: '数据异常',
  40007: '设备异常，请稍后重试!',
}

/**
 * 获取错误信息
 * code : 错误编号
 * call : 回调方法
 */
const getErrorInfo = (code, error = undefined) => {
  var params = {};
  params.succeed = false;
  let content = errorInfo[code];
  handleRestartError();
  if (!content) {
    content = "未知错误";
  }
  params.reason = content;
  wx.showModal({
    title: "错误提示",
    content,
    showCancel: false,
    success: (res) => {
      if (res.confirm && error) {
        error(params);
      }
    }
  })
}
/** */

/**util.js */
/**
 * 获取上一页实例
 * call : 回调方法
*/
/**
 * 获取时间戳
*/
const getDateLong = (date, time) => {
  let dataString = date + " " + time + ':00.0';
  dataString = dataString.substring(0, 18);
  dataString = dataString.replace(/-/g, '/');
  return new Date(dataString).getTime();
}


/**
 * 二进制转十六进制字符
 */
const ab2hex = (buffer) => {
  let hexArr = Array.prototype.map.call(
    new Uint8Array(buffer), (bit) => {
      return ('00' + bit.toString(16)).slice(-2)
    })
  return hexArr.join('');
}

/**
 * 十进制转二进制
*/
const decimalToBinary = (decimalArray, length) => {
  let buffer = new ArrayBuffer(length)
  if (decimalArray.length > 0) {
    let dataView = new DataView(buffer)
    decimalArray.map((item, key) => {
      dataView.setInt8(key, decimalArray[key]);
    })
  }
  return buffer;
}

/**
 * 十六进制转十进制
 * hexString : 十六进制字符串
 */
const hexToDecimal = (hexString) => {
  let array = [];
  if (hexString && hexString.length > 0) {
    let length = hexString.length;
    for (let index = 0; index < length; index++) {
      if (index % 2 === 1) {
        let currrentCode = hexString.substr(index - 1, 2);
        array.push(parseInt(currrentCode, 16));
      }
    }
  }
  return array;
}

/**
 * 十六进制转二进制
 * hexString : 十六进制字符串
 */
const blueToothWriteValue = (hexString) => {
  let decimal = hexToDecimal(hexString);
  return decimalToBinary(decimal, Math.ceil(hexString.length / 2));
}

/**
 * 十进制字符转十六进制
 * hexString : 十六进制字符串
 */
const decimalToHex = (decimalString) => {
  return parseInt(decimalString, 16);
}

/**
 * 16进制字符bcc验证
 * string: 16进制字符串
*/
const bccVerification = (string) => {
  let stringLength = Math.ceil(string.length / 2);
  let array = [];
  for (let i = 0; i < stringLength; i++) {
    let temp = string.substr(i * 2, 2);
    array.push(`0x${temp}`);
  }
  let head = 0x00;
  array.map(item => head ^= item);
  let result = head.toString(16);
  if (result.length == 1) {
    result = "0" + result;
  }
  return result;
}

/**
 * 用户输入
*/
const userInputNumber = (input) => {
  let result = [];
  input = parseInt(input).toString(16);
  if (input.length == 1) {
    result.push(0);
  }
  if (input.length == 2) {
    result.push(0);
  }
  if (input.length == 3) {
    result.push(0);
  }
  result.push(input);
  return result.join("");
}

/**
 * 锁初始化指令
 * userInput: 用户输入随机数
*/
const initLockAction = (userInput) => {
  let action = [];
  action.push(userInputNumber(userInput));
  let { year, month, day, hour, minute, second } = hexDate();
  let dateArray = [];
  dateArray.push(year);
  dateArray.push(month);
  dateArray.push(day);
  dateArray.push(hour);
  dateArray.push(minute);
  dateArray.push(second);
  let initialTimeString = dateArray.join("");
  action.push(initialTimeString);
  let result = action.join("");
  action.push(bccVerification(result));
  action.push("44");
  return { action: "41" + action.join(""), initialTimeString };
}

/**
 * 同步时间指令
*/
const synchronizeTimeAction = () => {
  let action = [];
  let { year, month, day, hour, minute, second, time } = hexDate();
  action.push(year);
  action.push(month);
  action.push(day);
  action.push(hour);
  action.push(minute);
  action.push(second);
  let result = action.join("");
  action.push(bccVerification(result));
  action.push("44");
  return { action: "4a" + action.join(""), time };
}

/**
 * 随机密码指令
*/
const randomPasswrodAction = () => {
  return "420144"
}

/**
 * 随机密码成功指令
*/
const randomPasswrodSuccessAction = () => {
  return "431a44"
}

/**
 * 随机密码失败指令
*/
const randomPasswrodFailAction = () => {
  return "431b44"
}

/**
 * 获取蓝牙mac地址指令
*/
const getBlueToothMacAction = () => {
  return "440244"
}

/**
 * 获取蓝牙mac地址指令
*/
const logSuccessAction = () => {
  return "4e0144"
}

/**
 * 获取16进制时间
*/
const hexDate = () => {
  let { year, month, day, hour, minute, second, time } = getDateTime();
  year = userInputNumber(year);
  month = parseInt(month).toString(16);
  if (month.length < 2) {
    month = "0" + month;
  }
  day = parseInt(day).toString(16);
  if (day.length < 2) {
    day = "0" + day;
  }
  hour = parseInt(hour).toString(16);
  if (hour.length < 2) {
    hour = "0" + hour;
  }
  minute = parseInt(minute).toString(16);
  if (minute.length < 2) {
    minute = "0" + minute;
  }
  second = parseInt(second).toString(16);
  if (second.length < 2) {
    second = "0" + second;
  }
  return { year, month, day, hour, minute, second, time };
}

/**
   * 开锁指令
   * number : 用填写随机数
   * mac : 设备mac地址
  */
const handleOpenLockAction = (number, mac) => {
  let action = [];
  action.push(userInputNumber(number));
  action.push(mac.replace(/:/g, ""));
  let { year, month, day, hour, minute, second } = hexDate();
  action.push(year);
  action.push(month);
  action.push(day);
  action.push(hour);
  action.push(minute);
  action.push(second);
  let result = action.join("");
  action.push(bccVerification(result));
  action.push("44");
  return "46" + action.join("");
}


/**
   * 解绑锁指令
   * number : 用填写随机数
   * initDate : 添加锁的时间
  */
const handleUnLockAction = (number, initDate) => {
  let action = [];
  action.push(userInputNumber(number));
  action.push(initDate);
  let result = action.join("");
  action.push(bccVerification(result));
  action.push("44");
  return "47" + action.join("");
}

/**
 * 获取四位随机数
*/
const handleRandomNumber = () => {
  return Math.floor(Math.random() * 9000) + 1000;
}

/**
 * 获取蓝牙电量指令
*/
const getBlueToothElectricityAction = () => {
  return "480144"
}

/**
 * 获取开锁记录长度指令
*/

const openLockLogLengthAction = () => {
  return "4c0144";
}

/**
 * 获取开锁记录长度指令
*/

const logAction = () => {
  return "4d0144";
}

/**
 * 添加卡片请求指令
*/
const addCardApplyAction = () => {
  return "5101010144";
}

/**
 * 添加卡片设置指令
*/
const addCardSettingAction = () => {
  return "5001010144";
}

/**
 * 确认添加卡片指令
*/
const confirmAddCardAction = (cardNumber, password) => {
  password = parseInt(password).toString(16);
  let length = password.length;
  for (let i = length; i < 8; i++) {
    password = "0" + password;
  }
  let cnofirm = cardNumber + password;
  let bcc = bccVerification(cnofirm)
  return "5105" + cnofirm + bcc + "44";
}

/**
 * 编辑卡片指令
*/
const editCardAction = (cardNumber, password) => {
  password = parseInt(password).toString(16);
  let length = password.length;
  for (let i = length; i < 8; i++) {
    password = "0" + password;
  }
  let cnofirm = cardNumber + password;
  let bcc = bccVerification(cnofirm)
  return "510a" + cnofirm + bcc + "44";
}

/**
 * 删除卡片指令
*/
const deleteCardAction = (cardNumber) => {
  let bcc = bccVerification(cardNumber)
  return "5107" + cardNumber + bcc + "44";
}
/** */


/** detail.js */
export const handleOpenLock = (lock, call = undefined, error = undefined) => {
  if (lock && lock.lockMac) {
    data = lock;
    confirmIsAndroid();
    handleBluetoothOp(openLockIng, (deviceId) => handleOpenConnection(deviceId, call), call);
  }
}

export const handleDeleteLock = (lock, call = undefined, error = undefined) => {
  if (lock && lock.lockMac) {

    data = lock;
    confirmIsAndroid();
    handleBluetoothOp(unLockIng, (deviceId) => handleDeleteLockConnection(deviceId, call), call);
  }
}

export const handleSyncLockTime = (lock, call = undefined) => {
  if (lock && lock.lockMac) {
    data = lock;
    confirmIsAndroid();
    handleBluetoothOp(timeSynchronizeIng, (deviceId) => handleSynchronizeTimeConnection(deviceId, call), call);
  }
}

export const handleSyncLockData = (lock, call = undefined) => {
  if (lock && lock.lockMac) {
    data = lock;
    confirmIsAndroid();
    handleBluetoothOp(logSynchronizeIng, (deviceId) => handleSynchronizeDataConnection(deviceId, call), call);
  }
}

export const handleReadCard = (lock, call) => {
  if (lock && lock.lockMac) {
    data = lock;
    confirmIsAndroid();
    let currentCard = undefined;
    handleBluetoothOp(undefined, (deviceId) => handleReadCardConnection(deviceId, call), call);

  }
}

const handleReadCardConnection = (deviceId, call = undefined) => {
  handleConnectionCurrentBluetooth(deviceId, (characteristic) => {
    var params = {};
    let type = characteristic.substr(0, 4);
    if (type == "5103") {
      const identifier = characteristic.substr(4, 10)
      params.succeed = true;
      params.identifier = identifier;
      clearTimeout(globalData.currentTimer);
      if (call) {
        call(params);
      }
    } else if (type == "5102") {
      params.succeed = false;
      params.reason = cardNumber;
      handleRestartError();
      if (call) {
        call(params);
      }
      if (cardTimer) clearInterval(cardTimer);
      clearTimeout(globalData.currentTimer);
      handleCloseBLEConnection(deviceId);
    } else if (type == "5104") {
      params.succeed = false;
      params.reason = cardExist;
      if (cardTimer) clearInterval(cardTimer);
      handleRestartError();
      if (call) {
        call(params);
      }
      clearTimeout(globalData.currentTimer);
      handleCloseBLEConnection(deviceId);
    } else if (type == "5002") {
      let status = characteristic.substr(4, 2);
      if (status == "01") {
        handleWriteAction(addCardApplyAction(), () => handleFreshCardTime(deviceId));
      } else {
        params.succeed = false;
        params.reason = cardExist;
        handleRestartError();
        if (call) {
          call(params);
        }
        if (cardTimer) clearInterval(cardTimer);
        clearTimeout(globalData.currentTimer);
        handleCloseBLEConnection(deviceId);
      }
    } else if (type == "5106") {
      let status = characteristic.substr(4, 4).toUpperCase();
      if (status == "4F4B") {
        params.succeed = true;
      } else {
        params.succeed = false;
        handleRestartError();
      }
      if (call) {
        call(params);
      }
      if (cardTimer) clearInterval(cardTimer);
      clearTimeout(globalData.currentTimer);
      handleCloseBLEConnection(deviceId);
    }
  }, () => {
    handleWriteAction(addCardSettingAction());
  })
}

export const handleAddLockCardPassword = (lock, identifier, password, call = undefined) => {
  if (lock && lock.lockMac) {
    data = lock;
    handleWriteAction(confirmAddCardAction(identifier, password));
    // handleBluetoothOp(undefined, (deviceId) => handleAddLockCardPasswordConnection(deviceId, identifier,password, call));
  }
}

export const handleEditLockCardPassword = (lock, identifier, password, call = undefined) => {
  if (lock && lock.lockMac) {
    data = lock;
    handleBluetoothOp(undefined, (deviceId) => handleEditLockCardPasswordConnection(deviceId, identifier, password, call), call);
  }
}

export const handleDeleteLockCardPassword = (lock, identifier, call = undefined) => {
  if (lock && lock.lockMac) {
    data = lock;
    handleBluetoothOp(undefined, (deviceId) => handleDeleteLockCardPasswordConnection(deviceId, identifier, call), call);
  }
}

const handleDeleteLockCardPasswordConnection = (deviceId, identifier, call = undefined) => {
  var params = {};
  handleConnectionCurrentBluetooth(deviceId, (characteristic) => {
    let type = characteristic.substr(0, 4);
    if (type == "5108") {
      params.succeed = false;
      params.reason = noFoundCard;
    } else {
      let status = characteristic.substr(4, 4).toUpperCase();
      if (status == "4F4B") {
        params.succeed = true;
      } else {
        params.succeed = false;
        params.reason = deleteCardFail;
      }
    }
    handleRestartError();
    if (call) {
      call(params);
    }
    clearTimeout(globalData.currentTimer);
    handleCloseBLEConnection(deviceId);
  }, () => handleWriteAction(deleteCardAction(identifier)),
    () => {
      handleCloseBLEConnection(deviceId);
    })
}

const handleEditLockCardPasswordConnection = (deviceId, identifier, password, call = undefined) => {
  handleConnectionCurrentBluetooth(deviceId, (characteristic) => {
    var params = {};
    let type = characteristic.substr(0, 4);
    if (type == "5108") {
      params.succeed = false;
      params.reason = noFoundCard;
    } else {
      let status = characteristic.substr(4, 4).toUpperCase();
      if (status == "4F4B") {
        params.succeed = true;

      } else {
        params.succeed = false;
        params.reason = editCardFail;
      }
    }
    if (call) {
      call(params);
    }
    clearTimeout(globalData.currentTimer);
    handleCloseBLEConnection(deviceId);
  },
    () => handleWriteAction(editCardAction(identifier, password))),
    () => {
      handleCloseBLEConnection(deviceId);
    }
}

const handleAddLockCardPasswordConnection = (deviceId, identifier, password, call = undefined) => {
  handleConnectionCurrentBluetooth(deviceId, (characteristic) => {
    var params = {};
    let type = characteristic.substr(0, 4);
    if (type == "5103") {
      const id = characteristic.substr(4, 10)
      params.identifier = id;
      if (call) {
        call(params);
      }
      clearOutTime();
      clearTimeout(globalData.currentTimer);
    } else if (type == "5102") {
      if (cardTimer) clearInterval(cardTimer);
      handleCloseBLEConnection(deviceId);
    } else if (type == "5104") {
      if (cardTimer) clearInterval(cardTimer);
      handleCloseBLEConnection(deviceId);
    } else if (type == "5002") {
      if (cardTimer) clearInterval(cardTimer);
      let status = characteristic.substr(4, 2);
      if (status == "01") {
        handleWriteAction(addCardApplyAction(), () => handleFreshCardTime(deviceId));
      } else {
        handleCloseBLEConnection(deviceId);
      }
    } else if (type == "5106") {
      if (cardTimer) clearInterval(cardTimer);
      let status = characteristic.substr(4, 4).toUpperCase();
      handleCloseBLEConnection(deviceId);
      if (status == "4F4B") {
        params.succeed = true;
      } else {
        params.succeed = false;
      }
      if (call) {
        call(params);
      }
      clearTimeout(globalData.currentTimer);
    }
  }, () => {
    handleWriteAction(confirmAddCardAction(identifier, password));
  })
}
/**
   * 请求刷卡倒计时
  */
const handleFreshCardTime = (deviceId) => {
  let timeLength = FRESH_CARD_TIME;
  cardTimer = setInterval(() => {
    timeLength--;
    if (timeLength < 0) {
      wx.hideToast();
      handleCloseBLEConnection(deviceId);
      if (cardTimer) clearInterval(cardTimer);
    } else {
      wx.showToast({
        icon: "loading",
        title: `请在${timeLength}秒内在锁上刷卡`,
        mask: true
      })
    }
  }, 1000)
}

const handleSynchronizeDataConnection = (deviceId, call = undefined) => {
  var params = {};
  const openLogLengthAction = openLockLogLengthAction();
  let logLength = 0;
  let logNnumber = 0;
  var logStr = "";
  const { lockId, advertiseData } = data;
  var logLengthPerItem = 9;
  if (!advertiseData || advertiseData.length < 18) {
    logLengthPerItem = 4;
  }
  handleConnectionCurrentBluetooth(
    deviceId,
    (characteristic) => {
      //获取日志长度
      if (characteristic.substr(0, 2).toUpperCase() == "4C" && characteristic.substr(6, 2).toUpperCase() == "44") {
        let logLengthArray = hexToDecimal(characteristic.substr(2, 4));
        if (logLength === 0) {
          logLengthArray.map(item => {
            logLength += parseInt(item);
          })
        }
        if (logLength > 0) {
          handleWriteAction(logAction());
        } else {
          clearTimeout(globalData.currentTimer);
          info(logSynchronizeSuccess);
          params.succeed = true;
          params.log = "";
          params.logLength = 0;
          if (call) {
            call(params);
          }
          handleCloseBLEConnection(deviceId);
        }
        //日志同步成功
      } else if (characteristic.substr(0, 2).toUpperCase() == "4F") {
        handleCloseBLEConnection(deviceId);
        clearTimeout(globalData.currentTimer);
        //日志返回处理
      } else {
        logStr += characteristic;
        if (logStr.length >= logLengthPerItem * 2 * logLength) {
          if (logLengthPerItem == 4) {
            handleWriteAction(logSuccessAction());
          } else {
            handleCloseBLEConnection(deviceId);
          }
          var log = "";
          for (var index = 0; index < logLength; index++) {
            if (index > 0) {
              log += ",";
            }
            log += logStr.substr(index * logLengthPerItem * 2, logLengthPerItem * 2);
          }
          params.succeed = true;
          params.log = log;
          params.logLength = logLength;
          loading(false);
          clearTimeout(globalData.currentTimer);
          if (call) {
            call(params);
          }
        }
      }
    },
    () => {
      handleWriteAction(openLogLengthAction);
    }
  );
}
/**
   * 处理同步时间连接
  */
const handleSynchronizeTimeConnection = (deviceId, call = undefined) => {
  const { lockMac } = data;
  const { action, time } = synchronizeTimeAction();
  var params = {};
  handleConnectionCurrentBluetooth(
    deviceId,
    (characteristic) => {
      if (characteristic.substr(0, 2).toUpperCase() == "4B") {
        clearTimeout(globalData.currentTimer);
        info(timeSynchronizeSuccess);
        params.succeed = true;
        if (call) {
          call(params);
        }
        handleCloseBLEConnection(deviceId);
      }
    },
    () => handleWriteAction(action)
  );
}

/**
   * 删除锁连接
  */
const handleDeleteLockConnection = (deviceId, call) => {
  const { lockMac, anyCode, initialTimeString, lockName } = data;
  let unLockAction = handleUnLockAction(anyCode, initialTimeString);
  handleConnectionCurrentBluetooth(deviceId, (characteristic) => {
    var params = {};
    if (unLockAction == characteristic) {
      const { lockId, deviceId } = data;
      clearTimeout(globalData.currentTimer);
      info(unLockSuccess);
      params.succeed = true;
      handleCloseBLEConnection(deviceId);
      wx.removeStorageSync(lockMac + "-deviceId");
    } else {
      clearTimeout(globalData.currentTimer);
      params.succeed = false;
      params.reason = unLockFail;
      info(unLockFail);
      handleCloseBLEConnection(deviceId);
    }
    if (call) {
      call(params);
    }
  }, () => {
    handleWriteAction(unLockAction);
  })
}

const handleSearchBluetooth = (call = undefined) => {
  let callback = false;
  var that = this;
  var hasServiceId = data.advertiseData && data.advertiseData.length > 18
  handleSearchLock((item) => {
    if (!callback) {
      callback = true;
      data.deviceId = item.deviceId;
      if (call) call(item.deviceId);
    }
  }, undefined, data.lockName, hasServiceId);

}

const handleBluetoothOp = (opType, callBluetooth, call = undefined) => {
  confirmOpenBluetoothAdapter(() => {
    const endOpenLockTime = globalData[data.lockName + '-endOpenLockTime'];
    if (endOpenLockTime) {
      if (getCurrentTime() - endOpenLockTime < 6) {
        // message(opFrequencyError);
        var params = {};
        params.succeed = false;
        params.reason = opFrequencyError;
        if (call) {
          call(params);
        }
        return;
      }
    }
    const { lockMac } = data;
    var deviceId = data.deviceId;
    if (opType) {
      loading(true, opType);
    }
    if (!deviceId) {
      var deviceIdInStorage = wx.getStorageSync(lockMac + '-deviceId');
      if (deviceIdInStorage) {
        deviceId = deviceIdInStorage;
      }
    }
    if (!deviceId && isAndroid === true) {
      var mac = lockMac.toUpperCase();
      var array = mac.split(":");
      deviceId = "";
      for (var i = 5; i > -1; i--) {
        deviceId += array[i];
        if (i > 0) {
          deviceId += ":";
        }
      }
    }
    if (deviceId) {
      confirmOpenBluetoothAdapter(callBluetooth(deviceId));
      let openLockTimer = setTimeout(() => {
        loading(false);
        handleCloseBLEConnection(deviceId);
        var params = {};
        params.succeed = false;
        params.reason = opLockTimeOut;
        handleRestartError();
        if (call) {
          call(params);
        }
        // message(opLockTimeOut);
        wx.removeStorageSync(data.lockMac + '-deviceId');
      }, CONNECT_OUT_TIME * 1000);
      globalData.currentTimer = openLockTimer;
    } else {
      handleSearchBluetooth((currentDeviceId) => callBluetooth(currentDeviceId));
      let openLockTimer = setTimeout(() => {
        loading(false);
        handeStopBluetoothDevices();
        handleCloseBLEConnection(deviceId);
        // message(opLockTimeOut);
        var params = {};
        params.succeed = false;
        params.reason = opLockTimeOut;
        handleRestartError();
        if (call) {
          call(params);
        }
      }, CONNECT_OUT_TIME * 1000);
      globalData.currentTimer = openLockTimer;
    }
  });
}

/**
  * 开锁连接
 */
const handleOpenConnection = (deviceId, call) => {
  const { anyCode, lockMac, openIng, electricity } = data;
  var params = {};
  if (anyCode && lockMac && !openIng) {
    data.openIng = true;
    let openLockAction = handleOpenLockAction(anyCode, lockMac);
    handleConnectionCurrentBluetooth(deviceId, (characteristic) => {
      const { openLockAction, deviceId } = data;
      if (openLockAction && openLockAction.toUpperCase() == characteristic.toUpperCase()) {
        clearTimeout(globalData.currentTimer);
        params.succeed = true;
        params.electricity = data.electricity[0];
        info(openLockSuccess);
        wx.setStorageSync(data.lockMac + '-deviceId', deviceId);
        let endOpenLockTime = getCurrentTime();
        data.openIng = false;
        globalData[data.lockName + '-endOpenLockTime'] = endOpenLockTime;
        handleCloseBLEConnection(deviceId);
        if (params.succeed && call) {
          call(params);
        }
      }
      if (characteristic.substr(0, 2) === "49") {
        let electricity = hexToDecimal(characteristic.substr(2, 2));
        data.electricity = electricity;
        handleWriteAction(openLockAction);

      }
    }, () => {
      data.openLockAction = openLockAction;
      data.deviceId = deviceId;
      if (electricity) {
        handleWriteAction(openLockAction);
      } else {
        let action = getBlueToothElectricityAction();
        handleWriteAction(action);

      }
    });
  }

}
/** */

const confirmIsAndroid = () => {
  if (isAndroid === undefined) {
    wx.getSystemInfo({
      success: function (res) {
        isAndroid = res.platform.indexOf("android") > -1;
      },
    })
    confirmIsAndroid();
  }
}


/**  blueTooth.js */
/**
 * blueTooth 封装微信蓝牙API
 * 只导出四个方法：
 * 
 * handleSearchLock : 查询设备，传入call回调方法。
 * 只要在未调用连接设备之前或者主动调用停止寻找设备之前会一直查询设备。
 * 每次查询到符合规定的设备就会触发回调方法，回调方法传入当前设备的信息
 * binded : 当前设备是否绑定过 
 * mac : 设备当前mac地址
 * 其他信息：为微信API返回，请查看微信蓝牙文档
 * 
 * handeStopBluetoothDevices : 停止查询设备
 * 
 * handleConnectionCurrentBluetooth : 连接当前设备，传入查询到的设备id，回调方法
 * 回调方法是监听蓝牙设备的特征值返回
 * 
 * handleWriteAction : 根据业务写入指令，回调方法非必须
 * 
 * handleCloseBLEConnection: 关闭连接,传入设备id。回调方法非必须
*/

let currentConnectionBluetooth = undefined;
let errorHandle = undefined;
const errorNumber = {
  actionMaxNumber: {},
  maxNumber: 2
};
/**
   * 事件重试
   * field: 统计字段名称
   * res: 错误信息
   * call: 回调方法
   * error : 回调方法
   */
const handleEventRestart = (field, res, call, error = undefined) => {
  let { maxNumber, actionMaxNumber } = errorNumber;
  let fieldValue = actionMaxNumber[field] || 0;
  if (fieldValue > maxNumber) {
    if (res.errCode) {
      getErrorInfo(res.errCode, error);
    }
    if (errorHandle) {
      errorHandle(error);
      clearTimeout(globalData.currentTimer);
      errorHandle = undefined;
    };
    loading(false);
  } else {
    fieldValue++;
    errorNumber.actionMaxNumber[field] = fieldValue;
    call();
  }
}

/**
  * 重设错误信息
  */
const handleRestartError = () => {
  errorNumber.actionMaxNumber = {};
}

/**
  * 蓝牙适配
  * call : 回调函数
  */
const handleBlueToothAdapter = (call, errorHandle = true) => {
  wx.openBluetoothAdapter({
    success: (res) => {
      if (res.errMsg === 'openBluetoothAdapter:ok') {
        call();
      } else {
        if (errorHandle === true) {
          res.errCode = 10001;
          handleEventRestart("adapter", res, () => handleBlueToothAdapter(call));
        }
      }
    },
    fail: (res) => {
      if (errorHandle === true) {
        handleEventRestart("adapter", res, () => handleBlueToothAdapter(call));
      }
    }
  })

}

const confirmOpenBluetoothAdapter = (call, handleError = true) => {
  wx.getBluetoothAdapterState({
    success: function (res) {
      if (res.available === true) {
        if (call) {
          call();
        }
      } else {
        handleBlueToothAdapter(() => confirmOpenBluetoothAdapter(call), handleError);
      }
    },
    fail: function (res) {
      if (res.errCode === 10000) {
        handleBlueToothAdapter(() => confirmOpenBluetoothAdapter(call), handleError);
      } else {
        if (handleError) {
          handleEventRestart("confirmBluetooth", res, () => confirmOpenBluetoothAdapter(call));
        }
      }
    }
  })
}

/**
 * 蓝牙适配状态
 * call : 回调函数
 */
const handleBluetoothAdapterState = (call) => {
  wx.getBluetoothAdapterState({
    success: (res) => {
      if (res.errMsg === 'getBluetoothAdapterState:ok') {
        call();
      } else {
        handleEventRestart("adapterState", res, () => handleBluetoothAdapterState(call));
      }
    },
    fail: (res) => {
      handleEventRestart("adapterState", res, () => handleBluetoothAdapterState(call));
    }
  })
}


/**
 * 开始查询蓝牙
 * call : 回调函数
 */
const handleSearchBluetoothDevice = (call, hasServiceId = true) => {

  if (hasServiceId === false) {
    wx.startBluetoothDevicesDiscovery({
      allowDuplicatesKey: false,
      success: (res) => {
        if (res.errMsg === 'startBluetoothDevicesDiscovery:ok') {
          call();
        } else {
          handleEventRestart("searchBluetooth", res, () => handleSearchBluetoothDevice(call));
        }
      },
      fail: (res) => {
        handeStopBluetoothDevices();
        handleEventRestart("searchBluetooth", res, () => handleSearchBluetoothDevice(call));
      }
    })
  } else {
    wx.startBluetoothDevicesDiscovery({
      services: [BLUETOOTH_READ_SERVICE_ID],
      allowDuplicatesKey:false,
      success: (res) => {
        if (res.errMsg === 'startBluetoothDevicesDiscovery:ok') {
          call();
        } else {
          handleEventRestart("searchBluetooth", res, () => handleSearchBluetoothDevice(call, hasServiceId));
        }
      },
      fail: (res) => {
        handeStopBluetoothDevices();
        handleEventRestart("searchBluetooth", res, () => handleSearchBluetoothDevice(call, hasServiceId));
      }
    })

  }
}

/**
 * 获取mac地址
 * item : 当前实例
 * system : 系统 1.android 2.ios
 */
const handleDeviceMacAddress = (item) => {
  let mac = undefined;

  if (item.advertisData) {
    let bf = item.advertisData.slice(2, 8);
    mac = Array.prototype.map.call(new Uint8Array(bf), x => ('00' + x.toString(16)).slice(-2)).join(':');
  }
  return mac;
}


/**
 * 获取查询到的蓝牙设备
 * deviceInfo : {
 *   basis : 设备基础信息,
 *   system : 系统信息
 * }
 * call : 回调函数,每查询到一个合适的就调用
 * error : 错误回调
 */
const handleGetBluetoothDevices = (call, binded = undefined, error = undefined, lockNamePrefix = AVAILABLE_DEVICE_NAME) => {
  wx.getBluetoothDevices({
    success: (res) => {
      let { devices } = res;
      let hasDevice = false;
      if (devices) {
        devices.map(item => {
          let data = JSON.stringify(item);
          if (item && item.name && item.name.indexOf(lockNamePrefix) > -1) {
            let mac = handleDeviceMacAddress(item);
            if (mac) {
              handleAdvertise(item, binded, mac, call);
              hasDevice = true;
            }
          }
        });
      }
      if(hasDevice === false){
        wx.onBluetoothDeviceFound((result) => {
          let item = result.devices[0];
          let data = JSON.stringify(item);
          if (item && item.name && item.name.indexOf(lockNamePrefix) > -1) {
            let mac = handleDeviceMacAddress(item);
            if (mac) {
              handleAdvertise(item, binded, mac, call);
            }
          }
        });

      }
    },
    fail: () => {
      getErrorInfo(40001, error);
    }
  })
}

const handleAdvertise = (item, binded, mac, call) => {
  item.lockMac = mac;
  item.lockName = item.localName;
  let currentStatus = Array.prototype.map.call(
    new Uint8Array(item.advertisData), x => ('00' + x.toString(16)).slice(-2)
  );
  if (currentStatus.length === 9) {
    item.byteCount = 1500;
  } else if (currentStatus.length > 9) {
    if (currentStatus.slice(9, 10) == '01') {
      item.byteCount = 100;
    }
  }
  item.advertiseData = currentStatus.join('');
  item.binded = currentStatus.slice(8, 9) != '00';
  if (call) {
    if (binded === undefined) {
      call(item);
    } else {
      if (binded === item.binded) {
        call(item);
      }
    }
  }
}

/**
 * 连接蓝牙设备
 * deviceId : 设备ID
 * call : 回调方法
 */
const handleConnectionBluetooth = (deviceId, call) => {
  handeStopBluetoothDevices();
  wx.createBLEConnection({
    deviceId,
    success: (res) => {
      if (res.errMsg === 'createBLEConnection:ok') {
        wx.onBLEConnectionStateChange(function (res) {
          if (res.connected === false && currentConnectionBluetooth && res.deviceId === deviceId) {
            handleEventRestart("connectionBluetooth", res, () => handleConnectionBluetooth(deviceId, call));
          }
        });
        call();
      }
    },
    fail: (res) => {
      if (res.errCode === 10003 && res.errMsg === 'createBLEConnection:fail:connection fail status:133') {
        setTimeout(() => {
          handleEventRestart("connectionBluetooth", res, () => handleConnectionBluetooth(deviceId, call));
        }, 1000);
      } else {
        handleEventRestart("connectionBluetooth", res, () => handleConnectionBluetooth(deviceId, call));

      }
    }
  });

}

/**
 * 获取设备服务信息
 * basis : 设备基本信息                                   
 * call : 回调方法
 */
const handleGetDeviceServices = (basis, call) => {
  wx.getBLEDeviceServices({
    deviceId: basis.deviceId,
    success: (res) => {
      if (res.errMsg === 'getBLEDeviceServices:ok') {
        let services = res.services;
        let bool = false;
        services && services.map(item => {
          if (item.isPrimary) {
            if (item.uuid.indexOf(BLUETOOTH_READ_SERVICE_ID) !== -1) {
              basis.serviceId = item.uuid;
              call(basis);
              bool = true;
            }
          }
        })
        if (bool === false) {
          handleEventRestart("deviceServices", res, () => handleGetDeviceServices(basis, call));
        }
      } else {
        handleEventRestart("deviceServices", res, () => handleGetDeviceServices(basis, call));
      }
    },
    fail: (res) => {
      handleEventRestart("deviceServices", res, () => handleGetDeviceServices(basis, call));
    }
  })
}

/**
 * 获取设备特征值
 * basis : 设备信息
 * call : 回调方法
 */
const handleGetDeviceCharacteristics = (basis, call) => {
  wx.getBLEDeviceCharacteristics({
    deviceId: basis.deviceId,
    serviceId: basis.serviceId,
    success: (res) => {
      if (res.errMsg === 'getBLEDeviceCharacteristics:ok') {
        let characteristics = res.characteristics;
        characteristics && characteristics.map(item => {
          if (item.properties) {
            if (item.uuid.indexOf(BLUETOOTH_NOTIFY_SERVICE_ID) !== -1) {
              basis.notifyCharacteristicId = item.uuid;
            } else if (item.uuid.indexOf(BLUETOOTH_WRITE_SERVICE_ID) !== -1) {
              basis.writeCharacteristicId = item.uuid;
            }
          }
        })
        if (basis.notifyCharacteristicId && basis.writeCharacteristicId) {

          call(basis);
        }
      } else {
        handleEventRestart("deviceCharacteristics", res, () => handleGetDeviceCharacteristics(basis, call));
      }
    },
    fail: (res) => {
      handleEventRestart("deviceCharacteristics", res, () => handleGetDeviceCharacteristics(basis, call));
    }
  });
}

/**
 * 监听设备
 * basis : 设备基本信息
 * call: 回调函数
 */
const handleListenDevice = (basis, call) => {
  let deviceId = basis.deviceId;
  let serviceId = basis.serviceId;
  let characteristicId = basis.notifyCharacteristicId;

  wx.notifyBLECharacteristicValueChange({
    deviceId,
    serviceId,
    characteristicId,
    state: true,
    success: (res) => {

      if (res.errMsg === 'notifyBLECharacteristicValueChange:ok') {
        call();
      } else {
        handleEventRestart("listenDevice", res, () => handleListenDevice(basis, call));
      }
    },
    fail: (res) => {
      if (res.errCode === 10008) {
        settingOutTime(1, () => {
          call();
        });
      } else {
        handleEventRestart("listenDevice", res, () => handleListenDevice(basis, call));
      }

    }
  })
}



/**
 * 初始化设备信息
 * system : 系统平台
 * call : 回调函数
 * error : 错误回调
*/
const handleInitBluetooth = (call, binded = undefined, error = undefined, lockNamePrefix = AVAILABLE_DEVICE_NAME, hasServiceId = true) => {
  confirmOpenBluetoothAdapter(
    () => handleSearchBluetoothDevice(
      () => {
        handleGetBluetoothDevices((result) => {
          call(result);
        }, binded, error, lockNamePrefix)
      }, hasServiceId)
  );
}

/**
 * 查询设备
 * call:回调函数，如果未掉连接设备，那么将持续查询设备
*/
export const handleSearchLock = (call, binded = undefined, lockNamePrefix = AVAILABLE_DEVICE_NAME, error = undefined, hasServiceId = true) => {
  errorHandle = error;
  confirmIsAndroid();
  if (isAndroid === false) {
    handleInitBluetooth(call, binded, error, lockNamePrefix, hasServiceId)
  } else {
    wx.getLocation({
      success: (res) => {
        handleInitBluetooth(call, binded, error, lockNamePrefix, hasServiceId)
      },
      fail() {
        // message(androidPositionError);
        var params = {};
        params.succeed = false;
        params.reason = androidPositionError;
        handleRestartError();
        clearTimeout(globalData.currentTimer);
      }
    })
  }
}

/**
   * 连接设备
  */
export const handleBindLock = (currentLock, call) => {
  const lockAlias = currentLock.name;
  const deviceId = currentLock.deviceId;
  const byteCount = currentLock.byteCount;
  if (currentLock.binded === true) {
    // message(currentDeviceBind);
    var params = {};
    params.succeed = false;
    params.reason = currentDeviceBind;
    if (call) {
      call(params);
    }
    return;
  }
  loading(true, lockAddIng);
  let anyCode = handleRandomNumber();
  let { action, initialTimeString } = initLockAction(anyCode);
  let randomString = "";
  let binding = false;
  handleConnectionCurrentBluetooth(
    deviceId,
    (characteristic) => {
      if (action == characteristic) {
        handleWriteAction(randomPasswrodAction());
      } else {
        if (randomString.length < byteCount * 2) {
          randomString += characteristic;
        }
        if (randomString.length >= byteCount * 2 && !binding) {
          binding = true;
          let randomArray = [];
          for (let i = 0; i < byteCount; i++) {
            let temp = randomString.substr(i * 2, 2);
            randomArray.push(`0x${temp}`);
          }
          currentLock.randomString = randomArray.join(",");
          currentLock.anyCode = anyCode;
          currentLock.initialTimeString = initialTimeString;
          if (call) {
            call(currentLock);
          }
        }
      }
    },
    () => {
      handleWriteAction(action);
      settingOutTime(CONNECT_OUT_TIME, () => {
        // message("绑定超时,请稍后重试");
        var params = {};
        params.succeed = false;
        params.reason = "绑定超时,请稍后重试";
        handleRestartError();
        if (call) {
          call(params);
        }
        handleCloseBLEConnection(deviceId);
      })
    },
    () => {

    });
}
export const handleInformLock = (item, call = undefined) => {
  loading(false);
  var params = {};
  handleWriteAction(randomPasswrodSuccessAction(), () => {
    handleCloseBLEConnection(item.deviceId);
    info(bindLockSuccess);
    params.succeed = true;
    if (call) {
      call(params);
    }
    clearOutTime();
    wx.setStorageSync(item.lockMac + '-deviceId', item.deviceId);
  });
}
/**
 * 停止查询设备
*/
const handeStopBluetoothDevices = () => {
  wx.getBluetoothAdapterState({
    success: function (res) {
      if (res.discovering) {
        wx.stopBluetoothDevicesDiscovery();
      }
    },
  })
}

/**
 * 清理查询到的设备
*/
export const handeClearBluetoothDevices = () => {
  wx.getBluetoothAdapterState({
    success: function (res) {
      if (res.discovering) {
        wx.stopBluetoothDevicesDiscovery({
          success: function (res) { },
        })
      }
      if (res.available) {
        wx.closeBluetoothAdapter();
      }
    },
  })
}


/**
 * 连接当前设备
 * deviceId : 设备ID
 * call: 回调方法,给予 android 部分监听后马上写入指令报错，所以添加延时任务
 * notify : 监听函数
 * error: 错误回调
*/
const handleConnectionCurrentBluetooth = (
  deviceId,
  notify,
  call = undefined,
  error = undefined
) => {
  errorHandle = error;
  handleConnectionBluetooth(deviceId,
    () => handleGetDeviceServices({ deviceId }, (basis) => {
      basis = { ...basis };
      handleGetDeviceCharacteristics(basis, (currentBasis) => {
        currentBasis = { ...currentBasis }
        currentConnectionBluetooth = JSON.stringify(currentBasis);
        handleListenDevice(currentBasis, () => {
          wx.onBLECharacteristicValueChange((characteristic) => {
            let hexData = ab2hex(characteristic.value);

            notify(hexData);
          });
          if (call) {
            if (isAndroid === true) {

              let timer = setTimeout(() => {
                call(currentBasis);
                clearTimeout(timer);
              }, 500);
            } else {
              call(currentBasis);
            }
          }
        })
      })
    })
  );
}

/**
 * 写入指令
 * value : 二进制数组
 * call : 回调方法
 */
const handleWriteAction = (value, call = undefined, error = undefined) => {
  errorHandle = error;

  if (!currentConnectionBluetooth) {
    // message('连接已断开，请稍后重试！');
    var params = {};
    params.succeed = false;
    params.reason = "连接已断开，请稍后重试！";
    handleRestartError();
    if (call) {
      call(params);
    }
    return;
  }
  let basis = JSON.parse(currentConnectionBluetooth);
  if (basis) {
    let binaryValue = blueToothWriteValue(value);
    let deviceId = basis.deviceId;
    let serviceId = basis.serviceId;
    let characteristicId = basis.writeCharacteristicId;
    wx.writeBLECharacteristicValue({
      deviceId,
      serviceId,
      characteristicId,
      value: binaryValue,
      success: (res) => {
        if (res.errMsg === 'writeBLECharacteristicValue:ok') {
          if (call) call();
        } else {
          handleEventRestart("writeAction", res, () => handleWriteAction(value, call));
        }
      },
      fail: (res) => {
        if (res.errCode !== 10006) {
          handleEventRestart("writeAction", res, () => handleWriteAction(value, call));
        }
      }
    });
  }
}

/**
 * 关闭蓝牙连接
 * 延迟两秒时间关闭
 * deviceId : 设备ID
 */
const handleCloseBLEConnection = (deviceId, call = undefined) => {

  currentConnectionBluetooth = undefined;
  if (deviceId) {
    wx.closeBLEConnection({ deviceId });
  }
  if (call) call();
}