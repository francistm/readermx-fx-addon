if(typeof ReaderMX == "undefined") {
    var ReaderMX = {};
}

ReaderMX.Overlay = {

    "Add" : function(e) {
        let post = {
            "win" : content,
            "document" : content.document,
        };

        let parsedPost = ReaderMX.Lib.AddPost(post);

        $.ajax("https://reader.mx/accounts/isLogged", {
            "type" : "GET",
            "cache" : false,
            "dataType" : "JSON",
            "success" : function(res) {

                if("false" == res.logged) {
                    content.location.href = "https://reader.mx/accounts/login?next=" + content.location.href;

                }else {
                    alert(parsedPost._title);
                    alert(parsedPost._content);
                    alert(parsedPost._base_url);
                    /*
                    $.ajax("https://reader.mx/collect/insertData", {
                        "type" : "POST",
                        "cache" : false,
                        "data" : {
                            "url" : content.location.href,
                            "title" : parsedPost._title,
                            "content" : parsedPost._content,
                            "base_url" : parsedPost._base_url,
                        },
                        "success" : function(res) {
                            $(e.target).removeClass("loading");
                        }
                    });
                    */
                }
            }
        });

        $(e.target).addClass("loading");
    }

}

window.addEventListener("load", function(e) {
    Components.classes["@mozilla.org/moz/jssubscript-loader;1"].
    getService(Components.interfaces.mozIJSSubScriptLoader).
    loadSubScript("chrome://myextension/content/libs/jquery.js");
}, false);
