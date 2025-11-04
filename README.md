# impact-helper

This repository automatically downloads and stores the Impact helper script from https://impact.naudata.ch/embed.

## Automated Updates

The `helper.js` file is automatically updated daily via GitHub Actions workflow. The workflow:
- Runs once per day at midnight UTC
- Downloads the latest script from impact.naudata.ch/embed
- Commits and pushes any changes to the repository

You can also trigger the workflow manually from the Actions tab.
