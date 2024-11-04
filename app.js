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


    document.getElementById("filterContainer").style.display = works.length > 0 ? "block" : "none";
}

function addCharacter(event) {
    event.preventDefault();
    const imageUrl = document.getElementById("imageUrl").value;
    const characterName = document.getElementById("characterName").value;
    const workOption = document.getElementById("workOption").value;
    const workName = workOption || document.getElementById("newWorkName").value;

    if (!works.includes(workName)) {
        works.push(workName);
        updateWorkOptions();
        localStorage.setItem('works', JSON.stringify(works));
    }

    characters.push({ image: imageUrl, name: characterName, work: workName });
    localStorage.setItem('characters', JSON.stringify(characters));

    displayCharacters();
    document.getElementById("characterForm").reset();
    toggleWorkInput();
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
    document.getElementById("updateWorkName").value = character.work;
    document.getElementById("updateCharacterForm").onsubmit = (event) => updateCharacter(event, index);
    document.getElementById("updateModal").style.display = "block";
}

function updateCharacter(event, index) {
    event.preventDefault();
    const imageUrl = document.getElementById("updateImageUrl").value;
    const characterName = document.getElementById("updateCharacterName").value;
    const workName = document.getElementById("updateWorkName").value;

    characters[index] = { image: imageUrl, name: characterName, work: workName };
    localStorage.setItem('characters', JSON.stringify(characters));
    displayCharacters();
    closeUpdateModal();
}

function closeUpdateModal() {
    document.getElementById("updateModal").style.display = "none";
}

window.onclick = function (event) {
    const modal = document.getElementById("updateModal");
    if (event.target === modal) {
        closeUpdateModal();
    }
}

function updateWorkOptions() {
    const workOptionSelect = document.getElementById("workOption");
    const filterSelect = document.getElementById("filterWork");


    workOptionSelect.innerHTML = '<option value="">Nouvelle œuvre</option>';
    works.forEach(work => {
        const option = document.createElement("option");
        option.value = work;
        option.textContent = work;
        workOptionSelect.appendChild(option);
    });


    filterSelect.innerHTML = '<option value="">Toutes les œuvres</option>';
    works.forEach(work => {
        const option = document.createElement("option");
        option.value = work;
        option.textContent = work;
        filterSelect.appendChild(option);
    });
}

function toggleWorkInput() {
    const workOption = document.getElementById("workOption").value;
    const newWorkInput = document.getElementById("newWorkName");


    newWorkInput.style.display = workOption ? "none" : "block";
}

function sortCharactersByName() {
    characters.sort((a, b) => a.name.localeCompare(b.name));
    displayCharacters();
}

function filterCharacters() {
    const filter = document.getElementById("filterWork").value;
    displayCharacters(filter);
}

document.getElementById("characterForm").onsubmit = addCharacter;
document.querySelector(".close").onclick = closeUpdateModal;

updateWorkOptions();
displayCharacters();
toggleWorkInput();
