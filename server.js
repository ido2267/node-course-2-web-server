const express = require('express')
const hbs = require ('hbs');
const fs = require('fs');
const port = process.env.port || 3000 ; // if port doesn't exist set it to 3000

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((req,res,next) =>{
  var now = new Date().toString();
  var log = `The time is: ${now} \nThe request is: ${req.method} \nThe url is: ${req.url}`
  console.log(log);
  fs.appendFile('server.log',log + '\n', (error)=>{
    if (error){
    console.log('Unable to append to server.log');
    }
  }) ;
  next();
});

// app.use((req,res,next) =>{
//           res.render('maintenence.hbs',{
//             Title: "page under construction",
//             welcomeMessage:"The site is being updated",
//             PageTitle:"Page under construction",
//         });
// });
app.use(express.static(__dirname +'/public'));


hbs.registerHelper('getCurrentYear',()=>{
  return  new Date().getFullYear()
});
hbs.registerHelper('capitelize',(text)=>{
  return  text.toUpperCase();
});
app.get('/', (req,res)=>{
  //res.send('<h1>Hello express</h1>');
  // res.send({
  //   name:"Ido",
  //   hobies:[
  //     "biking",
  //     "facebook"
  //   ]
  res.render('home.hbs',{
    Title: "Web site",
    welcomeMessage:"Welcome handsome",
    PageTitle:"Home Page",
 //   currentYear: new Date().getFullYear()
  })

});


app.get('/about', (req,res)=>{
        res.render('about.hbs',{
          Title: "Web site",
          PageTitle:"About Page",
      //   currentYear: new Date().getFullYear()
          });
  });
 
 
  app.get('/bad', (req,res)=>{
     res.send({errorMessage:"Bad url request"})
    });

  

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
