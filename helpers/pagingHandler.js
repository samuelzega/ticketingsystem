module.exports = function (query) {
    return {
        page: query.page ? +query.page : 1,
        limit: query.limit ? +query.limit : 20,
    }
}
