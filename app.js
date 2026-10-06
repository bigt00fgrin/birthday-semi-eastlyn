//Music 
const bgm = document.getElementById("bgm");
bgm.loop = true;
bgm.play();

document.addEventListener("click", () => {
    bgm.loop = true;
    bgm.play();     
})

//RSVP
const API_URL = "https://script.google.com/macros/s/AKfycbzcit9alP3kUMSaXxd0AwsIGg0kO_y57JbLuRlQkikoZU5FaykGIqEo4bcOyXOdE20O/exec";


function showYesOptions() {

    const name = document.getElementById("name").value.trim();
    const response = document.getElementById("response");

    if (!name) {
        response.textContent = "Tell us your name first! ♡";
        return;
    }

    response.textContent = "";

    document.getElementById("yes-options").style.display = "block";
}


async function submitYesRSVP() {

    const plus = document.getElementById("plus").value;

    await submitRSVP("yes", Number(plus));
}


async function submitRSVP(response, plus) {

    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("response");

    if (!name) {
        message.textContent = "Please enter your name!";
        return;
    }

    try {

        const result = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain"
            },
            body: JSON.stringify({
                name: name,
                response: response,
                plus: plus
            })
        });

        const data = await result.json();

        if (result.ok) {
            message.textContent = data.message;
        } else {
            message.textContent = "Something went wrong.";
        }

    } catch (error) {

        console.error(error);

        message.textContent = "Could not submit RSVP.";

    }
}