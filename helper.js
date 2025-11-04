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
      script.id = "nau-videohead";
      script.innerHTML = await res.text();
      doc.head.appendChild(script);
    } catch (err) {
      console.error(err);
      console.error(2);
    }
  };
  const mount = () => {
    try {
      const doc = window.top.document;
      window.addEventListener("message", (data) => {
        if (data?.data?.type !== "nau-v-show") return;
        window._nau_vid_frame = data.source;
        load(doc, data.data.clicktag, data.data.campaign);
      });
      console.log("embed");
    } catch (err) {
      console.error(err);
      console.log("embed crash");
    }
  };

  mount();
})();
