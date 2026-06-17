function checkHTMLIncludes() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) { elmnt.innerHTML = this.responseText; }
          if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          checkHTMLIncludes();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }

    // var meta = elmnt.getAttribute("cass-generate-meta");
    // if (meta) {
    //   var image = elmnt.getAttribute("image");
    //   if (image) {
    //     elmnt.removeAttribute("image");
    //   }
    //   else {
    //     image = "https://cassette.graphics/projects/asha/asha.jpg";
    //   }
    //   var description = elmnt.getAttribute("description");
    //   if (description) {
    //     elmnt.removeAttribute("description");
    //   }

    //   const url = new URL(document.URL);
    //   const rel = url.toString().substring(url.origin.length);
    //   const path = url.pathname;
    //   const canonical = "https://cassette.graphics" + path;

    //   // construct new html
    //   elmnt.innerHTML = elmnt.innerHTML +
    //     "<title>cassette - " + meta + "</title>\
    // <meta name=\"theme-color\" content=\"#FF9900\" data-react-helmet=\"true\" />\
    // <meta name=\"og:title\" content=\"cassette - " + meta + "\" />\
    // <meta name=\"og:url\" content=\"" + canonical + "\" />\
    // <meta name=\"og:description\" content=\"" + description + "\" />\
    // <meta name=\"description\" content=\"" + description + "\" />\
    // <meta name=\"keywords\" content=\"Art, Technical Art, Programming, C++, Graphics, Rendering, Digital Art\"/>\
    // <meta name=\"author\" content=\"Casstte Costen\" />\
    // <meta name=\"og:image\" content=\"" + image + "\" />\
    // <meta name=\"twitter:card\" content=\"" + image + "\" />";
    //   elmnt.removeAttribute("cass-generate-meta");
    // }
  }
}