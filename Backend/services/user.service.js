var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const dbService = require("../config/db.service");
const driver = dbService();
var service = {};
const secretKey = 'my-secret-key';
service.loginService = loginService;
service.logoutService = logoutService;
service.registrationService = registrationService;

module.exports = service;

function generateToken(account) {
    const payload = { id: account.personId, username: account.firstName };
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
  }

 
  

function registrationService(req, res) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('userdate::',req.body);
            const email = req.body.email;
            const firstName = req.body.firstName.trim();
            const lastName = req.body.lastName?.trim();
            const password = bcrypt.hashSync(req.body.password);

            const session = driver.session();
            const preQuery = `match(p:Person{email:$email})return p`;
            const preResult = await session.run(preQuery, { email: email });

            if (!preResult.records.length) {
                const query = `create(p:Person
        {personId:apoc.create.uuid(), 
            email:$email, 
            firstName:$firstName, 
            lastName:$lastName, 
            applicationId:apoc.create.uuid(),
            password:$password
        }) return p`;

                session.run(query, { firstName: firstName, lastName: lastName, email: email, password: password })
                    .then((result) => {
                        if (result.records.length > 0) {
                            resolve({ stat: true, message: 'User registered successfully' });
                        } else {
                            reject({ stat: false, message: 'Error in user Registration' });
                        }

                    }).catch((error) => {
                        console.log('Error in user registration::', error);
                        session.close();
                    })

            } else {
                resolve({ stat: false, message: 'User with this email already exist' })
            }
        } catch (error) {
            console.log('Error in user registration::', error);
            reject({ stat: false, error: error, message: 'Error in user Registration' });
        }
    })
}

function loginService(req,res){
return new Promise((resolve, reject)=>{
    try {
        const email = req.body.email;
        const password =  req.body.password;
        const session = driver.session();
        const query = `match(p:Person{email:$email}) return properties(p) as prop`; 
        session.run(query,{email:email})
        .then((result)=>{
        if(result.records.length>0){
        const dbPassword = result.records[0].get('prop').password;
        const isUserAuthenticated = bcrypt.compareSync(
            password,
            dbPassword
          );
            if(isUserAuthenticated){
            const {password,...account} = result.records[0].get('prop');
            const token = generateToken(account);
            res.cookie('authToken', token, { httpOnly: true, secure: true, domain:'localhost',path:'/' });
            // console.log(res);
            resolve({stat:true,data:account});
            }else{
                reject({stat:false,message:'Invalid Credentials'});
            }
        }else{
            reject({stat:false,message:'Invalid Credentials'});
        }
        })
        .catch((error)=>{
            console.log('Error in login::',error);
            reject({stat:false,message:'Error in Authentication'});
        })

     } catch (error) {
        console.log('Error in login::',error);
        reject({stat:false,message:'Error in Authentication'});
     }
})

}

function logoutService(req,res){
    try {
        res.clearCookie('authToken');
    } catch (error) {
        console.log(error);
    }
    }