const path = require("path");
const clear = require("clear");
const { verifyProjectName, log, error, download } = require("../utils/tools");
const { askName, askLanguage } = require("../inquirer");

const create = async(name, branch) => {
  clear();
  log(`🚀创建项目: ${name}`);

  const goalSrc = path.resolve(`./${name}`);  //目标地址
  try {
    await download(`https://github.com/zmlc-f/ff-cli-template/archive/${branch}.zip`, name)
		log("项目创建完成");
  } catch (e) {
    error(e.msg || e);
  }

}

const init = async (name, language) => {
  let projectName = name, projectLang = language;
  const err = await verifyProjectName(name);
  if(err){
    console.error(err);
    const { PROJECT_NAME } = await askName();
    projectName = PROJECT_NAME;
  }
  if(!language || ["js", "ts"].indexOf(language) < 0){
    const { LANGUAGE } = await askLanguage();
    projectLang = LANGUAGE;
  }
  create(projectName, `r-${projectLang}-h5`);
  console.log(projectName, projectLang);
}

module.exports = init;