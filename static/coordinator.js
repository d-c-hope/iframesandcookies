// function popup(mylink, windowname) {
//     if (! window.focus)return true;
//     var href;
//     if (typeof(mylink) == 'string') href=mylink;
//     else href=mylink.href;
//
//     var width = 500;
//     var height = 900;
//     var left = parseInt((screen.availWidth/2) - (width/2));
//     var top = parseInt((screen.availHeight/2) - (height/2));
//
//     window.open(href, windowname, 'width=500,height=900,left=' + left + ",top=" + top + "," +
//         'scrollbars=yes');
//
//     // var left = (screen.width - myWidth) / 2;
//     // var top = (screen.height - myHeight) / 4;
//     // var myWindow = window.open(href, windowname, ' ' +
//     //     'menubar=no, resizable=yes, ' +
//     //     'width=' + myWidth + ', height=' + myHeight + ', top=' + top + ', left=' + left);
//
//     return false;
// }

function receiveMessage(event) {
    console.log("coordinator iframe localstorage email is " + localStorage.getItem("email"))
    var eventdata  = event.data
    console.log("event name is: " + eventdata.event)

    if (eventdata.event == "signinclicked") {
        console.log("event in coordinator" + eventdata.data.email);
        localStorage.setItem("email", eventdata.data.email)
    } else if (eventdata.event == "signindatarequest") {
        console.log("request for sign in data");
        var email = localStorage.getItem("email")
        var frames = window.parent.frames;
        for (let i = 0; i < frames.length; i++) {
              console.log("Post in sign in button " + i)
            frames[i].postMessage({"event":"signindataupdate", "data" : {"email": email}}, "https://myskyid.mysky.com");
        }
    } else if (eventdata.event == "cosignincomplete") {
        console.log("coordinator sign in complete handler");
        setcookieonrelayingparty("todo")
        // var email = localStorage.getItem("email")
        // window.parent.postMessage({"event":"signincomplete", "data" : {"email": email}}, "https://myskysports.com");
        // var frames = window.parent.frames;
        // for (let i = 0; i < frames.length; i++) {
        //       // console.log("Post in sign in button " + i)
        //     frames[i].postMessage({"event":"signincomplete", "data" : {"email": email}}, "https://myskysports.com");
        // }
    }
    // if (event.data === "complete") {
    //     window.location = "/signincompleted";
    // }
    // return;
}

function onDone(email) {
    window.parent.postMessage({"event":"signincomplete", "data" : {"email": email}}, "https://myskysports.com");
}

function setcookieonrelayingparty(signinproof) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var email = JSON.parse(this.response).email
            console.log("coor: authenticate successful, confirmed email was " + email)
            onDone(email);
        }
    };

    // var email = localStorage.getItem("entered_email");
    // var password = document.getElementById("password").value
    data = {
        "signinproof" : signinproof,
    }

    xhttp.open("POST", "coordinatorcookie", true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhttp.send(JSON.stringify(data));
    return false;
}

// function skysigninclicked(element) {
//     // window.location.href = "https://myskyid.mysky.com/authenticate";
//     // window.location.href = "https://myskyid.mysky.com/authenticate";
//     accessRequest()
//     // window.parent.postMessage("signinclicked", "*");
// }
//
// window.onload = function() {
//     checkAccess();
// }
//
// function checkAccess() {
//     var promise = document.hasStorageAccess();
//     promise.then(
//         function (hasAccess) {
//             console.log("Has access ")
//             // var xhttp = new XMLHttpRequest();
//             // xhttp.onreadystatechange = function() {};
//             //
//             // xhttp.open("GET", "", true);
//             // xhttp.send();
//         },
//         function (reason) {
//             console.log("Failed to get access " + reason)
//         }
//     );
// }
//
// function accessRequest(element) {
//
//   var promise = document.requestStorageAccess();
//   promise.then(
//     function () {
//       console.log("Storage access was granted");
//       console.log("posting message")
//
//       var xhttp = new XMLHttpRequest();
//       xhttp.onreadystatechange = function() {
//           if (this.readyState == 4 && this.status == 200) {
//               var email = JSON.parse(this.response).email
//               console.log("email was " + email)
//               window.parent.postMessage({"event":"signinclicked", "data" : {"email": email}}, "*");
//           }
//       };
//
//       xhttp.open("GET", "/signinbuttonclicked", true);
//       xhttp.send();
//     },
//     function () {
//       console.log("Storage access was denied.");
//     }
//   );
//
// }


window.addEventListener("message", receiveMessage, false);

