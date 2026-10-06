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
        response.textContent = "Please enter your name first! ♡";
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
        message.textContent = "Please enter your name first! ♡";
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

            // Hide the RSVP form
            document.getElementById("name").style.display = "none";
            document.querySelector(".rsvp-buttons").style.display = "none";
            document.getElementById("yes-options").style.display = "none";

            // Show confirmation
            message.textContent = response === "yes"
                ? `Love youuuuu ${name}!`
                : `Thank you ${name}! ♡ We'll miss you!`;
        } else {

            message.textContent = "Something went wrong.";

        }

    } catch (error) {

        console.error(error);

        message.textContent = "Could not submit RSVP.";

    }
}