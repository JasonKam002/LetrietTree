document.querySelector("#searchBtn")
.addEventListener("click", function(e) {

    e.preventDefault()

    const search =
        inputSearch.value.toLowerCase()

    const matches = []

    for (const log of logs) {

        if (
            log.name.toLowerCase().includes(search)
            ||
            log.species.toLowerCase().includes(search)
        ) {
            matches.push(log)
        }
    }

    const resultDiv =
        document.querySelector("#results")

    resultDiv.innerHTML = ""

    for (const log of matches) {

        resultDiv.innerHTML += `
            <div>
                <h2>${log.name}</h2>

                <p>${log.species}</p>

                <p>${log.description}</p>

                <img
                    src="${log.image}"
                    width="300"
                >
            </div>

            <hr>
        `
    }
})

function displayMatches() {
    if (matches.log == 0) {
        alert("No matches")
    }
}