const params = new URLSearchParams(location.search);
const target = params.get("url");
const taskEl = document.getElementById("task");
const siteEl = document.getElementById("site");
chrome.storage.local.get("task", (data) => {
	taskEl.textContent = data.task;
});
siteEl.textContent = target ? new URL(target).hostname : "(unknown)";