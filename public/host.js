async function loadRSVPs() {

    const response = await fetch("/api/rsvps");

    const rsvps = await response.json();

    const yesRSVPs = rsvps.filter(rsvp => rsvp.response === "yes");
    const noRSVPs = rsvps.filter(rsvp => rsvp.response === "no");


    // Count actual people coming
    let totalPeople = 0;

    yesRSVPs.forEach(rsvp => {
        totalPeople += 1 + Number(rsvp.plus);
    });


    // Total people
    document.getElementById("total-people").textContent = totalPeople;

    // Number of YES RSVPs
    document.getElementById("yes-count").textContent = yesRSVPs.length;


    // YES names
    const yesList = document.getElementById("yes-list");

    yesList.innerHTML = "";

    yesRSVPs.forEach(rsvp => {

        const person = document.createElement("p");

        if (rsvp.plus === 1) {
            person.textContent = `${rsvp.name} +1`;
        } else {
            person.textContent = rsvp.name;
        }

        yesList.appendChild(person);
    });


    // NO names
    const noList = document.getElementById("no-list");

    noList.innerHTML = "";

    noRSVPs.forEach(rsvp => {

        const person = document.createElement("p");

        person.textContent = rsvp.name;

        noList.appendChild(person);
    });
}


loadRSVPs();