

let subBtn = async (event) => {
    event.preventDefault();
let subId = event.target.value;

const response = await fetch(`/moon/${subId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json'}
});
if (response.ok) {
    document.location.replace(`/moon/${subId}`);
} else {
    alert(response.status)
};
};

let buttonsArray = document.querySelectorAll('#Btn');
for(let i = 0; i < buttonsArray.length; i++){
    buttonsArray[i].addEventListener('click', subBtn);
}

