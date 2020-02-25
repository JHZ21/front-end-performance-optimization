if (navigator.serviceWorker) {
  const sendBtn = document.querySelector("#send-msg-button");
  const msgInput = document.querySelector("#msg-input");
  const msgBox = document.querySelector("#msg-box");

  sendBtn.addEventListener("click", function() {
    // 主页面发送信息到serviceworker
    navigator.serviceWorker.controller.postMessage(msgInput.value);
  });

  navigator.serviceWorker.addEventListener("message", event => {
    msgBox.innerHTML += `<li>${event.data.client} ${event.data.message}</li>`;
  });

  navigator.serviceWorker
    .register("./msgsw.js", {
      scope: "./"
    })
    .then(reg => {
      console.log(reg);
    })
    .catch(e => {
      console.log(e);
    });
} else {
  alert("Service Worker is not supported");
}
