import { sanitizeInput } from "./utils";
import { snackbar } from "./snackbar";

function handleSubmit(event) {
  event.preventDefault();
  snackbar();
  const formText = document.getElementById("url").value;
  const data = sanitizeInput(formText);
  return fetch("https://nlp-1.herokuapp.com/nlp", {
    method: "POST",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(res => {
    const { text = "", language = "", categories = [] } = res.response;
    categories.forEach((category, index) => {
      document.getElementById("confidence").innerHTML = `<span>Confidence</span>: - ${category.confidence}`;
      document.getElementById("subject").innerHTML = `<span>Subjectivity</span>: - ${category.label}`;
      document.getElementById("code").innerHTML = `<span>Code</span>: - ${category.code}`;
    });

    document.getElementById("lang").innerHTML = `<span>Language</span>: - ${language}`;
    document.getElementById("text").innerHTML = `<span>News</span>: - ${text}`;

    return res;
  })
  .catch(error => snackbar(error.message ? error.message : "Error!"));
}

export { handleSubmit };
