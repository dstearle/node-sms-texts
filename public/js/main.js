// The input for the phone number
const numberInput = document.getElementById('number'),
// The input for the text message
textInput = document.getElementById('msg'),
// The input for the submit button
button = document.getElementById('button'),
// The input for the phone number
respone = document.querySelector('.response');

// Event listener for the submit button
button.addEventListener('click', send, false);

// Sends a text message from the inputs
function send() {

    // The phone number to be texted
    const number = numberInput.value.replace(/\D/g, '');

    // The text message to send
    const text = textInput.value;

    // Fetches the data to be sent
    fetch('/', {

        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({number: number, text: text})

    })
    .then(function(res) {

        console.log(res);

    })
    .catch(function(err) {
        
        console.log(err)
    
    })

}