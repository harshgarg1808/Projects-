const express = require('express')
const bodyparser = require('body-parser')
const https = require('https')


const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("Public"));

app.get("/", function(req, res){

    // res.write("Hello world!");
    // res.end();

    res.sendFile('/home/harsh/Desktop/WebD/Projects/News-Letter-SignUp/signup.html');

})

app.post("/",function(req,res){
        // var email = body.

        const emailID = (req.body.email);
        const passwordID = (req.body.password);

        const data = {
            members: [
                {
                    email_address: emailID,
                    status: "subscribed"
                }
            ]
        };

        const jsondata = JSON.stringify(data);
        const url = 'https://us7.api.mailchimp.com/3.0/lists/701a431dcb';

        const options = {
            method: 'POST',
            auth : "harshgarg1808:c09ea699b0ca14c7e9cf728568978aad-us7"
        };
        
        const request = https.request(url, options , function(response){

            if(response.statusCode === 200){
                res.sendFile("/home/harsh/Desktop/WebD/Projects/News-Letter-SignUp/success.html");
            }

            else{
                res.sendFile("/home/harsh/Desktop/WebD/Projects/News-Letter-SignUp/failure.html");
            }

            response.on("data",function(data){
                console.log(JSON.parse(data));
            })

        });

        request.write(jsondata);
        request.end();


});

app.listen(process.env.PORT || 3100, function(){
    console.log("The server is running on port 3100");
})


// APIKEYS
// c09ea699b0ca14c7e9cf728568978aad-us7

// ListID 
// 701a431dcb