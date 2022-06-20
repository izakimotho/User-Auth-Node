
export const generatePagination = (offset: number, limit: number, totalCount: number, resource_url: string) => {
    if (( totalCount - limit ) > 0) {
        return {
            pages: {
                next: `${resource_url}?offset=${offset + limit}&limit=${limit}`,
                last: `${resource_url}?offset=${totalCount - limit}`
            }
        }
    }

    return {};
};