

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



document.addEventListener('DOMContentLoaded', function() {
    var contactForm = document.getElementById('contactForm');
    var successMessage = document.getElementById('successMessage');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Simulate form submission (replace this with your actual form submission code)
        setTimeout(function() {
            // Show the success message
            successMessage.style.display = 'block';

            // Optionally, clear the form fields
            contactForm.reset();
        }, 500); // Simulating a delay for form submission
    });
});
