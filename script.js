const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatLog = document.getElementById('chat-log');

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = chatInput.value;
  appendMessage('You', message);
  chatInput.value = '';

  const response = await fetch('/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });
  
  const data = await response.json();
  appendMessage('ChatGPT', data.reply);
});

function appendMessage(sender, text) {
  const messageDiv = document.createElement('div');
  messageDiv.textContent = `${sender}: ${text}`;
  chatLog.appendChild(messageDiv);
  chatLog.scrollTop = chatLog.scrollHeight;
}
