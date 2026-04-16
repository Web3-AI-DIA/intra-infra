"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractFvmEvents = extractFvmEvents;
function extractFvmEvents(abi) {
    return abi.filter((item) => item.type === 'event');
}
