

var tablinks = document.getElementsByClassName('tab-links');
var tabcontents = document.getElementsByClassName('tab-contents');

function opentab(tabname){
    for(var tablink of tablinks){
        tablink.classList.remove('active-link');
    }

    for(var tabcontent of tabcontents){
        tabcontent.classList.remove('active-tab');
    }

    event.currentTarget.classList.add('active-link');
    document.getElementById(tabname).classList.add('active-tab')
}

/*------------SIDE MENU, OPEN AND CLOSE------------------*/
var sidemenu = document.getElementById('sidemenu')

function openmenu(){
     sidemenu.style.right = "0";
}
function closemenu(){
     sidemenu.style.right = "-200px";
}


/***********************CONTACT FORM******************* */
// Initialize Email.js
emailjs.init("qfm15fP7kAwGRCLID"); // Replace with your actual Email.js user ID

// Handle form submission
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent page reload
    sendMail();
});

function sendMail() {
    var params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    };

    const serviceID = "service_8ivk16p"; 
    const templateID = "template_yja8nnz"; 

    emailjs.send(serviceID, templateID, params)
        .then((res) => {
            console.log("SUCCESS", res.status, res.text);
            // Clear form fields
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";

            // Show success message
            document.getElementById("successMessage").style.display = "block";
        })
        .catch((err) => {
            console.error("FAILED", err);
            alert("There was an error sending your message. Please try again later.");
        });
}
