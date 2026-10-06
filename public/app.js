//Music 
const bgm = document.getElementById("bgm");
bgm.loop = true;
bgm.play();

document.addEventListener("click", () => {
    bgm.loop = true;
    bgm.play();     
})

//RSVP
function showYesOptions() {
    const name = document.getElementById("name").value.trim();
    const response = document.getElementById("response");

    if (!name) {
        response.textContent = "Please enter your name first!";
        return;
    }

    document.getElementById("yes-options").style.display = "block";
}


async function submitYesRSVP() {
    const name = document.getElementById("name").value.trim();
    const plus = document.getElementById("plus").value;

    submitRSVP("yes", Number(plus));
}


async function submitRSVP(response, plus) {

    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("response");

    if (!name) {
        message.textContent = "Please enter your name!";
        return;
    }

    try {

        const result = await fetch("/api/rsvp", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
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