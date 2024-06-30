const { DataTypes } = require('sequelize');
const elasticsearch = require('./elasticsearch');

module.exports = (sequelize) => {
    const Schema = sequelize.define('product', {
        id: { type: DataTypes.STRING, primaryKey: true, allowNull: false, unique: true, defaultValue: DataTypes.UUIDV4},
        name: { type: DataTypes.STRING, allowNull: false, unique: true },
        barcode: { type: DataTypes.STRING, allowNull: false, unique: true }
    }, {
        charset: 'UTF-8', timestamps: true, version: true
    });

    // Hook to index data into Elasticsearch
    // After create hook
    Schema.afterCreate(async (product, options) => {
        try {
            await elasticsearch.index({
                index: 'products',
                id: product.id,
                body: {
                    name: product.name,
                    barcode: product.barcode,
                },
            });
        } catch (error) { console.error(`Error indexing product ${product.id}:`, error) }
    });

    return Schema;
}