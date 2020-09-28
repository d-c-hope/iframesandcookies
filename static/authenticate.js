

function submitclicked(el) {
    console.log("Submit button clicked")
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var email = JSON.parse(this.response).email
        console.log("email was " + email)
      onDone(email);
    }
  };
    data = {
        "email" :  document.getElementById("username").value
    }

    xhttp.open("POST", "authcreds", true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhttp.send(JSON.stringify(data));
    return false;
}

function onDone(email) {
    // window.location.href = "https://myskyid.mysky.com/signin";
    window.parent.postMessage({"email":email}, "*")
    window.location.href = "https://myskyid.mysky.com/signin";
}


