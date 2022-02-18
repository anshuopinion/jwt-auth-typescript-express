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
        skipIfExists: true,
      },
      {
        type: "add",
        path: "src/controllers/{{camelCase name}}Controller.ts",
        templateFile: "templates/controller.hbs",
        skipIfExists: true,
      },
      {
        type: "add",
        path: "src/validation/{{camelCase name}}Validation/{{camelCase name}}Validation.ts",
        templateFile: "templates/validation.hbs",
        skipIfExists: true,
      },
      {
        type: "add",
        path: "src/validation/{{camelCase name}}Validation/{{camelCase name}}Schema.ts",
        templateFile: "templates/validationSchema.hbs",
        skipIfExists: true,
      },
      {
        type: "add",
        path: "src/routes/{{camelCase name}}Routes.ts",
        templateFile: "templates/route.hbs",
        skipIfExists: true,
      },
    ], // array of actions
  });

  plop.setHelper("pascalCase", (str) => Case.pascal(str));
  plop.setHelper("snakeCase", (str) => Case.snake(str));
  plop.setHelper("camelCase", (str) => Case.camel(str));
}
