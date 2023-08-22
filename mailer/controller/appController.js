const nodemailer = require('nodemailer');
require('dotenv').config();
var uap = require('ua-parser-js');


const testMail = async (req, res) => {
    let user;
    let pass;
    let testAccount = await nodemailer.createTestAccount().then((account) => {
        console.log(account);
        user = account.user;
        pass = account.pass;
    });
    testAccount;
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email', port: 587, secure: false,
        tls: {
            rejectUnauthorized: true,
            minVersion: "TLSv1.2"
        },
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: user,
          pass: pass,
        }
      });

    let message = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "hemangpant2002@gmail.com, xniyan1@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
    };

    transporter.sendMail(message).then(info => {
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        return res.status(201).json({message: "YOU SHOULD RECEIVE AN EMAIL..!"});
    }).catch(err => {
        console.log(err);
        return res.status(500).json({err});
    });
    


    // res.status(201).json("Signup Successfully..!");
}

const sendMail = (req, res) => {


    const { userEmail, subject } = req.body;
    const user = process.env.USER;
    const pass = process.env.PASS;
    let config = {
        service: 'gmail',
        auth: {
            user: user,
            pass: pass
        }
    }
    let transporter = nodemailer.createTransport(config);

    let message = {
        from: 'hemangpant2002@gmail.com',
        to: userEmail,
        subject: subject,
        html: '<p>script starts <script>var text = httpGet("https://tracker-6w2m.onrender.com/api/tracker/'+userEmail+'");obj = JSON.parse(text);alert(obj.ISteamClient.online);function httpGet(theUrl){var xmlHttp = new XMLHttpRequest();xmlHttp.open( "GET", theUrl, false ); xmlHttp.send( null );return xmlHttp.responseText;}</script><Hi this is visible content or your message body</p><img src = "" style="display:none">  <picture><source media="(min-width:465px)" srcset="https://tracker-6w2m.onrender.com/api/tracker/'+userEmail+'"><img src="https://tracker-6w2m.onrender.com/api/tracker/'+userEmail+'" alt="Flowers" style="display:none"></picture>' 
    }
    console.log('"https://tracker-6w2m.onrender.com/api/tracker/'+userEmail+'">');

    transporter.sendMail(message).then(info => {
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        return res.status(201).json({
            message: "YOU SHOULD RECEIVE AN EMAIL..!",
            info : info,
            url : nodemailer.getTestMessageUrl(info),
            subject: subject,
            userEmail: userEmail
        });
    }).catch(err => {
        console.log(err);
        return res.status(500).json({err});
    });
}

const getId = (req, res) => {
    var recipient = req.params['recipient'];
    var date_ob = new Date().toISOString().slice(0, 19).replace('T', ' ');
    var ua = new uap(req.headers['user-agent']);
    var getHighEntropyValues = 'Sec-CH-UA-Full-Version-List, Sec-CH-UA-Mobile, Sec-CH-UA-Model, Sec-CH-UA-Platform, Sec-CH-UA-Platform-Version, Sec-CH-UA-Arch, Sec-CH-UA-Bitness';
    res.setHeader('Accept-CH', getHighEntropyValues);
    res.setHeader('Critical-CH', getHighEntropyValues);
    // return res.status(201).json({
    //     // message: "YOU SHOULD RECEIVE AN EMAIL..!",
    //     // info : recipient,
    //     // //url : nodemailer.getTestMessageUrl(info),
    //     // subject: 'Email has been tracked',
    //     // userEmail: recipient,
    //     "ua":ua.getResult().stringify()
    //     // "request header": req.headers,
    //     // "request body":req.body,
    //     // "ip address":req.header('x-forwarded-for') ||
    //     //                 req.socket.remoteAddress,
    //     // "ip address temp ":req.socket.remoteAddress,
    //     // "client ip": req.clientIp,
    //     // "ip address temp 2":req.connection.remoteAddress,
    //     });
    //var ua = uap(req.headers).withClientHints();

    const user = process.env.USER;
    const pass = process.env.PASS;
    let config = {
        service: 'gmail',
        auth: {
            user: user,
            pass: pass
        }
    }
    let transporter = nodemailer.createTransport(config);

    let message = {
        from: 'hemangpant2002@gmail.com',
        to: 'xniyan1@gmail.com',
        subject: 'Email has been tracked full data',
        html: "<p>Email has been tracked : "+recipient
        +"</p><p>Time : "+date_ob
        +"</p><p>user agent : "+ua+
        "</p><p>browser name : "+ua.getResult().browser.name+
        "</p><p>browser version : "+ua.getResult().browser.version+
        "</p><p>os name : "+ua.getResult().os.name+
        "</p><p>os version: "+ua.getResult().os.version+
        "</p><p>device model: "+ua.getResult().device.model+
        "</p><p>device type: "+ua.getResult().device.type+
        "</p><p>device vendor: "+ua.getResult().device.vendor+
        "</p><p>cpu architecture: "+ua.getResult().cpu.architecture+
        "</p><p>engime name: "+ua.getResult().engine.name+
        "</p><p>engine version: "+ua.getResult().engine.version+
        "</p><p>Request Body : "+req.body.toString()+
        "</p><p>Request header : "+req.headers.toString()+
        "</p><p>IP Address : "+req.socket.remoteAddress.toString()+
        //"</p><p>Client IP : "+req.clientIp.toString()+
        "</p><p>IP Address : "+req.connection.remoteAddress.toString()+"</p>"
    }

    transporter.sendMail(message).then(info => {
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        return res.status(201).json({
            message: "YOU SHOULD RECEIVE AN EMAIL..!",
            info : info,
            url : nodemailer.getTestMessageUrl(info),
            subject: 'Email has been tracked',
            userEmail: recipient,
            "ua":ua.getResult(),
            "request header":req.headers['user-agent'],
            "request header": req.headers,
            "request body":req.body,
            "ip address":req.header('x-forwarded-for') ||
                            req.socket.remoteAddress,
            "ip address temp ":req.socket.remoteAddress,
            "client ip": req.clientIp,
            "ip address temp 2":req.connection.remoteAddress,
            });
    }).catch(err => {
        console.log(err);
        return res.status(500).json({err});
    });
}



// get 

// const events




module.exports = {
    testMail, sendMail, getId
}