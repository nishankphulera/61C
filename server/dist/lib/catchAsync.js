"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = catchAsync;
/** Forwards rejected Promises to Express so `next(err)` hits JSON error middleware. */
function catchAsync(handler) {
    return (req, res, next) => {
        Promise.resolve(handler(req, res)).catch(next);
    };
}
