note over browser:
Upon click, the event listener prevents
the default GET request upon submitting a form.
Instead, it adds a new note using
notes.push(note) to render browser side.
To do this, it uses the intital
Javascript code it fetched from the server.
end note

note over server:
The event listener also sends
the new note contents to the server
(detailed below) in JSON format.
end note

browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
browser->server:{content: "single page app does not reload the whole page", date: "2019-05-25T15:15:59.905Z"}
server-->browser: response, HTTP 201 (created)
