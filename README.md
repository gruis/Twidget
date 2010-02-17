Twidget
==================
Twidget retrieves recent tweets from any user's public Twitter timeline, parses links, marks them up then places them in an element on the page.

![Screenshot](http://c5.simulacre.org/images/twidget/banner_200x100.png)


How to use
----------

1. Reference the Twidget module in your html page

            <script type="text/javascript" charset="utf-8" src="js/Twidget.js"></script>

2. Put an element into your HTML to hold/display the tweets

            <div id="tweets"></div>

3. Instantiate a Twidget object once the domready event has been fired:
        
            window.addEvent("domready", function(){
                new Twidget({ user: "mootools", count : "5" }); 
            });




Syntax
-----

    new Twidget([options]);
    
Arguments
---------

	1. options - (object, optional) the options described below:

Options
-------

* user      : (string)  The twitter username *defaults to* mootools
* count     : (number) The maximum number of tweets to retrieve. *defaults to* 5
* element   : (element) The container element in which to insert the tweets. *defaults to* $("tweets");

Events
-------
* request   : onRequest() - Fired when the request to twitter.com is executed
* cancel    : onCancel() - Fired if the request to twitter.com fails
* complete  : onComplete() - Fires after the tweets have been inserted into the page.


Default Markup
-----
* All @replies will be wrapped in anchor elements.
* All #hashtags will be wrapped in anchor elements.
* All http/https links will be wrapped in anchor elements.
* Each tweet will be wrapped in a p element with a "tweet" class
* The time/date, relative to now, of the tweet will be appended to the end of the tweet and wrapped in a  span element with a "when" class

Example
-------

    <p class="tweet">This is a <a href="http://search.twitter.com/search?q=%23tweet">#tweet</a> that mentions <a href="http://twitter.com/mootools">@mootools</a> <a href="http://mootools.net">http://mootools.net</a>.<span class="when">3 days ago</span></p>



Changing the Markup
-----

Changing Links
---------

If the [Tweetify](http://mootools.net/forge/p/tweetify) module is available Twidget will use it to construct the links, so change Tweetify if you have it installed. 

If Tweetify is not available Twidget will use its own internal method *linkify*. In that case simply extend Twidget and write your own *linkify* method.



Changing Wrapper Markup
---------

Twidget will wrap all links in a p element with a "tweet" class. The time/date, relative to now, when the tweet was created will be appended to the end of the tweet and wrapped in a span element with a "when" class.

The element described above are added by the internal *markup* method, so to change the markup, just extend Twidget and write your own *markup* method.


Known Issues
-----

[Retweets not included](http://apiwiki.twitter.com/Twitter-REST-API-Method:-statuses-user_timeline?SearchFor=user_timeline&sp=1)


Demo
-----
<http://www.simulacre.org/twidget>