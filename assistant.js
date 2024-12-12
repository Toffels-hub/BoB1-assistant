// assistant.js

// Accessing DOM elements
const messagesDiv = document.getElementById('messages');
const userInput = document.getElementById('userInput');

// Create the SpeechSynthesis and SpeechRecognition objects
const synth = window.speechSynthesis;
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

// Function to handle the assistant's voice output
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1; // Set pitch for uniqueness
    utterance.rate = 1;  // Set speed of speech
    synth.speak(utterance);
}
//----------------------------------------------------------------------------------------------------------------------
// Function to simulate a chat response
function assistantResponse(userText) {
    // Basic responses (you can expand this for more complex conversation flow)
    let responseText = '';

    if (userText.includes('hello') || userText.includes('hi')) {
        responseText = "Hello there! How can I assist you today?";
    } else if (userText.includes('how are you')) {
        responseText = "I'm doing great, thank you for asking!";
    } else if (userText.includes('your name')) {
        responseText = "I'm Bob, your friendly assistant!";
    } else if (userText.includes('weather')) {
        responseText = "I can't check the weather yet, but you can ask me about anything else!";
    } else if (userText.includes('joke')) {
        responseText = "Why don't skeletons fight each other? They don't have the guts!";
    } else if (userText.includes('thank you')) {
        responseText = "You're welcome! I'm always here to help.";
    } else {
        responseText = "I'm sorry, I didn't quite catch that. Can you say it again?";
    }

    displayMessage(responseText, 'assistant');
    speak(responseText);
}
//--------------------------------------------------------------------------------------------------------------------
//Add More Advanced Features
async function fetchWeather(city) {
    const apiKey = 'YOUR_API_KEY';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
        return `The weather in ${city} is ${data.weather[0].description} with a temperature of ${Math.round(data.main.temp - 273.15)}°C.`;
    } else {
        return "I couldn't find the weather for that location. Please check the city name and try again.";
    }
}

function assistantResponse(userText) {
    if (userText.includes('weather in')) {
        const city = userText.split('weather in')[1].trim();
        fetchWeather(city).then(responseText => {
            displayMessage(responseText, 'assistant');
            speak(responseText);
        });
    } else {
        // Other responses
    }





    function setUserName(name) {
        localStorage.setItem('userName', name);
    }
    
    function getUserName() {
        return localStorage.getItem('userName') || 'User';
    }
    
    function assistantResponse(userText) {
        if (userText.includes('my name is')) {
            const name = userText.split('my name is')[1].trim();
            setUserName(name);
            const responseText = `Nice to meet you, ${name}!`;
            displayMessage(responseText, 'assistant');
            speak(responseText);
        } else {
            const name = getUserName();
            if (userText.includes('your name')) {
                const responseText = `I'm Bob, your friendly assistant!`;
                displayMessage(responseText, 'assistant');
                speak(responseText);
            }
        }
    }


    function assistantResponse(userText) {
        if (userText.includes('open YouTube')) {
            window.open('https://www.youtube.com');
            const responseText = "Opening YouTube for you!";
            displayMessage(responseText, 'assistant');
            speak(responseText);
        }
    }
    
//---------------------------------------------------------------------------------------------------------------------

// Function to display messages in the chat window
function displayMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'assistant-message');
    messageDiv.innerText = text;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;  // Scroll to the bottom
}

// Function to handle user input text
function handleUserInput() {
    const inputText = userInput.value.trim();
    if (inputText) {
        displayMessage(inputText, 'user');
        assistantResponse(inputText);
        userInput.value = '';  // Clear the input field
    }
}

// Function to handle voice input
function startListening() {
    recognition.start();
}

// Set up speech recognition (voice input)
recognition.lang = 'en-US';
recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    displayMessage(transcript, 'user');
    assistantResponse(transcript);
};

// Event listener for pressing "Enter" key for text input
userInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        handleUserInput();
    }
});