// Responsivity block
let menu = document.querySelector('#menu-icon');
let links = document.querySelector('.links');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    links.classList.toggle('active');
    console.log("Menu toggled");
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    links.classList.remove('active');
}

// Typing text
console.log("Initializing typing effect");
const typed = new Typed('.typing-text', {
    strings: ['a data engineer', 'graduated in 2024','focused on innovation and always learning'],
    typeSpeed: 50,
    backSpeed: 90,
    loop: true,
});
console.log("Typing effect initialized");

// Chatbot modal

let isMaintenanceMode = false;

function openModal() {
    document.getElementById("chatbot-modal").style.display = "block";
    console.log("Chatbot modal opened");
}

function closeModal() {
    document.getElementById("chatbot-modal").style.display = "none";
    console.log("Chatbot modal closed");
}

// Bot dialog
function addBotMessage(text) {
    const messagesContainer = document.getElementById("chatbot-messages");
    const botMessageDiv = document.createElement("div");
    botMessageDiv.className = "message bot";
    botMessageDiv.innerText = text;
    messagesContainer.appendChild(botMessageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    console.log("Displayed bot message:", text);
}
// Welcoming message
document.addEventListener("DOMContentLoaded", () => {
    const welcomeMessage = "Bonjour, je suis hIAdj ! 😊 Je suis là pour vous aider !\n" +
                           "Vous pouvez essayer les questions suivantes :\n";

    const example1 = "- Qui est Mohamed Hadj ?";
    const example2 = "- Que faites-vous pendant votre temps libre ?";
    const example3 = "- Quelles compétences avez-vous développées chez ArianeGroup ?";

    addBotMessage(welcomeMessage);
    addBotMessage(example1);
    addBotMessage(example2);
    addBotMessage(example3);

    if (isMaintenanceMode) {
        addBotMessage("En raison de coûts d'hébergement élevés, le chatbot est actuellement en maintenance et sera de retour dès que possible !");
    }
});

function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") {
        console.log("User input is empty, aborting");
        return;
    }

    const messagesContainer = document.getElementById("chatbot-messages");

    // Affichage du message utilisateur
    const userMessageDiv = document.createElement("div");
    userMessageDiv.className = "message user";
    userMessageDiv.innerText = userInput;
    messagesContainer.appendChild(userMessageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // On vide le champ
    document.getElementById("user-input").value = "";

    // Définition de l’URL de l’API
    const baseUrl = window.location.hostname === "localhost" 
        ? "http://0.0.0.0:8000" // Localhost
        : "https://ragchatbot-525954493419.europe-west9.run.app";

    const apiEndpoint = `${baseUrl}/ask`;

    fetch(apiEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userInput }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur lors de la requête à l'API.");
        }
        return response.json();
    })
    .then(data => {
        const botMessageDiv = document.createElement("div");
        botMessageDiv.className = "message bot";
        botMessageDiv.innerText = data.answer || "Je n’ai pas de réponse pour le moment.";
        messagesContainer.appendChild(botMessageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    })
    .catch(error => {
        console.error("Erreur:", error);
        const errorDiv = document.createElement("div");
        errorDiv.className = "message bot";
        errorDiv.innerText = "Désolé, une erreur est survenue. Réessaie plus tard.";
        messagesContainer.appendChild(errorDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });
}


// Keyboard shortcuts
document.getElementById('send-btn').addEventListener('click', sendMessage);

document.getElementById('user-input').addEventListener('keydown', function (event) {
    if ((event.key === 'Enter' && !event.shiftKey) && !(event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        sendMessage();
    }
});

