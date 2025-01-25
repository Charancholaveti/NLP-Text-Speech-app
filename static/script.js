// let audio = null;

// function showTextToSpeech() {
//     document.getElementById("textToSpeech").style.display = "block";  // Show Text to Speech section
//     document.getElementById("speechToText").style.display = "none";  // Hide Speech to Text section
// }

// function showSpeechToText() {
//     document.getElementById("speechToText").style.display = "block";  // Show Speech to Text section
//     document.getElementById("textToSpeech").style.display = "none";  // Hide Text to Speech section
// }

// function convertTextToSpeech() {
//     let text = document.getElementById("textInput").value;
//     if (!text) {
//         alert("Please enter text.");
//         return;
//     }

//     // Fetch the audio file for the text using the backend API
//     fetch('/text_to_speech', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ text: text })
//     })
//     .then(response => response.json())
//     .then(data => {
//         // Check if audio file URL is present in the response
//         if (data.audio_file) {
//             // Stop the previous audio if it's playing
//             if (audio) {
//                 audio.pause();
//                 audio.currentTime = 0;  // Reset the playback position to the beginning
//             }

//             // Create a new Audio object with the updated audio file URL (with cache busting)
//             audio = new Audio(data.audio_file + "?t=" + new Date().getTime());  // Prevent caching
//             audio.play();
//         } else {
//             console.error("Audio file not found in the response.");
//         }
//     })
//     .catch(error => {
//         console.error('Error fetching audio:', error);
//     });

//     // Call sentiment analysis after text-to-speech
//     analyzeSentiment(text, "textToSpeech");
// }

// function analyzeSentiment(text, source) {
//     fetch('/analyze_sentiment', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ text: text })
//     })
//     .then(response => response.json())
//     .then(data => {
//         // Display sentiment result
//         if (data.sentiment) {
//             // Based on the source (whether it's text or speech), display sentiment in the correct section
//             if (source === "textToSpeech") {
//                 document.getElementById("sentimentResult").textContent = `Sentiment (Text-to-Speech): ${data.sentiment}`;
//             } else if (source === "speechToText") {
//                 document.getElementById("speechSentimentResult").textContent = `Sentiment (Speech-to-Text): ${data.sentiment}`;
//             }
//         } else {
//             console.error("Sentiment analysis result missing.");
//         }
//     })
//     .catch(error => {
//         console.error('Error fetching sentiment analysis:', error);
//     });
// }

// // Speech-to-Text functionality
// function startSpeechRecognition() {
//     const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//     recognition.lang = 'en-US';  // Set language for speech recognition

//     // Display message when listening starts
//     recognition.onstart = function() {
//         document.getElementById("speechResult").textContent = "Listening...";
//     };

//     // Handle results from the speech recognition
//     recognition.onresult = function(event) {
//         let transcript = event.results[0][0].transcript;
//         document.getElementById("speechResult").textContent = `Recognized: ${transcript}`;

//         // Perform sentiment analysis on the recognized text
//         analyzeSentiment(transcript, "speechToText");
//     };

//     // Handle errors during recognition
//     recognition.onerror = function(event) {
//         document.getElementById("speechResult").textContent = "Error occurred during speech recognition.";
//         console.error("Speech recognition error:", event.error);
//     };

//     // Start the speech recognition
//     recognition.start();
// }
let audio = null;

function showTextToSpeech() {
    document.getElementById("textToSpeech").style.display = "block";  // Show Text to Speech section
    document.getElementById("speechToText").style.display = "none";  // Hide Speech to Text section
}

function showSpeechToText() {
    document.getElementById("speechToText").style.display = "block";  // Show Speech to Text section
    document.getElementById("textToSpeech").style.display = "none";  // Hide Text to Speech section
}

function convertTextToSpeech() {
    let text = document.getElementById("textInput").value;
    if (!text) {
        alert("Please enter text.");
        return;
    }

    // Fetch the audio file for the text using the backend API
    fetch('/text_to_speech', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
    })
    .then(response => response.json())
    .then(data => {
        // Check if audio file URL is present in the response
        if (data.audio_file) {
            // Stop the previous audio if it's playing
            if (audio) {
                audio.pause();
                audio.currentTime = 0;  // Reset the playback position to the beginning
            }

            // Create a new Audio object with the updated audio file URL (with cache busting)
            audio = new Audio(data.audio_file + "?t=" + new Date().getTime());  // Prevent caching
            audio.play();
        } else {
            console.error("Audio file not found in the response.");
        }
    })
    .catch(error => {
        console.error('Error fetching audio:', error);
    });

    // Call sentiment analysis after text-to-speech
    analyzeSentiment(text, "textToSpeech");
}

function analyzeSentiment(text, source) {
    fetch('/analyze_sentiment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
    })
    .then(response => response.json())
    .then(data => {
        // Display sentiment result
        if (data.sentiment) {
            // Based on the source (whether it's text or speech), display sentiment in the correct section
            if (source === "textToSpeech") {
                document.getElementById("sentimentResult").textContent = `Sentiment : ${data.sentiment}`;
            } else if (source === "speechToText") {
                document.getElementById("speechSentimentResult").textContent = `Sentiment : ${data.sentiment}`;
            }
        } else {
            console.error("Sentiment analysis result missing.");
        }
    })
    .catch(error => {
        console.error('Error fetching sentiment analysis:', error);
    });
}

// Speech-to-Text functionality
function startSpeechRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';  // Set language for speech recognition

    // Display message when listening starts
    recognition.onstart = function() {
        document.getElementById("speechResult").textContent = "Listening...";
    };

    // Handle results from the speech recognition
    recognition.onresult = function(event) {
        let transcript = event.results[0][0].transcript;
        document.getElementById("speechResult").textContent = `Recognized: ${transcript}`;

        // Perform sentiment analysis on the recognized text
        analyzeSentiment(transcript, "speechToText");
    };

    // Handle errors during recognition
    recognition.onerror = function(event) {
        document.getElementById("speechResult").textContent = "Error occurred during speech recognition.";
        console.error("Speech recognition error:", event.error);
    };

    // Start the speech recognition
    recognition.start();
}
