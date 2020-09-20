function doReturn() {
    console.log("trying to return control");
    window.opener.postMessage("complete", "*");
    window.close();
}

doReturn();