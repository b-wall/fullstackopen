browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
server-->browser: HTML
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
server-->browser: spa.js

note over browser:
browser executes the JavaScript code
it fetched from the server to in turn
fetch the JSON-data.
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server->browser: {content: "foo"}

note over browser:
Notes are then rendered
end note
