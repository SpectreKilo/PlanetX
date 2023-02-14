let postBtn = async (event) => {
    event.preventDefault();
let postId = event.target.value;

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

let postArray = document.querySelectorAll('#post');
for(let i = 0; i < postArray.length; i++){
    postArray[i].addEventListener('click', postBtn);
}