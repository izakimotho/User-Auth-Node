"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error_404 = (req, res, next) => {
    return res.status(404).send({ errors: [{ message: `${req.url} Not found.`, code: 404 }] });
};
exports.error_500 = (err, req, res, next) => {
    return res.status(500).send({ errors: [{ message: err, code: 500 }] });
};
//# sourceMappingURL=404.js.map