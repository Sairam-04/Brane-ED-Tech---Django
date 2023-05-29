async function sendMessage(message) {
  console.log("got", message);
  const settings = {
    async: true,
    crossDomain: true,
    url: 'https://google-search74.p.rapidapi.com/',
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '4df7b0a158msh23f89f3d0ba5328p13b31fjsn1512178f9f56',
      'X-RapidAPI-Host': 'google-search74.p.rapidapi.com'
    },
    data: {
      query: message,
      limit: 1,
      related_keywords: true
    }
  };

  try {
    const response = await $.ajax(settings);
    console.log(response); // Log the response to the console
    const descriptionText = response.results[0]?.description || "";
    return descriptionText || ""; // Return descriptionText or an empty string if it's undefined
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to propagate it to the caller
  }
}

// Function to speak out the response
function speakResponse(response) {
  const speech = new SpeechSynthesisUtterance();
  speech.text = response;
  speech.lang = 'en-US';
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  speechSynthesis.speak(speech);
}

let isMicOn = false;
function handleMicIconClick() {
  const micIcon = document.getElementById('micIcon');
  // Toggle the microphone state
  isMicOn = !isMicOn;

  if (isMicOn) {
    // Disable the mic icon to prevent multiple clicks
    micIcon.style.pointerEvents = 'none';

    // Initialize the Web Speech Recognition API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    // Start the recognition process
    recognition.start();

    // Event listener for speech recognition results
    recognition.addEventListener('result', async (event) => {
      const transcript = event.results[0][0].transcript;
      console.log('User said:', transcript);

      // Update the search input field with the transcript
      const searchInput = document.getElementById('gssearch');
      searchInput.value = transcript;

      try {
        // Send user message to the AI model
        const response = await sendMessage(transcript);
        console.log(response);
        document.getElementById("gs-response").textContent = response;

        // Speak out the response
        speakResponse(response);
      } catch (error) {
        console.error(error);
      }

      // Enable the mic icon again
      micIcon.style.pointerEvents = 'auto';
    });

    // Event listener for speech recognition errors
    recognition.addEventListener('error', (event) => {
      console.error('Speech recognition error:', event.error);

      // Enable the mic icon again
      micIcon.style.pointerEvents = 'auto';
    });

    // Event listener for speech recognition end
    recognition.addEventListener('end', () => {
      console.log('Speech recognition ended. Restarting...');
      // Restart the recognition process
      recognition.start();
    });
  }
}

function handleMicIconClickoff() {
  speechSynthesis.cancel();
}