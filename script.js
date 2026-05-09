const pages = Array.from(document.querySelectorAll(".page"));
const tabs = Array.from(document.querySelectorAll(".tab"));
const prevButton = document.getElementById("prevPage");
const nextButton = document.getElementById("nextPage");
const backgroundSong = document.getElementById("backgroundSong");
let currentPage = 0;
let musicRequested = false;

function showPage(index) {
  currentPage = (index + pages.length) % pages.length;
  window.scrollTo(0, 0);

  pages.forEach((page, pageIndex) => {
    page.classList.toggle("before", pageIndex < currentPage);
    page.classList.toggle("after", pageIndex > currentPage);
    page.classList.toggle("active", pageIndex === currentPage);
  });

  tabs.forEach((tab) => {
    tab.classList.toggle("active", Number(tab.dataset.target) === currentPage);
  });
}

prevButton.addEventListener("click", () => showPage(currentPage - 1));
nextButton.addEventListener("click", () => showPage(currentPage + 1));

tabs.forEach((tab) => {
  tab.addEventListener("click", () => showPage(Number(tab.dataset.target)));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") showPage(currentPage - 1);
  if (event.key === "ArrowRight") showPage(currentPage + 1);
  if (event.key === "ArrowUp") showPage(currentPage - 1);
  if (event.key === "ArrowDown") showPage(currentPage + 1);
});

function requestAmbientMusic() {
  if (musicRequested) return;
  musicRequested = true;
  backgroundSong.volume = 0.35;
  backgroundSong.play().catch(() => {
    musicRequested = false;
  });
}

document.addEventListener("pointerdown", requestAmbientMusic, { once: true });
document.addEventListener("keydown", requestAmbientMusic, { once: true });

showPage(0);
