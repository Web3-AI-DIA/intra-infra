"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileTemplate = compileTemplate;
const handlebars_1 = __importDefault(require("handlebars"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
async function compileTemplate(templateName, context) {
    // Try to find the template relative to the current working directory or the dist folder
    const possiblePaths = [
        path_1.default.join(__dirname, '../../templates', templateName),
        path_1.default.join(__dirname, '../templates', templateName),
        path_1.default.join(process.cwd(), 'templates', templateName)
    ];
    let templatePath = '';
    for (const p of possiblePaths) {
        if (await fs_extra_1.default.pathExists(p)) {
            templatePath = p;
            break;
        }
    }
    if (!templatePath) {
        throw new Error(`Template not found: ${templateName}. Looked in: ${possiblePaths.join(', ')}`);
    }
    const templateContent = await fs_extra_1.default.readFile(templatePath, 'utf8');
    const template = handlebars_1.default.compile(templateContent);
    return template(context);
}
