import Case from "case";

export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  // create your generators here
  plop.setGenerator("Resource", {
    description: "this is a skeleton plopfile",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Name your resource",
      },
    ], // array of inquirer prompts
    actions: [
      {
        type: "add",
        path: "src/model/{{pascalCase name}}.ts",
        templateFile: "templates/model.hbs",
      },
      {
        type: "add",
        path: "src/controllers/{{camelCase name}}Controller.ts",
        templateFile: "templates/controller.hbs",
      },
    ], // array of actions
  });

  plop.setHelper("pascalCase", (str) => Case.pascal(str));
  plop.setHelper("snakeCase", (str) => Case.snake(str));
  plop.setHelper("camelCase", (str) => Case.camel(str));
}
