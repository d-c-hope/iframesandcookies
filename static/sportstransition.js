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

var signiniframe = '<iframe src = "https://myskyid.mysky.com/signin" width = "555" height = "200" sandbox="allow-storage-access-by-user-activation \
                 allow-scripts \
                  allow-same-origin"> \
         Sorry your browser does not support inline frames. \
      </iframe>'

function receiveMessage(event) {
    console.log("event" + event);
    if (event.data.event === "signinclicked") {
        console.log("Sign in clicked")
        console.log("email in sportstransition was " + event.data.data.email)
        skysigninclicked()
        // window.location = "/signincompleted";
    }
    return;
}


function skysigninclicked() {
    console.log("sports transition window localstorage email is " + localStorage.getItem("email"))
    accessRequest()
    // window.location.href = "https://myskyid.mysky.com/authenticate";
    // window.location.href = "https://myskyid.mysky.com/authenticate";
    // document.getElementById('iframeparentdiv').innerHTML =  signiniframe;
}

window.onload = function() {
    console.log("sports transition window localstorage email is " + localStorage.getItem("email"))
    checkAccess();
}

// does do a lot, think it was more useful before cookies were always blocked by default
function checkAccess() {
    var promise = document.hasStorageAccess();
    promise.then(
        function (hasAccess) {
            console.log("Has access ")
            // var xhttp = new XMLHttpRequest();
            // xhttp.onreadystatechange = function() {};
            //
            // xhttp.open("GET", "", true);
            // xhttp.send();
        },
        function (reason) {
            console.log("Failed to get access " + reason)
        }
    );
}

function accessRequest() {

  var promise = document.requestStorageAccess();
  promise.then(
    function () {
      console.log("sportstransition.js: Storage access was granted");
      document.getElementById('iframeparentdiv').innerHTML =  signiniframe;
      document.getElementById('buttoniframe').innerHTML =  null;
      // var xhttp = new XMLHttpRequest();
      // xhttp.onreadystatechange = function() {
      //     // if (this.readyState == 4 && this.status == 200) {
      //     //   onDone();
      //     // }
      // };
      //
      // xhttp.open("GET", "", true);
      // xhttp.send();
    },
    function () {
      console.log("Storage access was denied.");
    }
  );

}


window.addEventListener("message", receiveMessage, false);

