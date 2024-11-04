let characters = JSON.parse(localStorage.getItem('characters')) || [];
let works = JSON.parse(localStorage.getItem('works')) || [];

function displayCharacters(filter = "") {
    const tbody = document.querySelector("#characterTable tbody");
    tbody.innerHTML = "";

    const filteredCharacters = filter ? characters.filter(c => c.work === filter) : characters;

    filteredCharacters.forEach((character, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${character.name}</td>
            <td><img src="${character.image}" width="50" alt="${character.name}"></td>
            <td>${character.work}</td>
            <td>
                <button onclick="openUpdateModal(${index})">Modifier</button>
                <button onclick="deleteCharacter(${index})">Supprimer</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function addCharacter(event) {
    event.preventDefault();
    const imageUrl = document.getElementById("imageUrl").value;
    const characterName = document.getElementById("characterName").value;
    const workName = document.getElementById("workNameSelect").value || document.getElementById("newWorkName").value;

    if (!works.includes(workName)) {
        works.push(workName);
        updateWorkSelectOptions();
        localStorage.setItem('works', JSON.stringify(works));
    }

    characters.push({ image: imageUrl, name: characterName, work: workName });
    localStorage.setItem('characters', JSON.stringify(characters));

    displayCharacters();
    document.getElementById("characterForm").reset();
}

function deleteCharacter(index) {
    characters.splice(index, 1);
    localStorage.setItem('characters', JSON.stringify(characters));
    displayCharacters();
}

function openUpdateModal(index) {
    const character = characters[index];
    document.getElementById("updateImageUrl").value = character.image;
    document.getElementById("updateCharacterName").value = character.name;
    document.getElementById("updateWorkNameSelect").value = character.work;
    document.getElementById("updateCharacterForm").onsubmit = (event) => updateCharacter(event, index);
    document.getElementById("updateModal").style.display = "block";
}

function updateCharacter(event, index) {
    event.preventDefault();
    const imageUrl = document.getElementById("updateImageUrl").value;
    const characterName = document.getElementById("updateCharacterName").value;
    const workName = document.getElementById("updateWorkNameSelect").value;

    characters[index] = { image: imageUrl, name: characterName, work: workName };
    localStorage.setItem('characters', JSON.stringify(characters));
    displayCharacters();
    closeUpdateModal();
}

function closeUpdateModal() {
    document.getElementById("updateModal").style.display = "none";
}

function updateWorkSelectOptions() {
    const workSelects = [document.getElementById("workNameSelect"), document.getElementById("filterWork"), document.getElementById("updateWorkNameSelect")];
    workSelects.forEach(select => {
        select.innerHTML = '<option value="">Nouvelle oeuvre</option>';
        works.forEach(work => {
            const option = document.createElement("option");
            option.value = work;
            option.textContent = work;
            select.appendChild(option);
        });
    });
}

function sortCharactersByName() {
    characters.sort((a, b) => a.name.localeCompare(b.name));
    displayCharacters();
}

document.getElementById("characterForm").onsubmit = addCharacter;
document.getElementById("filterWork").onchange = (event) => displayCharacters(event.target.value);
document.querySelector(".close").onclick = closeUpdateModal;

updateWorkSelectOptions();
displayCharacters();
