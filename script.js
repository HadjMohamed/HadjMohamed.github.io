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
    strings: ['a software engineer', 'graduated in 2024','focused on innovation and always learning'],
    typeSpeed: 50,
    backSpeed: 90,
    loop: true,
});
console.log("Typing effect initialized");

// Chatbot modal
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
    const welcomeMessage = "Hello I'm hIAdj ! 😊 Here to help you !\n" +
                            "You can try the following questions :\n";

    const example1= "- Who is Mohamed Hadj ?";
    const example2= "- What do you do in your free time ?";
    const example3= "- What skills did you develop at ArianeGroup ?";

    addBotMessage(welcomeMessage);
    addBotMessage(example1);
    addBotMessage(example2);
    addBotMessage(example3);
});

function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") {
        console.log("User input is empty, aborting");
        return;
    }

    // Display user's message
    const messagesContainer = document.getElementById("chatbot-messages");
    const userMessageDiv = document.createElement("div");
    userMessageDiv.className = "message user";
    userMessageDiv.innerText = userInput;
    messagesContainer.appendChild(userMessageDiv);

    // Scroll to the bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Clearing input
    document.getElementById("user-input").value = "";

    // Fetching the question
    const baseUrl = window.location.hostname === "127.0.0.1" 
    ? "http://127.0.0.1:5500" 
    : "https://web-production-0de93.up.railway.app";

    console.log("Base URL for API:", baseUrl);

    fetch(`${baseUrl}/chatbot`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userInput }),
    })
    .then(response => {
        return response.json();
    })
    .then(data => {

        const botMessageDiv = document.createElement("div");
        botMessageDiv.className = "message bot";
        botMessageDiv.innerText = data.response;
        messagesContainer.appendChild(botMessageDiv);

        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    })
    .catch(error => {
        console.error("Erreur:", error);
        addBotMessage("Sorry, I couldn't respond at the moment. Please try again.");
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

