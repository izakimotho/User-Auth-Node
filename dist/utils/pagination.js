"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePagination = (offset, limit, totalCount, resource_url) => {
    if ((totalCount - limit) > 0) {
        return {
            pages: {
                next: `${resource_url}?offset=${offset + limit}&limit=${limit}`,
                last: `${resource_url}?offset=${totalCount - limit}`
            }
        };
    }
    return {};
};
//# sourceMappingURL=pagination.js.map