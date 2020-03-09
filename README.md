#### Project 1

# Pandemic UI  
## https://apatel922.github.io/Project1/

<br>

## User Story:
#### Who

As an investor, I want to know what areas of the world are afflicted by the spread of disease, so I can look after my investments.

As a frequent flier (pleasure or business), I want to be able to safely plan my travels abroad.

#### What

Pandemic UI is an application that offers general health statistics by continent & delivers articles through its search function.

#### Why

We want to provide our end-users with current information on all potentially pandemic diseases , allowing them to make more educated decisions in their personal and professional lives.

<br>
<br>

---

<br>

## APIs
#### 1) Web GL Earth API

Web GL Earth is an independent map API. The version of the map we used allowed us to add interactive markers, containing information pertinent to the location of the marker, to the globe. The map is interactive, as it the user can click on markers to display and hide information; rotate the globe and zoom in and out.

<br>

#### 2) Corona-virus Tracker API
We were able to find an API that was built to track statistics (e.g confirmed cases, confirmed deaths, etc.) on the Corona-Virus Pandemic. The API's source of information comes directly from the CDC and is updated daily. We created for loops to cyle through the object within the API array to gather relevent information on countries like Italy, USA, China and Iran. The information gathered is displayed in the markers found at the locations outlined on the Web GL Earth.

<br>

#### 3) News API (newsapi.org)
We didnt feel that the map API or the Corona-Virus tracker API were sufficient enough for this project. Therefore we found an additional API to gather the Top Corona-Virus Headlines for Great Britain, USA, India, and Italy. Each country listed has their own individual button and when the button is pressed by a user a function is called to return the top articles that relate to that country. The articles cards displayed have been built dynamically in jQuery.

<br>

#### 4) Moment.js and jQuery

<br>

---

<br>


## CSS Framework
#### Semantic UI

We chose to use Semantic UI as our CSS framework.  Ramp up time felt a bit more complicated than Bootstrap.  The NPM install package was returning an error, so we had to download and host the library locally.  

Past the installation stage though, the first thing we noticed was that Semantic UI's language was much easier to comprehend in the HTML as opposed to Bootstrap.  
```

// Article container
<div class="ui middle aligned stackable grid container">

```

Granted, their CSS callouts are a bit on the wordy side, but it's clear exactly what my columns will do at breakpoints inside this div.  We used this div to house the article cards generated in our for-loop.

Overall, Semantic UI was a pretty strong framework with tons of utility that would take much more time to properly explore.  In the future, it would be a good idea to take the time to learn their preprocessing tools, especially after using an API as heavy as Web GL Earth.

<br>

---

<br>

## UI Layout
#### The Globe


Every design choice was made with the Web GL Earth API at the center.  It's so visually striking that if you can make it stand out, then your site will also stand out by extension.  

The Earth API loads in on a canvas that has a locked aspect ratio.  When we tried resizing the earth_div, it was warping the globe.  This meant that the canvas would have to be 100% width to make sure that it would still be legible at the smallest mobile breakpoint.

The space background on the earth_div was a fun touch that elevates the quality of user engagement.  We also added a bit of code that allows that background to react to inversely to mouse location.  This reaction is not 1px to 1px, but 1px to 15px, basically meaning that the background moves a fraction of what the mouse moves.  This gives an interesting feeling of depth.
```

    // Moving Space backg by mouse location
    var forcePush = document.querySelector("#mainBlock");

    forcePush.addEventListener("mousemove", function(e) {
        forcePush.style.backgroundPositionX = (-e.offsetX / 15) + "px";
        forcePush.style.backgroundPositionY = (-e.offsetY / 15) + "px";
    });
    
``` 
![](assets\css\globe.gif)

---

<br>

#### The News Feed

We chose the News API to pull content into our feed.  Since our subject matter is on a global level, it only made sense to find something that also pulled information on a global scale.  

Before actually pulling any content though, we had to style a card that would house an article.  
```

<div id="div2" class="ui fluid card articleCard">
    <div id="div3" class="content">
        <h3 id="header"></h3>
        <div id="div4" class="ui divider"></div>
        <p id="description" class="artDesc"></p>
        <p  id="author"></p>
        <div id="div5" class="ui divider"></div>
        <p id="url"></p>
    </div>
</div>

```
Once this layout was dialed in, we were able to construct our for-loop.  Inside the loop, the first thing we declared were variables for article title, description, url, and author.
```

var article=response.articles[i].description
var title=response.articles[i].title
var url=response.articles[i].url
var author=response.articles[i].author

```
Next, we recreated the divs that made up our target state card and added the correct IDs and classes, so they would pull in the correct styles from the stylesheet on creation.  Here, you can see how we made the div for the main card and added classes and ID. 
```

var div2 = $("<div>");
div2.addClass("ui fluid card articleCard");
div2.attr("id", "div2");

```
Last, we appended all of our created divs, so they would inherit the correct hierarchy of elements within the card.
```

div1.append(div2);
div2.append(div3);
div3.append(h3,div4,p1,p2,div5,p3)
$("#articleContainer").append(div1)

```
This yielded a long, scrolling page, but it didn't emphasize the globe as the page's focus since it gets lost when the user scrolls down through the articles.  We solved this by giving the #articleContainer a fixed height and overflow: auto.

The last consideration in our site's design was interaction.  We created user involvement with a button group that filters the article feed by location.  In the gif above, you can see how clicking one of these buttons will list articles relevant to that location (in this case, Great Britain).   


![](assets\css\articleFeed.gif)

