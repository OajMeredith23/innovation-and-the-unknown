// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var axios = require('axios');
var data = '';


export default async (req, res) => {
    // const model = fs.readFileSync('model.json');
    var config = {
        method: 'get',
        url: 'https://storage.googleapis.com/innovationandtheunknown/my-model.json',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    // const result = await axios(config)
    // console.log({ result })



    res.status(200).json({ result: 'hi ' })
}
