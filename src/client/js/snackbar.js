function snackbar(text) {
  const x = document.getElementById("snackbar");
  x.innerHTML = text ? text : "Processing...";
  x.className = "show";
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 3000);
  return x;
}
export { snackbar };