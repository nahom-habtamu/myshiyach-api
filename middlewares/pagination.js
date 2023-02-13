const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

async function paginate(model, page, limit, filterCriteria) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {};
    if (startIndex > 0) {
        result.previous = {
            page: page - 1,
            limit: limit,
        };
    }

    try {
        let sort = { refreshedAt: -1 };
        let filteringObjectToPassToFind = null;


        if (filterCriteria != null) {
            filteringObjectToPassToFind = {};
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
                filterCriteria.createdBy != null &&
                filterCriteria.createdBy.length > 0
            ) {
                filteringObjectToPassToFind["createdBy"] =
                    filterCriteria.createdBy
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

            sort = {
                refreshedAt: filterCriteria.sortByCreatedByAscending ? -1 : 1
            }
        }

        let contentFromDb = await getFilteredAndPaginatedItems(
            model, filteringObjectToPassToFind,
            startIndex, limit, sort
        );

        const documents = await getFilteredAndPaginatedItemsWithOutLimit(
            model,
            filteringObjectToPassToFind,
            startIndex,
            sort
        );

        if (filterCriteria?.brand != null &&
            filterCriteria.brand.length > 0) {
            contentFromDb = contentFromDb.filter(d => d?.productDetail?.brand?.value === filterCriteria.brand)
        }

        if (filterCriteria?.keyword != null && filterCriteria.keyword.length > 0) {
            contentFromDb = contentFromDb.filter(d =>
                d.title.toLowerCase().includes(filterCriteria.keyword.toLowerCase()) ||
                d.description.toLowerCase().includes(filterCriteria.keyword.toLowerCase())
            );
        }

        if (endIndex < documents.length + startIndex) {
            result.next = {
                page: page + 1,
                limit: limit,
            };
        }
        result.results = contentFromDb;
        return result;

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

async function getFilteredAndPaginatedItemsWithOutLimit(
    model, filteringObjectToPassToFind, startIndex, sort
) {
    if (!filteringObjectToPassToFind) {
        return await model.find().sort(sort).skip(startIndex);
    }

    return await model.aggregate([
        {
            '$match': {
                ...filteringObjectToPassToFind,
            },
        },
        { '$sort': sort },
        { '$skip': startIndex, },
    ]);
}


async function getFilteredAndPaginatedItems(
    model, filteringObjectToPassToFind, startIndex, limit, sort
) {
    if (!filteringObjectToPassToFind) {
        return await model.find().sort(sort).limit(limit).skip(startIndex);
    }

    return await model.aggregate([
        { '$sort': sort },
        {
            '$match': {
                ...filteringObjectToPassToFind,
            },
        },
        { '$skip': startIndex, },
        { '$limit': limit },
    ]);
}

module.exports = paginate;