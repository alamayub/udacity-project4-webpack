import { snackbar } from "./snackbar";
function sanitizeInput(text) {
  const httpsChecker = /^(http\:\/\/|https\:\/\/)?([a-z0-9][a-z0-9\-]*\.)+[a-z0-9][a-z0-9\-]*/;
  let type = "text";
  if (!text) return snackbar("Please enter a news article url");
  if (httpsChecker.test(text)) {
    type = "url";
  }
  let response = 'Please wait, data is being fatched...';
  snackbar(response);
  return { type, text };
}
export { sanitizeInput };