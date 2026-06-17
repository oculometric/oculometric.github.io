function generateHeader() {
  var z, i, elmnt, file, xhttp;
  
  var b = document.getElementsByTagName("body");
  elmnt = b[0];
  var title = elmnt.getAttribute("title");
  if (!title) title = "0xCA55E77E";
    elmnt.innerHTML = "<br>\
    <header style=\"justify-content: space-between; align-items: center; background-color: var(--lighterblack);\">\
        <span style=\"background-color: transparent;\">\
            <span style=\"color:var(--carmine);\">[</span>\
            cassette - portfolio\
            <span style=\"color:var(--carmine);\">]</span>\
        </span>\
        <span style=\"float: right;\">\
            <span style=\"color:var(--carmine);\">[</span>\
            " + title + "\
            <span style=\"color:var(--carmine);\">]</span>\
        </span>\
    </header>\
    <br>" + elmnt.innerHTML;
}

generateHeader();