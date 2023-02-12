const warpSpeedHandler = async (event) => {

    event.preventDefault();

    console.log("warpSpeedHandler")

        const randomId = Math.floor(Math.random() * 30) + 1
        console.log(randomId);

    if (randomId) {
        const response = await fetch(`/planet/${randomId}`, {
            method: 'GET',

            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            console.log("we're not ok")
            alert(response.statusText);
        }
    };
};




document.querySelector('#flag-form').addEventListener('click', warpSpeedHandler);

