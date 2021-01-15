let culoareVeche = "";
function schimbaCuloare(id, culoare) {

    if (culoareVeche === "") {
        culoareVeche = window.getComputedStyle(document.getElementById(id), null).getPropertyValue("background-color");
    }

    if (document.getElementById(id).style.backgroundColor !== culoare) {
        document.getElementById(id).style.backgroundColor = culoare;
    } else {
        document.getElementById(id).style.backgroundColor = culoareVeche;
    }
    console.log(culoareVeche);
}

