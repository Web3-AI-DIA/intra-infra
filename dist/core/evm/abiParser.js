"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractEvents = extractEvents;
function extractEvents(abi) {
    return abi.filter((item) => item.type === 'event');
}
