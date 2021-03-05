const path = require("path");
const { verifyProjectName } = require("../utils/tools");
const { askName, askLanguage } = require("../inquirer")

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
  console.log(projectName, projectLang);
}

module.exports = init;