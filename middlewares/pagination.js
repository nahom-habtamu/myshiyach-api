async function paginate(model, page, limit) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {};
    const documentsCount = await model.countDocuments().exec();
    if (endIndex < documentsCount) {
        result.next = {
            page: page + 1,
            limit: limit,
        };
    }
    if (startIndex > 0) {
        result.previous = {
            page: page - 1,
            limit: limit,
        };
    }
    try {
        var contentFromDb = await model.find().limit(limit).skip(startIndex);
        contentFromDb.sort((a, b) => {
            let da = new Date(a.refreshedAt),
                db = new Date(b.refreshedAt);
            return db - da;
        });
        result.results = contentFromDb;
        return result;
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}
module.exports = paginate;