import Case from "case";
export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  // create your generators here
  plop.setGenerator("Do_Some_Coding", {
    description: "Plop Crash Course",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Name Your Resource - ",
      },
    ], // array of inquirer prompts
    actions: [
      {
        type: "add",
        path: "src/model/{{pascalCase name}}.ts",
        templateFile: "src/templates/model.template.hbs",
        skipIfExists: true,
      },
      {
        type: "add",
        path: "src/controllers/{{camelCase name}}Controller.ts",
        templateFile: "src/templates/controller.template.hbs",
        skipIfExists: true,
      },
      {
        type: "add",
        path: "src/validation/{{camelCase name}}Validation/{{camelCase name}}Validation.ts",
        templateFile: "src/templates/validation.template.hbs",
        skipIfExists: true,
      },
      {
        type: "add",
        path: "src/validation/{{camelCase name}}Validation/{{camelCase name}}Schema.ts",
        templateFile: "src/templates/validationSchema.template.hbs",
        skipIfExists: true,
      },
      {
        type: "add",
        path: "src/routes/{{camelCase name}}Routes.ts",
        templateFile: "src/templates/route.template.hbs",
        skipIfExists: true,
      },
      {
        type: "append",
        path: "src/app.ts",

        pattern: "Routes_Path_Generator",
        templateFile: "src/templates/appRoutesImport.hbs",
      },
      {
        type: "append",
        pattern: "Routes_Generator",
        path: "src/app.ts",
        templateFile: "src/templates/appRouteUse.hbs",
      },
    ], // array of actions
  });

  plop.setHelper("pascalCase", (str) => Case.pascal(str));
  plop.setHelper("camelCase", (str) => Case.camel(str));
}
