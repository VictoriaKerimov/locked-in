chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
	if (details.frameId !== 0) return;
	if (!details.url.startsWith("http")) return;
	const { enabled, task, passes = {} } = await chrome.storage.local.get(["enabled", "task", "passes"]);
	if (!enabled || !task) return;
	const host = new URL(details.url).hostname;
   	if (passes[host] && passes[host] > Date.now()) return;
	const whyPage = chrome.runtime.getURL("why.html") + "?url=" + encodeURIComponent(details.url);
	chrome.tabs.update(details.tabId, { url: whyPage });
});