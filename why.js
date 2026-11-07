const params = new URLSearchParams(location.search);
const target = params.get("url");
const taskEl = document.getElementById("task");
const siteEl = document.getElementById("site");
const reasonEl = document.getElementById("reason");
const goButton = document.getElementById("go");
const message = document.getElementById("message");
chrome.storage.local.get("task", (data) => {
	taskEl.textContent = data.task;
});
siteEl.textContent = target ? new URL(target).hostname : "(unknown)";
async function isValidReason(reason) {
	return reason.length > 0;
}
goButton.addEventListener("click", async () => {
	const reason = reasonEl.value.trim();
	if (!(await isValidReason(reason))) {
		message.textContent = "That doesn't look like a good reason. Be specific.";
		return;
	}
	if (!target) return;
	const host = new URL(target).hostname;
	const { passes = {} } = await chrome.storage.local.get("passes");
	passes[host] = Date.now() + 15 * 60 * 1000;
	await chrome.storage.local.set({ passes });
	window.location.href = target;
});
