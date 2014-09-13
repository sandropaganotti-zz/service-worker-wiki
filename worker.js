importScripts('idb.js');

function getDB() {
  return new IDBHelper('sw-wiki', 1, function(db, oldVersion) {
    if (oldVersion < 1) {
      db.createObjectStore('pages');
    }
  });
}

this.addEventListener('install', function(event) {
  event.waitUntil(getDB().ready);
});

this.addEventListener('fetch', function(e) {
  var idb = getDB();

  e.respondWith(
    new Promise(function(resolve) {
      if(/\/savepage\?/.test(e.request.url)){
          var params = e.request.url.match(/\?(.+)$/)[1].split("&");
          var req_url = decodeURIComponent(params[0].split("=")[1]);
          var req_body = decodeURI(params[1].split("=")[1]).replace(/\+/g," ");
          resolve(
            idb.put('pages', req_url, req_body).then(function() {
              return "<h2>done!</h2>";
            })
          );
      }else{
        resolve(
          idb.get('pages', e.request.url).then(function(blobHTML) {
            if (blobHTML) {
              return blobHTML;
            }
            return "<h2>New page</h2><form action='./savepage'><input name='url' " +
                   "value='"+e.request.url+"' readonly><br/><textarea rows='10' cols='50'" +
                   "name='body'></textarea><br/><input type='submit'></form>";
          })
        );
      }
    }).then(function(blobHTML) {
      var i = 0;

      return idb.each('pages', function(data, url) {
        if(i===0) blobHTML += "<h2>Existing Pages</h2>";
        blobHTML += "<a href='"+url+"'>"+url+"</a><br/>";
        i++;
      }).then(function() {
        return blobHTML;
      });
    }).then(function(blobHTML) {
      blobHTML += "<h2>Create a new page</h2>";
      blobHTML += "Point the browser to a new URL within this domain";

      blobHTML += "<h2>Remove the service worker</h2>";
      blobHTML += "Visit: chrome://serviceworker-internals/";

      return new Response(new Blob([blobHTML], {type : 'text/html'}), {
        headers: {"Content-Type": "text/html"}
      });
    })
  );
}.bind(this));
