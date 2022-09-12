browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
server-->browser: HTTP-302 (redirect)
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
server-->browser: HTML with CSS and JS information included
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
server-->browser: main.js
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: data.json (note content)

note over server:
On server, the POST Request is consumed thusly:
app.post('/new_note', (req, res) => {
notes.push({
content: req.body.note,
date: new Date(),
})

return res.redirect('/notes')
})
end note

note over server:
Data is sent as the body of the POST-request.
The server creates a new note object, and adds it to an array called notes.

notes.push({
content: req.body.note,
date: new Date(),
})
end note
