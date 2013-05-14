if(typeof ReaderMX == "undefined") {
    var ReaderMX = {};
}

ReaderMX.Overlay = {

    "Add" : function(e) {
        let post = {
            "win" : content,
            "document" : content.document,
        };

        let parsedPost = ReaderMX.Lib.addPost(post);

        parsedPost._url = content.location.href;

        $.ajax("https://reader.mx/accounts/isLogged", {
            "dataType" : "jsonp",
            "jsonp" : "jsoncallback",
            "beforeSend" : function() {
                $(e.target).addClass("loading");
            },
            "error" : function(xhr, stat, error) {
                alert("添加到ReaderMX失败");
                $(e.target).removeClass("loading");
            },
            "success" : function(res) {
                if("false" == res.logged) {
                    content.location.href = "https://reader.mx/accounts/login?next=" + content.location.href;

                }else {
                    $.ajax("https://reader.mx/collect/insertData", {
                        "type" : "POST",
                        "dataType" : "jsonp",
                        "jsonp" : "jsoncallback",
                        "data" : {
                            "url" : parsedPost._url,
                            "title" : parsedPost._title,
                            "content" : parsedPost._html,
                            "base_url" : parsedPost._base_url,
                        },
                        "success" : function(res) {
                            $(e.target).removeClass("loading");
                        }
                    });
                }
            }
        });

    }

}

window.addEventListener("load", function(e) {
    Components.classes["@mozilla.org/moz/jssubscript-loader;1"].
    getService(Components.interfaces.mozIJSSubScriptLoader).
    loadSubScript("chrome://readermx/content/libs/jquery.js");
}, false);
