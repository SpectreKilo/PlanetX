//Coudinary widget
    var myWidget = cloudinary.createUploadWidget({
        cloudName: 'dx5bns6xa',
        uploadPreset: 'uw_test'
    }, (error, result) => {
        if (!error && result && result.event === "success") {
            console.log('Done! Here is the image info: ', result.info);
           var description = `https://res.cloudinary.com/dx5bns6xa/image/upload/v1676240737/${result.info.public_id}`
          console.log(description)

          if (description) {

            const response =  fetch('/api/photos', {
                method: 'POST',
                body: JSON.stringify({ description }),
                headers: { 'Content-Type': 'application/json', },
            });
    
            if (response.ok) {
                document.location.replace('/photos');

            } else {
                // alert('response.statusText'); for some reason the error was about length not match
                function interval(){
                document.location.replace('/photos');
                } 
                setInterval(interval, 500);
            }
        }
        }   
        
    }
    )

    console.log(myWidget);


    document.getElementById("upload_widget").addEventListener("click", function () {
        myWidget.open();
    }, false);

