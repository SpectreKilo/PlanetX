

let subBtn = async (event) => {
    event.preventDefault();
    console.log('Ive been clicked')
let subId = event.target.value;
console.log(subId)

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
console.log(buttonsArray)
for(let i = 0; i < buttonsArray.length; i++){
    buttonsArray[i].addEventListener('click', subBtn);
}


