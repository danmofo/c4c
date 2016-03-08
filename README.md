Cards for Causes clone
===

This project consists of two things:
- **Server**, proxies requests to the real API (no CORS enabled)
- **Client**, an Angular 1.5 application

Running
---

- Make sure you have `base-project` checked out from [here](https://github.com/danmofo/base-project)
- Checkout this project to `/your/directory` and `npm install` for dependencies.
- Add your user cookies (`everyclick` and `gc`) to a file named `.cookie.json` in the following format: `{'cookies': 'myCookie="MyValue";'}, if you don't know how download Postman and import `server/postman.json` and visit the following items in the collection: `Charity homepage`, `Add Cineworld Card` (note the ID), `Delete item from basket` (using previous id). You should now have a `gc` cookie. Log in to get an `everyclick` cookie!
- Grunt commands
	- Development: Start Grunt (`grunt dev --no-tests --src=/your/directory`) and start a local http server (`http-server -p 3333`), visit `localhost:3333` in your browser.

Why?
---

I created this in my spare time as a demo for my colleagues, to demonstrate the power of using a JavaScript framework vs hand-rolling your own solution. Whilst a vast majority of time goes into API development, the front-end can also take a considerable amount of time, especially in fast-moving environments where requirements change often.

It also allows me to brush up on my Angular skills before the big Angular 2 release.