(() => {
  const load = async (doc, clicktag, campaign) => {
    try {
      const res = await fetch(
        `https://impact.naudata.ch/${campaign}?b=${(() => {
          let a = navigator.userAgent;
          let i = a.indexOf("Chrome/");
          if (i < 0) return "c";
          let o = a.indexOf(" ", i);
          const c = a.substring(i + 7, o);
          return parseInt(c) >= 115 ? "m" : "c";
        })()}`,
      );
      const script = doc.createElement("script");
      script.setAttribute("type", "module");
      script.dataset["clicktag"] = clicktag;
      script.classList.add("nau-vid-d");
      script.id = "nau-videohead";
      script.innerHTML = await res.text();
      doc.head.appendChild(script);
    } catch (err) {
      console.error(err);
      console.error(2);
    }
  };
  const mount = () => {
    sendAvailable();

    try {
      const doc = window.top.document;
      window.addEventListener("message", (data) => {
        if (data?.data?.type === "nau-v-show") {
          window._nau_vid_frame = data.source;
          load(doc, data.data.clicktag, data.data.campaign);
        }
        if (data?.data?.type === "connector" && data?.data?.name === "nau") {
          sendAvailable();
        }
      });
      console.log("embed");
    } catch (err) {
      error("4: " + err);
    }
  };

  mount();
})();

function sendAvailable() {
  [...document.getElementsByTagName("iframe")].forEach((el) =>
    el.contentWindow.postMessage({ type: "embed-available" }, "*"),
  );
}

function error(id) {
  fetch("https://api.nau.ch/logging/impact/log/", {
    method: "POST",
    body: JSON.stringify({
      level: "error",
      message: id,
      origin: window.location.origin,
      user_agent: navigator.userAgent,
      referrer: document.referrer,
    }),
  });
  throw new Error(id + "");
}
