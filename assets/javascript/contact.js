// Email JS
(function(){
      emailjs.init("Kaqd6crW-KZb4FCVA");
   })();

function sendEmail() {
    let templateParams = {
        from_name: document.getElementById("name").value,
        from_email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    emailjs.send("service_phv2jxj", "template_5xqu846", templateParams)
    .then(function(response) {
        console.log("SUCCESS!", response.status, response.text);
        alert("Your message has been sent successfully!");
    }, function(error) {
        console.log("FAILED...", error);
        alert("There was an error sending your message. Please try again.");
    });
    document.getElementById("contact-form").reset();
}