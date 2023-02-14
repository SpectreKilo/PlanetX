let postBtn = async (event) => {
    event.preventDefault();
    console.log('post has been clicked')
let postId = event.target.value;
console.log(postId)

const response = await fetch(`/planets/${postId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json'}
});
if (response.ok) {
    document.location.replace(`/planets/${postId}`);
} else {
    alert(response.status)
};
};

let buttonsArray = document.querySelectorAll(`#${postId}`);
console.log(buttonsArray)
for(let i = 0; i < buttonsArray.length; i++){
    buttonsArray[i].addEventListener('click', postBtn);
}