const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second]
    .map(formatNumber)
    .join(':')}`;
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : `0${n}`;
};

/**
 * @description: 族谱数据格式化
 * @param {array} list 人员列表
 * @param {number} level 代数
 * @param {object} parent 父亲
 * @param {function} cb 回调函数, 返回一个对象来接收其他属性
 * @return {array} 返回一个新的数组
 */
const formatTreeData = (list, level = 1, parent = null, cb) => {
  if (!list || !list.length) return [];

  const data = list.map(item => {
    const { info, name } = item;
    info.trim();
    let userInfo = {
      name: '申' + item.name,
      sex: 1, // 1男 2女
      birthday: null, // 生日
      level, // 代数
      parent, // 父亲
      children: formatTreeData(item.children, level + 1, item, cb),
    };
    let numReg = /\d+/g;
    const birthdayList = info.match(numReg);

    // 性别
    if (info.split(name)[0].includes('女')) {
      userInfo.sex = 2;
    }
    // 生日
    if (birthdayList && birthdayList.length) {
      userInfo.birthday = birthdayList[0];
    }

    return {
      ...item,
      ...userInfo,
      ...cb({
        ...item,
        ...userInfo,
      }),
    };
  });

  return data;
};

module.exports = {
  formatTime,
  formatTreeData,
};
