document.addEventListener('DOMContentLoaded', () => {
    const chatDisplay = document.getElementById('chatDisplay');
    const messageInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    const toggleButton = document.getElementById('toggle');

    sendButton.addEventListener('click', () => {
        const userMessage = messageInput.value;
        if (userMessage.trim()) {
            addUserMessage(userMessage);
            sendMessageToBot(userMessage);
            messageInput.value = '';
        }
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });

    toggleButton.addEventListener('change', () => {
        toggleTheme();
    });

    function toggleTheme() {
        document.body.classList.toggle('dark');
    }

    function addUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message self-end';
        messageElement.textContent = message;
        chatDisplay.appendChild(messageElement);
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    }

    function addBotMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message self-start';
        messageElement.textContent = message;
        chatDisplay.appendChild(messageElement);
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    }

    async function sendMessageToBot(message) {
        try {
            const response = await fetch('/api/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });
            const data = await response.json();
            addBotMessage(data.response);
        } catch (error) {
            console.error('Error:', error);
            addBotMessage('Sorry, I am having trouble connecting to the server.');
        }
    }
});
