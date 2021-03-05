var inquirer = require('inquirer');
const { verifyProjectName } = require("../utils/tools");

const askName = () => {
  const questions = [
    {
      name: "PROJECT_NAME",
			type: "input",
			message: "请输入项目名称?",
			validate: async (input) => {
        const err = await verifyProjectName(input);
				return err || true;
			}
    }
  ]
  return inquirer.prompt(questions);
}

const askLanguage = () => {
  const questions = [
    {
      name: "LANGUAGE",
			type: "list",
			message: "请选择开发语言?",
      choices: [
        "ts",
        "js"
      ],
      default: "ts",
      // when: function(answers) {
      //   return answers.SCENES == 'h5'
      // },
			validate: async (input) => {
        const err = await verifyProjectName(input);
				return err;
			}
    }
  ]
  return inquirer.prompt(questions);
}

module.exports = {
  askName,
  askLanguage
}