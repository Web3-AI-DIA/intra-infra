"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureDir = ensureDir;
exports.writeJson = writeJson;
exports.writeFile = writeFile;
exports.readJson = readJson;
const fs_extra_1 = __importDefault(require("fs-extra"));
async function ensureDir(dirPath) {
    await fs_extra_1.default.ensureDir(dirPath);
}
async function writeJson(filePath, data) {
    await fs_extra_1.default.writeJson(filePath, data, { spaces: 2 });
}
async function writeFile(filePath, content) {
    await fs_extra_1.default.writeFile(filePath, content, 'utf8');
}
async function readJson(filePath) {
    return await fs_extra_1.default.readJson(filePath);
}
