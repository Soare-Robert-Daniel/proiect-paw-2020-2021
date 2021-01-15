
async function preia_date_server() {
    const res = await fetch('http://localhost:3000/api/v1/memes')
    return JSON.parse(await res.json())
}

function creazaRandTabel(dateRand) {
    console.log(dateRand)
    const rand = document.createElement('tr');

    // adauga date
    rand.innerHTML = `
        <td>
            ${dateRand.id}
        </td>
        <td>
            <a href="${dateRand.src || ""}">${dateRand.src || "-"}</a>  
        </td>
        <td>
            <img srcset="${dateRand.src_img}" alt="${dateRand.alt || " "}"  
        </td>
        <td>
            ${dateRand.alt || "-"}  
        </td>
    `;

    // adauga butoane
    const stergere = document.createElement('button');
    stergere.classList.add('buton-stergere')
    stergere.textContent = "Stergere"
    stergere.onclick = function () {
        fetch(`http:\\\\localhost:3000\\api\\v1\\meme\\${dateRand.id}\\delete`).then(
            () => adaugaDateTabel()
        )
    }

    const grup = document.createElement('td');
    grup.appendChild(stergere)

    rand.appendChild(grup)
    return rand;
}

async function adaugaDateTabel() {
    const tabel = document.querySelector('#admin-lista')

    if (!tabel) {
        console.log("Nu exista tabel!")
        return
    }

    // curata tabelul
    tabel.innerHTML = '';

    // adauga antet
    tabel.innerHTML = `
        <tr>
          <td>ID</td>
          <td>src</td>
          <td>src_img</td>
          <td>alt_img</td>
          <td>Actiuni</td>
        </tr>
    `

    const date_server = await preia_date_server()

    date_server.map(dateRand => {
        const rand = creazaRandTabel(dateRand)
        tabel.appendChild(rand)
    })
}

async function initilizareButonSalver() {
    const salvare = document.querySelector('#buton-salvare')
    const src = document.querySelector('#sursa-input')
    const src_img = document.querySelector('#link-input')
    const alt = document.querySelector('#descriere-input')

    if (salvare && src && src_img && alt) {
        // preia datele din formular

        salvare.onclick = function (event) {
            event.preventDefault()

            if (!src_img.value) {
                alert('Link-ul imaginii nu trebuie sa fie gol!')
                return
            }

            fetch(`http:\\\\localhost:3000\\api\\v1\\meme\\add`, {
                method: 'POST',
                mode: 'cors',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    src: src.value,
                    src_img: src_img.value,
                    alt: alt.value
                })
            }).then(() => adaugaDateTabel()).catch((err) => {
                alert("Nu s-au putut trimit datele!")
                console.log(err)
            })
        }
    } else {
        console.log('Formularul nu este prezent in pagina')
    }
}

window.onload = () => {
    adaugaDateTabel()
    initilizareButonSalver()
}
