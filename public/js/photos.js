//Coudinary widget
    var myWidget = cloudinary.createUploadWidget({
        cloudName: 'dx5bns6xa',
        uploadPreset: 'uw_test'
    }, (error, result) => {
        if (!error && result && result.event === "success") {
           var description = `https://res.cloudinary.com/dx5bns6xa/image/upload/v1676240737/${result.info.public_id}`

          if (description) {

            const response =  fetch('/api/photos', {
                method: 'POST',
                body: JSON.stringify({ description }),
                headers: { 'Content-Type': 'application/json', },
            });
    
            if (response.ok) {
                document.location.replace('/photos');

            } else {
                function interval(){
                document.location.replace('/photos');
                } 
                setInterval(interval, 500);
            }
        }
        }   
        
    }
    )

    document.getElementById("upload_widget").addEventListener("click", function () {
        myWidget.open();
    }, false);


    const delPhotoHandler = async (event) => {

const id = event.target.getAttribute('data-id');

if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/photos/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/photos');
    } else {
      alert('Failed to delete project');
    }
  }
      };
    
      document
      .querySelector('#photo-list')
      .addEventListener('click', delPhotoHandler);