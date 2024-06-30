const { Client } = require('@elastic/elasticsearch');

const client = new Client({
    node: 'http://localhost:9200',
    auth: {
        username: 'elastic',
        password: 'alemtilsimat'
    },
    requestTimeout: 60000, // Increased to 60 seconds
});

module.exports = client;