const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const chalk = require("chalk");
const { promisify } = require('util')
const downloadGit = promisify(require('download-git-repo'))

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
/**
 * log
 * @param {*} content 
 */
const log = content => console.log(chalk.green(content));
/**
 * error
 * @param {*} content 
 */
const error = content => console.log(chalk.red(content));
const download = async (repo, desc) => {
  const ora = require("ora");
	const process = ora(`下载... ${repo} ${desc}`);
	process.start();
	// token 9年后过期
	let downloadOptions = {
		extract: true,
		strip: 1,
		mode: "666",
		headers: {
			accept: "application/zip"
		}
	};
	try {
		await downloadUrl(repo, desc, downloadOptions);
		process.succeed("下载成功");
	} catch (e) {
		console.log(e);
		process.fail("下载失败");
		throw { msg: "下载失败" };
	}
  // https://github.com/zmlc-f/ff-cli-template/archive/r-ts-h5.zip
}

module.exports = {
  checkFile,
  verifyProjectName,
  log,
  error
}