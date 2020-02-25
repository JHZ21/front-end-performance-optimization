if (navigator.serviceWorker) {
    navigator.serviceWorker
      .register("./service-worker.js", {
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