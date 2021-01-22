
async function preia_date_server() {
    const res = await fetch('http://localhost:3000/api/v1/memes')
    return JSON.parse(await res.json())
}

function creazaRandTabel(dateRand) {
    console.log(dateRand)
    const rand = document.createElement('tr');

    // adauga date
    rand.innerHTML = `   
        <th class="id-tabel">
            ${dateRand.id}
        </th>
        <td>
            <a href="${dateRand.src || ""}">${dateRand.src || "-"}</a>  
        </td>
        <td>
            <img srcset="${dateRand.src_img}" alt="${dateRand.alt || " "}"  />
        </td>
        <td>
            ${dateRand.alt || "-"}  
        </td>
    `;

    // buton de stergere
    const stergere = document.createElement('button');
    stergere.classList.add('buton-stergere')
    stergere.textContent = "Stergere"
    stergere.onclick = function () {
        fetch(`http:\\\\localhost:3000\\api\\v1\\meme\\${dateRand.id}\\delete`).then(
            () => adaugaDateTabel()
        )
    }
    // buton the modificare
    const modificare = document.createElement('button');
    modificare.textContent = "Modifica"
    modificare.classList.add('buton-modificare')
    modificare.onclick = function () {
        const id = document.querySelector('#id-input-mod')
        const src = document.querySelector('#sursa-input-mod')
        const src_img = document.querySelector('#link-input-mod')
        const alt = document.querySelector('#descriere-input-mod')
        const formular = document.querySelector('#form-modifica')

        id.value = dateRand.id;
        src.value = dateRand.src;
        src_img.value = dateRand.src_img;
        alt.value = dateRand.alt;
        formular.style.display = "flex"
    }

    const grup = document.createElement('td');
    grup.appendChild(stergere)
    grup.appendChild(modificare)

    rand.appendChild(grup)
    return rand;
}

async function adaugaDateTabel() {
    const tabel = document.querySelector('#admin-lista')
    const tbody = document.createElement('tbody')

    if (!tabel) {
        console.log("Nu exista tabel!")
        return
    }

    // curata tabelul
    tabel.innerHTML = '';

    // adauga antet
    tabel.innerHTML = `
        <caption> Baza de date </caption>
        <thead>
            <tr>
            <th class="id-tabel">ID</th>
            <th>Sursa imaginii</th>
            <th>Link imagine</th>
            <th>Descriere</th>
            <th>Actiuni</th>
            </tr>
        </thead>
    `

    const date_server = await preia_date_server()

    date_server.map(dateRand => {
        const rand = creazaRandTabel(dateRand)
        tbody.appendChild(rand)
    })
    tabel.appendChild(tbody)
}



async function initializareButonSalvare() {
    const salvare = document.querySelector('#buton-salvare')
    const src = document.querySelector('#sursa-input')
    const src_img = document.querySelector('#link-input')
    const alt = document.querySelector('#descriere-input')

    src_img.addEventListener("input", function(event) {
        console.log(event.target)
        if ( ! event.target.value ) {
            salvare.disabled = true
        } else {
            salvare.disabled = false
        }
    }) 

    if (salvare && src && src_img && alt) {
        // preia datele din formular

        salvare.onclick = function (event) {
            event.preventDefault()

            if (!src_img.value) {
                alert('Link-ul imaginii nu trebuie sa fie gol!')
                return
            }
            /*
                Verifica daca link-ul valid prin incarcarea sa intr-un obiect de tip imagine
            */
            const img = document.createElement('img')

            img.onload = function () {
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
                }).then(() => {
                    adaugaDateTabel()
                    src.value = ""
                    src_img.value = ""
                    alt.value = ""
                }).catch((err) => {
                    alert("Nu s-au putut trimit datele!")
                    console.log(err)
                })
            }

            img.onerror = function () {
                alert('Link-ul imaginii nu este valid!');
            }

            img.src = src_img.value
        }
    } else {
        console.log('Formularul nu este prezent in pagina')
    }
}

async function initializareButonModificare() {
    const modificare = document.querySelector('#buton-modificare')
    const id = document.querySelector('#id-input-mod')
    const src = document.querySelector('#sursa-input-mod')
    const src_img = document.querySelector('#link-input-mod')
    const alt = document.querySelector('#descriere-input-mod')

    const formular = document.querySelector('#form-modifica')
    formular.style.display = "none"

    modificare.onclick = function (event) {
        event.preventDefault()

        if (!src_img.value) {
            alert('Link-ul imaginii nu trebuie sa fie gol!')
            return
        }


        /*
            Verifica daca link-ul valid prin incarcarea sa intr-un obiect de tip imagine
        */
        const img = document.createElement('img')

        img.onload = function () {
            fetch(`http:\\\\localhost:3000\\api\\v1\\meme\\${id.value}\\update`, {
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
            }).then(() => {
                adaugaDateTabel()
                formular.style.display = "none"
                id.value = ""
                src.value = ""
                src_img.value = ""
                alt.value = ""
            }).catch((err) => {
                alert("Nu s-au putut trimit datele!")
                console.log(err)
            })
        }

        img.onerror = function () {
            alert('Link-ul imaginii nu este valid!');
        }

        img.src = src_img.value
    }
}

window.onload = () => {
    adaugaDateTabel()
    initializareButonSalvare()
    initializareButonModificare()
}
