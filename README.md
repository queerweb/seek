# Seek

Completely free, private, and secure secure search engine by [QueerWeb](https://queerweb.org/)

Uses Brave Search API for results. No accounts, ads, or tracking. Searches are hidden from browser history.

## Installation
### Chrome
Go to ```chrome://settings/searchEngines```
Scroll down to ```Site Search``` and click ```add```
<img width="722" height="362" alt="image" src="https://github.com/user-attachments/assets/cedbc067-e43c-48c1-a605-c0302a14c808" />

Fill in the fields like so:
Name: ```Seek```
Shortcut: ```seek.gay```
URL: ```https://seek.gay/search?q=%s```
<img width="501" height="349" alt="image" src="https://github.com/user-attachments/assets/b507713f-02b6-4b57-a05b-d56acf661231" />

Click the three dots on the right of Seek and select ```Make default```

<img width="119" height="116" alt="image" src="https://github.com/user-attachments/assets/0ec1dd46-69af-4769-ab69-15e853f8a5c7" />

### Firefox
Go to ```about:preferences#search```
Scroll down to ```Search Shortcuts```
Click ```Add```

<img width="680" height="501" alt="image" src="https://github.com/user-attachments/assets/0db69d02-7240-4608-abf2-5b3aacddfcff" />

Fill in the fields like so:
Search engine name: ```Seek```
  URL: ```https://seek.gay/search?q=%s```
Keyword (optional): ```@seek```

<img width="579" height="423" alt="image" src="https://github.com/user-attachments/assets/0c66e9f4-3035-4492-aa26-fc9738c739cd" />

Now click ```Add Engine```

<img width="579" height="423" alt="image" src="https://github.com/user-attachments/assets/39e83524-33a1-4268-aef2-ce1a645f620a" />

Navigate to ```Default Search Engine```
Select seek as the default like so.

<img width="598" height="360" alt="image" src="https://github.com/user-attachments/assets/cd814494-259e-491d-8bc5-989f4e5b1840" />

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

