// JavaScript
async function sendMessage(message) {
  
    console.log("hello",message);
    // const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': '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' // Replace with your actual API key
    //   },
    //   body: JSON.stringify({
    //     'prompt': message,
    //     'max_tokens': 50
    //   })
    // });
  
    // const data = await response.json();
    // const reply = data.choices[0].text.trim();
    // return reply;
        
       
        let res=await $.ajax({
          method:"POST",
          url:"https://api.openai.com/v1/engines/text-davinci-003/completions",
          headers:{'Content-Type': 'application/json',
                  'Authorization': 'Bearer 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'},
          data:JSON.stringify({
              'prompt': message,
              'max_tokens': 50
          })
      })
      console.log("rakesh",res.choices[0].text.trim());
      
      return res.choices[0].text.trim();
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
    
      // Send user message to the AI model
      const response = await sendMessage(transcript);
      console.log(response);
      document.getElementById("gs-response").textContent = response;
         

      // Speak out the response
      speakResponse(response);
    
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
function handleMicIconClickoff(){
  speechSynthesis.cancel();

}