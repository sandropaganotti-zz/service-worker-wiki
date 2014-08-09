this.storedURLs = {};

this.addEventListener('fetch', function(e) {
  var blobHTML;
  
  if(/\/savepage\?/.test(e.request.url)){
      var params = e.request.url.match(/\?(.+)$/)[1].split("&");
      var req_url = decodeURIComponent(params[0].split("=")[1]);
      var req_body = decodeURI(params[1].split("=")[1]).replace(/\+/g," ");
      this.storedURLs[req_url] = req_body;
      blobHTML = "<h2>done!</h2>";    
  }else{
    if(this.storedURLs[e.request.url]){
      blobHTML = this.storedURLs[e.request.url];
    }else {
      blobHTML = "<h2>New page</h2><form action='/savepage'><input name='url' " + 
                 "value='"+e.request.url+"' readonly><br/><textarea rows='30' cols='80'" +
                 "name='body' required></textarea><br/><input type='submit'></form>";
    }
  }

  Object.keys(this.storedURLs).forEach(function (url,i) {
    if(i===0) blobHTML += "<h2>Existing Pages</h2>";
    blobHTML += "<a href='"+url+"'>"+url+"</a><br/>";
  });
  
  blobHTML += "<h2>Create a new page</h2>"
  blobHTML += "Point the browser to a new URL within this domain";
  
  blobHTML += "<h2>Remove the service worker</h2>"
  blobHTML += "Visit: chrome://serviceworker-internals/";

  e.respondWith(new Response(new Blob([blobHTML], {type : 'text/html'}), {
    headers: {"Content-Type": "text/html"}
  }));

}.bind(this));