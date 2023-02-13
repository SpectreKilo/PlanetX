const photoFormHandler = async (event) => {
    event.preventDefault();
    console.log('photo before the if statements')

  const description = `https://res.cloudinary.com/dx5bns6xa/image/upload/v1676240737/foidz7ezcocerqpiju62.jpg`
// const userPhoto ="hello"/

  console.log(description);

    if (description) {

        const response = await fetch('/api/photos', {
            method: 'POST',
            body: JSON.stringify({ description }),
            headers: { 'Content-Type': 'application/json', },
        });

        if (response.ok) {
            document.location.replace('/');
            console.log('ok')
        } else {
            alert('response.statusText');
        }
    }
};

    var myWidget = cloudinary.createUploadWidget({
        cloudName: 'dx5bns6xa',
        uploadPreset: 'uw_test'
    }, (error, result) => {
        if (!error && result && result.event === "success") {
            console.log('Done! Here is the image info: ', result.info);
           var urlId = result.info.public_id
          console.log(urlId)
        }
        
    }
    )
    console.log(myWidget);


    document.getElementById("upload_widget").addEventListener("click", function () {
        myWidget.open();
    }, false);

//console.log('this is the photoFormHandler')
// document.querySelector('#photoUrl').addEventListener('click', photoFormHandler); 
//will be activated later on