const { Op } = require('sequelize');
const db = require('./../models');
const Utils = require('./../helper/Utils');
const elasticsearch = require('./../models/elasticsearch');

const Model = db.Product;

const createOne = async(req, res) => {
    try {
        const { name, barcode } = req.body;

        const data = { name, barcode };
        const model = await Model.create(data);

        if (model) return res.status(200).json('Success');
        return res.status(400).json('Something went wrong');

    } catch(error) { return res.status(500).json(Utils.getErrorMessage(error)) }
}

const updateOne = async(req, res) => {
    try {
        const id = req.params.id;
        const { name, barcode } = req.body;

        const data = { name, barcode };
        const model = await Model.update(data, { where: {id} });

        try {
            await elasticsearch.update({
                index: 'products', id,
                body: { doc: { name, barcode } },
            });
        } catch (error) { console.error(`Error updating product ${id} in Elasticsearch:`, error) }

        if (model) return res.status(200).json('Success');
        return res.status(400).json('Something went wrong');

    } catch(error) { return res.status(500).json(Utils.getErrorMessage(error)) }
}

const deleteOne = async(req, res) => {
    try {
        const id = req.params.id;

        await Model.destroy({ where: {id} });

        try {
            await elasticsearch.delete({
                index: 'products', id,
            });
        } catch (error) { console.error(`Error deleting product:${id} Elasticsearch:`, error) }

        return res.status(200).json('Success');

    } catch(error) { return res.status(500).json(Utils.getErrorMessage(error)) }
}

const getList = async(req, res) => {
    try {
        let query = req.query;
        query.filter = await getFilter(query.filter);

        const count = await Model.count({ where: query.filter });

        if (!Utils.isEmptyObject(req.query)) {
            const skip = Utils.getSkip(query.page, query.limit);
            query.offset = Utils.getOffset(skip, count);
        }

        const models = await Model.findAll({
            where: query.filter,
            offset: query.offset,
            order: query.order,
            limit: query.limit
        });

        if (models) return res.status(200).json({ data: models, count });
    } catch (error) {
        return res.status(500).json(Utils.getErrorMessage(error));
    }
}

const getFilter = async(params) => {
    const filter = {};
    if (!params) return filter;

    // Check if search query is provided
    if (params.name) {
        try {
            const queryBody = {
                index: 'products',
                body: {
                    query: {
                        bool: {
                            should: [
                                {
                                    fuzzy: {
                                        name: {
                                            value: params.name.toLowerCase(),
                                            fuzziness: "AUTO",
                                            prefix_length: 1
                                        }
                                    }
                                },
                                {
                                    wildcard: {
                                        name: `*${params.name.toLowerCase()}*`
                                    }
                                }
                            ]
                        }
                    }
                }
            };

            const { hits } = await elasticsearch.search(queryBody);

            const matchedIds = hits.hits.map(hit => hit._id);
            filter.id = {[Op.in]: matchedIds};
        } catch (error) {
            console.error("Elasticsearch search error:", error);
            throw error;
        }
    }

    return filter;
}

module.exports = { createOne, updateOne, deleteOne, getList }