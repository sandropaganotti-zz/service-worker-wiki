Service Worker Wiki
===================

Service Workers are basically like Shared Web Workers with some interesting 
extra abilities, one of them is that they can intercept all the http request 
leaving from all the documents of the same domain of the Service Worker itself.

This basically transform this technology in an awesome way to have a proxy between 
our document and the server, the main pourpose is, of course, to allow developers 
to design how the application should behave when there is no connectivity. 

But there are other, maybe less conventional, ways to take advantage of this technology,
one of them is shown here: a Wiki engine that leverage on the power of a Service Worker 
to allow the user to create their own pages. 

This, is only a Proof-of-concept but it might be useful to better understand the dynamics, and the possibilities, of this technology. 

Kudos to +jakearchibald for IndexedDB support.

Working Demo
============

You can experiment this POC here: [https://sandropaganotti.github.io/service-worker-wiki/](https://sandropaganotti.github.io/service-worker-wiki/)