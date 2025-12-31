# Seek

Completely free, private, and secure secure search engine by [QueerWeb](https://queerweb.org/)

Uses Brave Search API for results. No accounts, ads, or tracking. Searches are hidden from browser history.

## Deploying

We provide a Dockerfile for easy deploying. You can also deploy manually:

```bash
cd src
npm i
cp example.env .env
npm run start
```
## Repo Structure

- /src: Search engine WebApp.
- /extension: Browser extension to set default search engine.

