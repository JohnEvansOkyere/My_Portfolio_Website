

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


function sendMail(){
    var params={
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };


    const serviceID = "service_8ivk16p";
const templateID = "template_yja8nnz";

emailjs.send(serviceID, templateID, params)
.then((res) =>{
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";

    console.log(res);
    alert("Your message sent succesfully")
})
.catch((err) >= console.log(err));
}

