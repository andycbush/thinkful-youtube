//AIzaSyBk2B54e9YaZayIpDa-Mgoro8JLpiYtiao

$(document).ready(function () {

    //Step 1 - get the input from the user
    $("#search-form").submit(function (event) {
        event.preventDefault();
        getResults($("#query").val());
    });

    //Step 2 - using the input from the user (query) make the API call to get the JSON response
    function getResults(query) {
        $.getJSON("https://www.googleapis.com/youtube/v3/search", {
                part: "snippet", //youtube API special parameter (please check documentation here https://developers.google.com/youtubme/)
                maxResults: 20, //number of results per page
                key: "AIzaSyBk2B54e9YaZayIpDa-Mgoro8JLpiYtiao",
                q: query, //search query from the user
                type: "video" //only return videos (no channels or playlists) so we can take the video ID and link it back to Youtube
            },
            function (data) {
                //show the sjon array received from the API call
                console.log(data);
                //if ther are no results it will just empty the list
                if (data.pageInfo.totalResults == 0) {
                    alert("No videos found!");
                }
                //if there are results, call the displaySearchResults
                displaySearchResults(data.items);
            }
        );
    }

    //Step 3 - using the JSON response (videos), populate the relevant part of your HTML with the variable inside the JSON
    function displaySearchResults(videos) {
        var buildTheHtmlOutput = "";

        $.each(videos, function (index, video) {
            //concatenate the results inside the HTML variable
            buildTheHtmlOutput += "<li>";
            buildTheHtmlOutput += "<p>" + video.snippet.title + "</p>"; //output video title
            buildTheHtmlOutput += "<a href='https://www.youtube.com/watch?v=" + video.id.videoId + "' target='_blank'>"; //target blank is going to open video in a new window
            buildTheHtmlOutput += "<img src='" + video.snippet.thumbnails.high.url + "'/>"; //display the video's thumbnail
            buildTheHtmlOutput += "</a>";
            buildTheHtmlOutput += "</li>";
        });

        //use the HTML ouput to show it in the index.html
        $("#search-results ul").html(buildTheHtmlOutput);
    }

}); //end ready
