const sessionUser = document.getElementById("sessionUser");
const storedData = document.getElementById("storedData");

function saveFeedback(){

    document.getElementById("nameError").innerHTML="";
    document.getElementById("emailError").innerHTML="";
    document.getElementById("courseError").innerHTML="";
    document.getElementById("feedbackError").innerHTML="";

    let name=document.getElementById("name").value.trim();
    let email=document.getElementById("email").value.trim();
    let course=document.getElementById("course").value;
    let feedback=document.getElementById("feedback").value.trim();

    let valid=true;

    if(name.length<3){
        document.getElementById("nameError").innerHTML="Name must contain at least 3 characters.";
        valid=false;
    }

    let emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(email)){
        document.getElementById("emailError").innerHTML="Enter a valid email.";
        valid=false;
    }

    if(course==""){
        document.getElementById("courseError").innerHTML="Please select a course.";
        valid=false;
    }

    if(feedback==""){
        document.getElementById("feedbackError").innerHTML="Please enter feedback.";
        valid=false;
    }

    if(!valid){
        return;
    }

    const student={
        name:name,
        email:email,
        course:course,
        feedback:feedback
    };

    localStorage.setItem("feedback",JSON.stringify(student));

    sessionStorage.setItem("currentUser",name);

    sessionUser.innerHTML=name;

    displayFeedback();
}

function displayFeedback(){

    let data=localStorage.getItem("feedback");

    if(data==null){
        storedData.innerHTML="No feedback stored.";
        return;
    }

    let student=JSON.parse(data);

    storedData.innerHTML=
    "<b>Name:</b> "+student.name+"<br><br>"+
    "<b>Email:</b> "+student.email+"<br><br>"+
    "<b>Course:</b> "+student.course+"<br><br>"+
    "<b>Feedback:</b> "+student.feedback;
}

function deleteData(){

    localStorage.removeItem("feedback");
    sessionStorage.removeItem("currentUser");

    storedData.innerHTML="No feedback stored.";

    sessionUser.innerHTML="None";
}

window.onload=function(){

    let user=sessionStorage.getItem("currentUser");

    if(user!=null){
        sessionUser.innerHTML=user;
    }

    displayFeedback();
}