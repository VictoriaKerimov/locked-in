   const taskInput = document.getElementById("task");
   const saveButton = document.getElementById("save");
   const status = document.getElementById("status");

   // When the popup opens, show the saved task (if there is one)
   chrome.storage.local.get("task", (data) => {
     if (data.task) {
       taskInput.value = data.task;
       status.textContent = "Current task: " + data.task;
     }
   });

   // When the button is clicked, save the task
   saveButton.addEventListener("click", () => {
     const task = taskInput.value.trim();
     if (!task) {
       status.textContent = "Type a task first.";
       return;
     }
     chrome.storage.local.set({ task: task }, () => {
       status.textContent = "Saved: " + task;
     });
   });