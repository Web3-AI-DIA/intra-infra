import Handlebars from 'handlebars';
import fs from 'fs-extra';
import path from 'path';

export async function compileTemplate(templateName: string, context: any): Promise<string> {
  // Try to find the template relative to the current working directory or the dist folder
  const possiblePaths = [
    path.join(__dirname, '../../templates', templateName),
    path.join(__dirname, '../templates', templateName),
    path.join(process.cwd(), 'templates', templateName)
  ];

  let templatePath = '';
  for (const p of possiblePaths) {
    if (await fs.pathExists(p)) {
      templatePath = p;
      break;
    }
  }

  if (!templatePath) {
    throw new Error(`Template not found: ${templateName}. Looked in: ${possiblePaths.join(', ')}`);
  }

  const templateContent = await fs.readFile(templatePath, 'utf8');
  const template = Handlebars.compile(templateContent);
  return template(context);
}
