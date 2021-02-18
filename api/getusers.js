exports.handler = function (event, context, callback) {

    const { text } = JSON.parse(event.body);

    callback(null, {
        statusCode: 200,
        body: JSON.stringify({ message: `Hello, ${text}` })
    });
}