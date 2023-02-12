

const subBtn = async (event) => {
    event.preventDefault();
    console.log('Ive been clicked')
// let stuff = document.querySelector('#Btn').className
//     console.log(stuff)
console.log(event.target.value);
}
const buttonsArray = document.querySelectorAll('#Btn');
for(let btn in buttonsArray){
    addEventListener('click', subBtn);
}

