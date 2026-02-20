# Impact Helper Script

## Usage

### Recommended Method

The preferred way to include the Impact helper script is to reference it directly from the Impact CDN:

```html
<script src="https://impact.naudata.ch/embed"></script>
```

This ensures you always have the latest version with automatic updates and optimal performance.

### Alternative Method (Not Recommended)

If you need to self-host the script, you can copy the following code and include it in your project. However, this method is **not recommended** because:

- You won't receive automatic updates
- You're responsible for manually updating the script
- You may miss important bug fixes and new features

<!-- BEGIN HELPER SCRIPT -->
```html
<script>
(() => {
  const helperVersion = "1.2.1";

  const sendAvailable = () => {
    [...document.getElementsByTagName("iframe")].forEach((el) =>
      el.contentWindow.postMessage({ type: "embed-available" }, "*"),
    );
  };

  const error = (id) => {
    fetch("https://api.nau.ch/logging/impact/log/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        level: "error",
        message: String(id),
        origin: window.location.origin,
        user_agent: navigator.userAgent,
        referrer: document.referrer,
      }),
    });
    throw new Error(id + "");
  };

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

    const embedWindow = window;
    try {
      window.top.addEventListener("message", (data) => {
        if (data?.data?.type === "nau-v-show") {
          window._nau_vid_frame = data.source;
          load(embedWindow.document, data.data.clicktag, data.data.campaign);
        }
        if (data?.data?.type === "connector" && data?.data?.name === "nau") {
          sendAvailable();
        }
      });
      console.info("[Nau Impact] Helper loaded");
    } catch (err) {
      error("4: " + err);
    }
  };

  window.nauImpact = window.nauImpact || {};
  if(window.nauImpact.helperLoaded) return;
  window.nauImpact.helperLoaded = true;
  window.nauImpact.helperVersion = helperVersion;
  mount();
})();
</script>
```
<!-- END HELPER SCRIPT -->

## Support

For questions or support regarding the Impact analytics platform, please contact Nau Media AG.
