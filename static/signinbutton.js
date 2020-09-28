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
    // console.log("event" + event);
    // if (event.data === "complete") {
    //     window.location = "/signincompleted";
    // }
    // return;
}


function skysigninclicked(element) {
    // window.location.href = "https://myskyid.mysky.com/authenticate";
    // window.location.href = "https://myskyid.mysky.com/authenticate";
    accessRequest()
    // window.parent.postMessage("signinclicked", "*");
}

window.onload = function() {
    checkAccess();
}

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

function accessRequest(element) {

  var promise = document.requestStorageAccess();
  promise.then(
    function () {
      console.log("Storage access was granted");
      console.log("posting message")

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              var email = JSON.parse(this.response).email
              console.log("email was " + email)
              // var ifr = window.parent.document.getElementById('coordinator');
              var frames = window.parent.frames;
              for (let i = 0; i < frames.length; i++) {
                  console.log("Post in sign in button " + i)
                frames[i].postMessage({"event":"signinclicked", "data" : {"email": email}}, "https://myskyid.myskysports.com");
              }
              // so it can respond, don't need to pass it the email necessarily
              window.parent.postMessage({"event":"signinclicked", "data" : {"email": email}}, "*");
          }
      };

      xhttp.open("GET", "/signinbuttonclicked", true);
      xhttp.send();
    },
    function () {
      console.log("Storage access was denied.");
    }
  );

}


window.addEventListener("message", receiveMessage, false);

