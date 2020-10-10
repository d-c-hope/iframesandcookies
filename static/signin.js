function popup(mylink, windowname) {
    if (! window.focus)return true;
    var href;
    if (typeof(mylink) == 'string') href=mylink;
    else href=mylink.href;

    var width = 500;
    var height = 900;
    var left = parseInt((screen.availWidth/2) - (width/2));
    var top = parseInt((screen.availHeight/2) - (height/2));

    window.open(href, windowname, 'width=500,height=900,left=' + left + ",top=" + top + "," +
        'scrollbars=yes');

    // var left = (screen.width - myWidth) / 2;
    // var top = (screen.height - myHeight) / 4;
    // var myWindow = window.open(href, windowname, ' ' +
    //     'menubar=no, resizable=yes, ' +
    //     'width=' + myWidth + ', height=' + myHeight + ', top=' + top + ', left=' + left);

    return false;
}

function receiveMessage(event) {
    console.log("event" + event);
    if (event.data === "complete") {
        window.location = "/signincompleted";
    } else if (event.data.event === "signindataupdate") {
        var email = event.data.data.email
        console.log("signin data update in signin.js, email is " + email)
        document.getElementById("username").value = email;
    }
    return;
}


function skysigninclicked(element) {
    // window.location.href = "https://myskyid.mysky.com/authenticate";
    localStorage.setItem("entered_email", document.getElementById("username").value)
    window.location.href = "https://myskyid.mysky.com/authenticate";
}

window.onload = function() {
    checkAccess();
    requestAnyState();
}

function checkAccess() {
    var promise = document.hasStorageAccess();
    promise.then(
        function (hasAccess) {
            console.log("Has access ")
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {};

            xhttp.open("GET", "", true);
            xhttp.send();
        },
        function (reason) {
            console.log("Failed to get access " + reason)
        }
    );
}

function accessRequest(element) {

  var promise = document.requestStorageAccess();
  promise.then(
    function () {
      console.log("Storage access was granted");
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          // if (this.readyState == 4 && this.status == 200) {
          //   onDone();
          // }
          location.reload()
      };

      xhttp.open("GET", "", true);
      xhttp.send();
    },
    function () {
      console.log("Storage access was denied.");
    }
  );

}

function requestAnyState() {
    frames = window.parent.frames;
    for (let i = 0; i < frames.length; i++) {
        // console.log("Post in sign in button " + i)
        console.log("signin.js requesting state")
        frames[i].postMessage({"event":"signindatarequest", "data" : {}}, "https://myskyid.myskysports.com");
    }

    // window.parent.postMessage({"event":"signindatarequest", "data" : {}}, "https://myskyid.myskysports.com");
}


window.addEventListener("message", receiveMessage, false);

