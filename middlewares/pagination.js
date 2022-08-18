const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

async function paginate(model, page, limit, filterCriteria) {
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
        let sort = { refreshedAt: -1 };
        let filteringObjectToPassToFind = {};

        if (filterCriteria != null) {
            if (
                filterCriteria.maxPrice != 0.0 &&
                filterCriteria.maxPrice != null
            ) {
                filteringObjectToPassToFind["price"] = {
                    $lt: filterCriteria.maxPrice,
                };
            }

            if (
                filterCriteria.minPrice != null
                && filterCriteria.minPrice > 0
            ) {
                filteringObjectToPassToFind["price"]["$gt"] =
                    filterCriteria.minPrice;
            }

            if (
                filterCriteria.mainCategory != null &&
                filterCriteria.mainCategory.length > 0
            ) {
                filteringObjectToPassToFind["mainCategory"] =
                    new ObjectId(filterCriteria.mainCategory);
            }

            if (
                filterCriteria.subCategory != null &&
                filterCriteria.subCategory.length > 0
            ) {
                filteringObjectToPassToFind["subCategory"] =
                    filterCriteria.subCategory
            }

            if (
                filterCriteria.brand != null &&
                filterCriteria.brand.length > 0
            ) {
                filteringObjectToPassToFind["brand"] =
                    filterCriteria.brand
            }

            if (
                filterCriteria.city != null &&
                filterCriteria.city.length > 0
            ) {
                filteringObjectToPassToFind["city"] =
                    filterCriteria.city
            }

            if (filterCriteria.sortByPriceAscending != null) {
                sort = {
                    price: filterCriteria.sortByPriceAscending ? 1 : -1
                }
            }

            if (filterCriteria.sortByCreatedByAscending != null) {
                sort = {
                    refreshedAt: filterCriteria.sortByCreatedByAscending ? 1 : -1
                }
            }
        }

        let contentFromDb = await model.aggregate([
            {
                '$match': {
                    ...filteringObjectToPassToFind,
                },
            },
            { '$skip': startIndex, },
            { '$limit': limit },
            { '$sort': sort }
        ]);

        result.results = contentFromDb;
        return result;

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = paginate;