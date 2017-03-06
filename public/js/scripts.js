$("document").ready(function(){
    $("#addButton").on("click", function(e){
        e.preventDefault();
        console.log("test");
        $.ajax({
            method: "POST",
            url:"/dashboardAdmin",
            contentType: "application/json",
            success: function (response){
                    console.log(response);
             $("#display").html(response);
            }
            
            })
            })
        })
