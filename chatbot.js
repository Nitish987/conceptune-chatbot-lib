const chatbotActiveBtn = document.getElementById('chatbotActiveBtn');
const chatbotCloseBtn = document.getElementById('chatbotCloseBtn');
const conceptuneChatbot = document.getElementById('conceptuneChatbot');
const message = document.getElementById('message-content');
const sendBtn = document.getElementById('send-message');
const messageHolder = document.getElementById('chatbox-holder');

chatbotActiveBtn.addEventListener('click', event => {
    chatbotActiveBtn.style.display = 'none';
    conceptuneChatbot.style.display = 'block';
});

chatbotCloseBtn.addEventListener('click', event => {
    chatbotActiveBtn.style.display = 'flex';
    conceptuneChatbot.style.display = 'none';
});

function buildMessage(type, message) {
    const div = document.createElement('div');
    const span = document.createElement('span');
    if (type == 'user') {
        div.setAttribute('class', 'chatbox chatbox-user');
    } else {
        div.setAttribute('class', 'chatbox chatbox-bot');
    }
    span.setAttribute('role', type);
    span.innerHTML = message;
    div.appendChild(span);
    return div;
}

sendBtn.addEventListener('click', event => {
    if (message.value != '' || message .value != null) {
        const chat = buildMessage('user', message.value);
        messageHolder.appendChild(chat);
        HttpClient.get(`/chatbot/v1/bot/?project_id=${Credentials.projectId}&api_id=${Credentials.apiId}&query=${message.value}`, {
            "Authorization": Credentials.apiKey,
            "Content-Type": "application/json",
        }).then(res => {
            if (res.success) {
                const chat = buildMessage('bot', res.data.answer);
                messageHolder.appendChild(chat);
            }
        });
        message.value = '';
    }
});