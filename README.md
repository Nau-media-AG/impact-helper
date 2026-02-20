# Impact Helper Script

## Usage

### Recommended Method

The preferred way to include the Impact helper script is to reference it directly from the Impact CDN:

```html
<script src="https://impact.naudata.ch/embed" id="nau-impact-helper" async></script>
```

This ensures you always have the latest version with automatic updates and optimal performance.

### Alternative Method

Use this method to avoid unnecessary network requests. The script is only loaded on demand when a connector message is received, so pages without Impact embeds won't make any additional requests.

```html
<script>
addEventListener("message", (e) => {
  if (e.data?.type === "connector" && e.data?.name === "nau" && !document.getElementById("nau-impact-helper")) {
    document.head.appendChild(
      Object.assign(document.createElement("script"), {
        src: "https://impact.naudata.ch/embed",
        id: "nau-impact-helper",
      })
    );
  }
});
</script>
```

## Support

For questions or support regarding the Impact analytics platform, please contact Nau Media AG.
