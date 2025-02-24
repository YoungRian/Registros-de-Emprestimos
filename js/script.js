function addPerson() {
    const name = document.getElementById("name").value;
    fetch("http://localhost:3001/add_individual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
    }).then(() => location.reload());
}

fetch("http://localhost:3001/individuals")
    .then(response => response.json())
    .then(data => {
        const list = document.getElementById("individuals");
        data.forEach(person => {
            const li = document.createElement("li");
            li.textContent = person.name;
            list.appendChild(li);
        });
    });