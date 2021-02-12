const submitReview = (e) => {
    e.preventDefault();
    const review = document.getElementById('review').value;
    const sentiment = document.getElementById('sentiment');
    const options = {
        method: 'POST',
        body: JSON.stringify({ review }),
        headers: new Headers({ 'Content-Type': 'application/json' })
    }

    const emojiSection = document.getElementById('emojiSection');
    const title = document.getElementById('title');
    const outline = document.querySelector(':focus');

    fetch('/api/nlp/sentiment', options)
        .then(res => res.json())
        .then(({ analysis }) => {
            console.log({ analysis })
            sentiment.innerText = "Sentiment Value: " + analysis
            if (analysis < 0) {
                emojiSection.innerHTML = '<img src="https://i.pinimg.com/originals/32/3e/3b/323e3b47f07fa1fb0a4b2ecb03b2c965.png">';
                title.style.color = 'red';
                outline.style.borderColor = 'red';
            };
            if (analysis === 0) {
                emojiSection.innerHTML = '<img src="https://img.icons8.com/officel/80/000000/neutral-emoticon.png">';
                title.style.color = '#00367c';
                outline.style.borderColor = '#00367c';
            }
            if (analysis > 0) {
                emojiSection.innerHTML = '<img src="https://img.icons8.com/color/96/000000/happy.png">';
                title.style.color = 'green';
                outline.style.borderColor = 'green'
            }
        })
        .catch(err => {
            emojiSection.innerHTML = 'There was an error processing your request!'
        })
}

document.getElementById('review').addEventListener('keyup', submitReview);
document.getElementById('reviewForm').addEventListener('submit', submitReview);