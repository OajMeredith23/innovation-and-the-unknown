var myHeaders = new Headers();
console.log({ myHeaders })
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({ "name": "Tom" });

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    // body: raw,
    redirect: 'follow'
};

fetch("https://dazzling-mahavira-33ecc2.netlify.app/.netlify/functions/getusers", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));