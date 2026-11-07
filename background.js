// Log every page navigation, to see that the listener works
chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
	if (details.frameId !== 0) return;
	if (!details.url.startsWith("http")) return;
	const { enabled, task } = await chrome.storage.local.get(["enabled", "task"]);
	if (!enabled || !task) return;
	console.log("navigating to", details.url);
});