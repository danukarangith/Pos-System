const hamBurger = document.querySelector(".toggle-btn");

hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});

function myFunction() {
  var element = document.body;
  element.dataset.bsTheme =
    element.dataset.bsTheme == "dark" ? "light" : "dark";
}