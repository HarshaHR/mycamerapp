$(document).ready(function(){
    
    var video = document.getElementById("sourceVideo")
    var host = window.location.hostname
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(function(stream) {
        video.srcObject = stream;
        video.play();
    })
    .catch(function(err) {
        console.log("An error occurred: " + err);
    });

    window.canvasValue = ""

    $("#capture").click(function(){
        var canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        console.log(dataURLtoBlob(canvas.toDataURL()) )

        window.canvasValue = dataURLtoBlob(canvas.toDataURL())
        $("#canvasimage").attr("src",canvas.toDataURL())
    })

    $("#clear").click(function(){
        
        $("#canvasimage").attr("src", "images/sample.jpg")
    })

    $("#send").click(function(){


        var imgUrl = "https://" + host + ":3000/uploadimg"

        data = new FormData();
                data.append('file', window.canvasValue);

                $.ajax({
                  url: imgUrl,
                  type: "POST",
                  data: data,
                  enctype: 'multipart/form-data',
                  processData: false,
                  contentType: false,
                  success: function(data) {
                    $("#canvasimage").attr("src", "images/sample.jpg")
                    alert("uploaded")
                  },
                  error: function(e) {
                      document.getElementById("result").innerHTML = 'Result: Error occurred: ' + e.message;
                  }
                });
    })

    function dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
    }
});