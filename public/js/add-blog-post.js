const blogFormHandler = async (event) => {
    event.preventDefault();
    console.log('before the if statements')
    const topic = document.querySelector('#topicPost').value.trim();
    const content = document.querySelector('#contentPost').value.trim();
    sub_genre_id = document.querySelector('#subGenre').value;
    console.log(sub_genre_id)
    if (topic && content&&sub_genre_id) {
        const response = await fetch('/api/planets', {
            method: 'POST',
            body: JSON.stringify({ topic, content, sub_genre_id, }),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(response)
        if (response.ok) {
            document.location.replace('/mothership');
        } else {
            console.log('its is messed up')
            alert(response.statusText);
        }
    }
};
console.log('this is the blogFormHandler')
document.querySelector('.blogForm').addEventListener('submit', blogFormHandler);