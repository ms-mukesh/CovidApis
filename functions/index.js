const functions = require('firebase-functions');
const admin=require('firebase-admin');
var serviceAccount = require("./permission.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cloudfunctiondemo-e7a8a.firebaseio.com"
});

const cors=require('cors');

const express=require('express');
const app=express();

const db=admin.firestore();
app.use(cors({origin:true}));
app.use(express.json());

const urlMetadata = require('url-metadata')

const { getMetadata } = require('page-metadata-parser');
const domino = require('domino');



app.post('/api/insCountryData',(req,res)=>{
    var datetime = new Date();
    (async ()=>{
        try{
            await db.collection('CountryCases').doc(req.body.countryName)
            .create({
                countryName:req.body.countryName,
                cases:req.body.cases,
                dateTime:datetime,
               
            })
            return res.status(200).send('Data Recorded ......');
        }
        catch(error)
        {
            console.log(error)
            return res.status(500).send(error)
        }

    })(); 
})

app.post('/api/updateCountryData',(req,res)=>{
    var datetime = new Date();
    (async ()=>{
        try{
        
            db.collection("CountryCases").doc(req.body.countryName)
            .update({cases:req.body.cases});
           
            return res.status(200).send('Data Updated ......');
        }
        catch(error)
        {
            console.log(error)
            return res.status(500).send(error)
        }

    })(); 
})


app.post('/api/getCountryData',(req,res)=>{
    var datetime = new Date();
    (async ()=>{
        try{
        
            let query=db.collection('CountryCases');
            let response=[];
            await query.get().then(querySnapshot=>{
                let docs=querySnapshot.docs;
                for(let doc of docs)
                {
                    const item={
                        countryName:doc.id,
                        case:doc.data().cases
                    };
                    response.push(item)
                }
                return response;
            })
            return res.status(200).json(response);
            
        }
        catch(error)
        {
            console.log(error)
            return res.status(500).send(error)
        }

    })(); 
})


app.post('/api/insStateData',(req,res)=>{
    var datetime = new Date();
    (async ()=>{
        try{
            await db.collection('IndiaStatus').doc(req.body.stateName)
            .create({
                stateName:req.body.stateName,
                cases:req.body.cases,
                dateTime:datetime,
               
            })
            return res.status(200).send('Data Recorded ......');
        }
        catch(error)
        {
            console.log(error)
            return res.status(500).send(error)
        }

    })(); 
})


app.post('/api/updateStateData',(req,res)=>{
    var datetime = new Date();
    (async ()=>{
        try{
        
            db.collection("IndiaStatus").doc(req.body.stateName)
            .update({cases:req.body.cases});
                return res.status(200).send('Data Updated ......');
        }
        catch(error)
        {
            console.log(error)
            return res.status(500).send(error)
        }

    })(); 
})

app.post('/api/getStateData',(req,res)=>{
    var datetime = new Date();
    (async ()=>{
        try{
        
            let query=db.collection('IndiaStatus');
            let response=[];
            await query.get().then(querySnapshot=>{
                let docs=querySnapshot.docs;
                for(let doc of docs)
                {
                    const item={
                        stateName:doc.id,
                        case:doc.data().cases
                    };
                    response.push(item)
                }
                return response;
            })
            return res.status(200).json(response);
            
        }
        catch(error)
        {
            console.log(error)
            return res.status(500).send(error)
        }

    })(); 
})



app.post('/api/insGujData',(req,res)=>{
    var datetime = new Date();
    (async ()=>{
        try{
            await db.collection('GujaratStatus').doc(req.body.cityName)
            .create({
                cityName:req.body.cityName,
                cases:req.body.cases,
                dateTime:datetime,
               
            })
            return res.status(200).send('Data Recorded ......');
        }
        catch(error)
        {
            console.log(error)
            return res.status(500).send(error)
        }

    })(); 
})


app.post('/api/updateGujData',(req,res)=>{
    var datetime = new Date();
    (async ()=>{
        try{
        
            db.collection("GujaratStatus").doc(req.body.cityName)
            .update({cases:req.body.cases});
                return res.status(200).send('Data Updated ......');
        }
        catch(error)
        {
            console.log(error)
            return res.status(500).send(error)
        }

    })(); 
})

app.post('/api/getGujData',(req,res)=>{
    var datetime = new Date();
    (async ()=>{
        try{
        
            let query=db.collection('GujaratStatus');
            let response=[];
            await query.get().then(querySnapshot=>{
                let docs=querySnapshot.docs;
                for(let doc of docs)
                {
                    const item={
                        cityName:doc.id,
                        case:doc.data().cases
                    };
                    response.push(item)
                }
                return response;
            })
            return res.status(200).json(response);
            
        }
        catch(error)
        {
            console.log(error)
            return res.status(500).send(error)
        }

    })(); 
})

app.post('/api/getCurrentCasesIndia',(req,res)=>{
    var datetime = new Date();
            urlMetadata('https://www.worldometers.info/coronavirus/country/india/').then(
                function (metadata) { // success handler
                       return res.status(200).send(metadata.title)
                 },
            function (error) { // failure handler
                 console.log(error)
                 return res.status(401).send(error)
            }).catch((err)=>{
                return res.status(500).send(err)
            })
                    
})


app.post('/api/getCurrentCasesWorld',(req,res)=>{
    var datetime = new Date();
            urlMetadata('https://www.worldometers.info/coronavirus/').then(
                function (metadata) { // success handler
                       return res.status(200).send(metadata.title)
                 },
            function (error) { // failure handler
                 console.log(error)
                 return res.status(401).send(error)
            }).catch((err)=>{
                return res.status(500).send(err)
            })
                    
})


app.post('/api/getDataDemo',(req,res)=>{
    var datetime = new Date();
            urlMetadata('https://www.worldometers.info/coronavirus/coronavirus-cases/#total-cases').then(
                function (metadata) { // success handler
                       return res.status(200).send(metadata)
                 },
            
            function (error) { // failure handler
                 console.log(error)
                 return res.status(401).send(error)
            }).catch((err)=>{
                return res.status(500).send(err)
            })
                    
})






// app.post('/api/getCurrentCasesIndia1',async (req,res)=>{
//     var datetime = new Date();
    
//     try
//     {

//     // const url="https://www.worldometers.info/coronavirus/country/india/"
//     // const response=await fetch(url);
//     // const html=response.text();
//     // const doc = domino.createWindow(html).document;
//     // const metadata=getMetadata(doc,url).then((res)=>{
//     //     console.log(res)
//     // }).catch((err)=>{
//     //     console.log(err)
//     // })
//     // return res.json(metadata.title);
//     const fetch = require('node-fetch');

//     fetch('https://www.worldometers.info/coronavirus/country/india/')
//     .then((data)=>{
//         return res.send(data)
//     })
// }
//     catch(err)
//     {
//         console.log(err);

//         return res.json(err);

//     }
    
                    
// })

app.listen(3000,(err)=>{
    if(err)
    {
        console.log("failed to connect")
    }
    else
    {
        console.log("connected")
    }
})







exports.app=functions.https.onRequest(app)