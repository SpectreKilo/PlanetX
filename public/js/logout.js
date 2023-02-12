const logout = async (event) => {
event.preventDefault();
console.log('hits the logout function <=========>')

    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    document.location.replace('/');
    console.log('logout.js fetch is here')

};
console.log('hits the js file <===>')
document.querySelector('#logout').addEventListener('click', logout);