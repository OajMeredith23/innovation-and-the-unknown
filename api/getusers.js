exports.handler = function (event, context, callback) {

    // const { name } = JSON.parse(event.body);
    event
    callback(null, {
        statusCode: 200,
        body: JSON.stringify({ message: `Hello there` })
    });
}