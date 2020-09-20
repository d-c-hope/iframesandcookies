function doReturn() {
    console.log("trying to return control");
    window.opener.postMessage("complete", "*");
    window.close();
}

// window.location="https://www.facebook.com/v5.0/dialog/oauth?client_id=230935611239176&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fdone";
window.location="https://www.facebook.com/v5.0/dialog/oauth?client_id=575517649703525&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fdone";
