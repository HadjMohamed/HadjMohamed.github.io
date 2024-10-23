// Responsivity block
let menu = document.querySelector('#menu-icon');
let links = document.querySelector('.links');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    links.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    links.classList.remove('active');
}

// Typing text
const typed = new Typed('.typing-text', {
    strings: ['a data engineer', 'specialized in Python', 'graduated in 2024'],
    typeSpeed: 50,
    backSpeed: 90,
    loop: true,
});

// Chatbot modal
function openModal() {
    document.getElementById("chatbot-modal").style.display = "block";
}

function closeModal() {
    document.getElementById("chatbot-modal").style.display = "none";
}

function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;

    // Display user's message
    const messagesContainer = document.getElementById("chatbot-messages");
    const userMessageDiv = document.createElement("div");
    userMessageDiv.className = "message user";
    userMessageDiv.innerText = userInput;
    messagesContainer.appendChild(userMessageDiv);


    // Scroll to the bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // clearing input
    document.getElementById("user-input").value = "";

    // fetching the question
    const baseUrl = window.location.hostname === "127.0.0.1" 
    ? "http://127.0.0.1:5000" // local http
    : "https://backend-portfolio-j4h1.onrender.com"; // render https

    fetch(`${baseUrl}/chatbot`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userInput }),
        mode: "cors",
    })
    .then(response => response.json())
    .then(data => {
        // Display the response
        const botMessageDiv = document.createElement("div");
        botMessageDiv.className = "message bot";
        botMessageDiv.innerText = data.response;
        messagesContainer.appendChild(botMessageDiv);

        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    })
    .catch(error => {
        console.error("Erreur:", error);
    });
}

// Keyboard shortcuts
document.getElementById('send-btn').addEventListener('click', sendMessage);

document.getElementById('user-input').addEventListener('keydown', function (event) {
    if ((event.key === 'Enter' && !event.shiftKey) && !(event.ctrlKey || event.metaKey)) {
        event.preventDefault();  // Empêche le retour à la ligne
        sendMessage();  // Envoie le message
    }
});
