const path = require("path");
const fs = require("fs");
const { promisify } = require("util");

/**
 * 判断文件夹是存在
 * @param {*} src 
 */
const checkFile = async (src) => {
	try {
		const stats = await promisify(fs.stat)(src);
		if (stats.isDirectory()) { //文件夹存在
			return true;
		}
		return false;
	} catch (e) {
		return false;
	}
};
/**
 * 判断项目名是否符合规范以及文件夹是否存在
 * @param {*} name 
 */
const verifyProjectName = async (name) => {
  const reg = /^[0-9a-zA-Z-]{1,}$/;
  if (!reg.test(name)) {
    return "项目名不符合规范,请使用数组、字母或者中划线";
  }
  const noEmpty = await checkFile(path.resolve() + `/${name}`);
  if (noEmpty) {
    return "文件已经存在";
  }
  return false;
}

module.exports = {
  checkFile,
  verifyProjectName
}