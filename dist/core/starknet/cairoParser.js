"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractCairoEvents = extractCairoEvents;
exports.extractCairoFunctions = extractCairoFunctions;
function extractCairoEvents(abi) {
    return abi.filter((item) => item.type === 'event');
}
function extractCairoFunctions(abi) {
    return abi.filter((item) => item.type === 'function');
}
