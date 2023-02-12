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

        if (response.ok) {

            document.location.replace(`/planet/${randomId}`);
        }else {
            console.log(`we're not ok ${response}`)

            alert(response.statusText);
        }
    };
};




document.querySelector('#warp').addEventListener('click', warpSpeedHandler);

