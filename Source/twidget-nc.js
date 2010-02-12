/*
---
description: Retrieve recent tweets from Twitter, parse links, mark them up then place them in an element on the page.
 
license: MIT-style
 
authors:
- Caleb Crane
 
requires:
  more/1.2.4: 'Date.Extras, Request.JSONP'
 
provides:
  - Twidget
 
...
*/
var Twidget = new Class({
    Implements: [Options, Events],
    options: {
        user : "mootools",
        element: "tweets", 
        count: 5
    }, 
    toElement: function(){ return $(this.options.element); }, 
    initialize: function(options){
        my = this;
        my.setOptions(options);
        my.element = $(my.options.element);
        try { $(my) }catch(e){ (typeof console == "object") && console.error("Twidget element not found"); return; }
       
        my.getTweets();
    }, 
    getTweets: function(){
        new Request.JSONP({
            url: "http://twitter.com/statuses/user_timeline/"+my.options.user+".json",
            data: { count: my.options.count }, 
            onComplete: my.procTweets.bind(my),
            onRequest: function(){ this.fireEvent("request"); }.bind(my),
            onCancel: function(){ this.fireEvent("cancel"); }.bind(my),
            timeout: 5000
        }).send();        
    },
    procTweets: function(o,req){
    	if(!o[0])
    	    return;

        var twtfd;
    	var txt = "";
    	
    	for(var i = 0; i < o.length; i++){
            if(!o[i] || !o[i].text)
                break;

    		var c = new Date(o[i].created_at);
    		try{
                p = !c ? "" : c.timeDiffInWords();		    
    		}catch(e){
    		    p = o[i].created_at;
    		}
            
    		lnkfd = (typeof String.tweetify == "function") ? o[i].text.tweetify() : this.linkify(o[i].text);
    		txt += this.markup(lnkfd,p);
    	}
    	
        this.showTweets(txt).fireEvent("complete");
    },
    markup: function(tweet,when){
            return '<p class="tweet">' + tweet.replace("\n","<br />") + ' <span class="when">'+ when +'</span></p>';
    },
    
    // include a permalink to the tweet? http://twitter.com/calebcrane/status/8907053176
    linkify: function(txt){
            return txt.replace(/(https?:\/\/\S+)/gi,"<a href=\"$1\">$1</a> ").replace(/(^|\s|\(|\[)@(\w+)/g,'$1<a href="http://twitter.com/$2">@$2</a>').replace(/(^|\s)#(\S+)/g,'$1<a href="http://search.twitter.com/search?q=%23$2">#$2</a>');
    },
    showTweets: function(tweets){
		$(this).set("html",tweets);
		
		return this;
    }
});