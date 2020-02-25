self.addEventListener("message", event => {
    const promise = self.clients.matchAll().then( clientList => {
        const senderID = event.source? event.source.id : "unknown";
        clientList.forEach(client => {
            if (client.id === senderID) {
                return ;
            } else {
                client.postMessage({
                    client: senderID,
                    message: event.data
                })
            }
        });
    })
    event.waitUntil(promise)
})