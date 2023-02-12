const blogFormHandler = async (event) => {
    event.preventDefault();
    console.log('before the if statements')
    const topic = document.querySelector('#moonTopic').value.trim();
    const content = document.querySelector('#moonContent').value.trim();
    if (topic && content) {
        const response = await fetch('/api/planets', {
            method: 'POST',
            body: JSON.stringify({ topic, content }),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log('this is the blogForm handler')
        if (response.ok) {
            document.location.replace('/mothership');
        } else {
            alert(response.statusText);
        }
    }
};
console.log('this is the blogFormHandler')
document.querySelector('.blogForm').addEventListener('submit', blogFormHandler);