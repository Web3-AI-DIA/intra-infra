"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCommaSeparated = parseCommaSeparated;
function parseCommaSeparated(value) {
    if (!value)
        return [];
    return value.split(',').map((s) => s.trim()).filter(Boolean);
}
