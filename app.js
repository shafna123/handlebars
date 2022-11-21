const http = require('http');
const Handlebars = require('handlebars');
const url =require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const customer = require('./data/customer');

registerPartials();

// let template = Handlebars.compile("<p>{{msg}}</p>");
// var res = template({msg:"Hello from handlebars"});
// console.log(res);

const server = http.createServer(function(req,res){
const link = url.parse(req.url, true);
const query = link.query;
const page = link.pathname;


// if(page == "/"){
// // var filePath = path.join(__dirname, "templates", "index.hbs");
// //   let templateText = fs.readFileSync(filePath, "utf-8");
// //   let template = Handlebars.compile(templateText);
//   res.end(template({msg:"welcome to my website"}));
// }

// if(page == "/"){
//     var template = renderTemplate("index", {msg: "hello"});
//     res.end(template);

// }

// if(page == "/"){
//     customer.getAll((err,result) => {
//         let t = renderTemplate('index', {msg: 'Hello World'});
//         console.log(result);
//         res.end(t);
//     });

// }


if(page == "/"){
    customer.getAll((err,result) => {  
        console.log(result);            //for displaying data as object instead of array of object
        var context = {data: result};
        console.log(context);
        let t = renderTemplate('index', context);
        
        res.end(t);


    });
}
     else if(page == "/customer/create" && req.method == "GET"){
            let template = renderTemplate ('create', {});
            res.end(template);
     }

     else if(page == "/customer/create" && req.method == "POST") {
        let formData = '';
        req.on('data', function(data){
            formData += data.toString() 
        });
       
        req.on('end', function(){
        let userData = qs.parse(formData);
        customer.addOne(userData.name, userData.email, userData.age, (err,result) =>{
            var context = {
                result: {
                success: true,
                errors: []
                }
            };
            if(err){
                console.log(err)
                context.result.success = false;
            
            }
                let t = renderTemplate('create', context);
                res.end(t);
            
        });
        });

     }

});
server.listen(80);

function renderTemplate(name,data){
    var filePath = path.join(__dirname, "templates", name+".hbs");
    let templateText = fs.readFileSync(filePath, "utf-8");
    let template = Handlebars.compile(templateText); 
    return template(data); 
}

function registerPartials(){                                                           //for navbar
    var filePath = path.join(__dirname, "templates", "partials", "navbar.hbs");
    let templateText = fs.readFileSync(filePath, "utf-8"); 
    Handlebars.registerPartial("navbar", templateText);
}




