

function submitclicked(el) {
    console.log("Password submit button clicked")
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var email = JSON.parse(this.response).email
            console.log("authenticate successful, confirmed email was " + email)
            onDone(email);
        }
  };
    var email = localStorage.getItem("entered_email");
    var password = document.getElementById("password").value
    data = {
        "email" :  email,
        "password" :  password
    }

    xhttp.open("POST", "authenticate/authcreds", true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhttp.send(JSON.stringify(data));
    return false;
}

function onDone(email) {
    // window.location.href = "https://myskyid.mysky.com/signin";

    frames = window.parent.frames;
    for (let i = 0; i < frames.length; i++) {
        // console.log("Post in sign in button " + i)
        console.log("authenticate js onDone sending")
        frames[i].postMessage({"event":"cosignincomplete", "data" : {}}, "https://myskyid.myskysports.com");
    }

    window.parent.postMessage({"email":email}, "*")
    // window.location.href = "https://myskyid.mysky.com/signin";
}


