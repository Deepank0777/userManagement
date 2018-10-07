var config              =   require('../config')
const { httpRequest }   =   require('../helpers/common');
const UserModel         =   require('../models/UserModel.js');
const url               =   require('url');

 module.exports = {
    register: function (req, res) {
        //validation
        req.checkBody('id', 'id is required').notEmpty();
        req.checkBody('first_name', 'Frist Name is required').notEmpty();
        req.checkBody('last_name', 'lastname is required').notEmpty();
        req.checkBody('company_name', 'Company Name is required').notEmpty();
        req.checkBody('age', 'Age is required').notEmpty();
        req.checkBody('city', 'City is required').notEmpty();
        req.checkBody('state', 'State is required').notEmpty();
        req.checkBody('zip', 'Zip is required').notEmpty();
        req.checkBody('email', 'Email is Empty or Invalid').isEmail();
        req.checkBody('web', 'Web is required').notEmpty();
            let errors = req.validationErrors();
            //check if any field is missing
            if(errors){
                let message=[];
                for (var i =0; i < errors.length; i++) {
                    message[i]=errors[i].msg;
                }
                return res.status(400).send({error:message});
            }
            //check if email already exist
            let findEmail = function() {
                return new Promise(function(resolve, reject) {
                    UserModel.findOne({ email: req.body.email }, function(err, user) {
                        if(!user) {
                            resolve('User does not exist');
                        }
                        else{
                            reject('E-mail already exist');
                    } 
                    });
                });
            };

            findEmail().then(function(result){
            //Register the user
            UserModel.create({
                id          : req.body.id,
                first_name   : req.body.first_name,
                last_name    : req.body.last_name, 
                company_name : req.body.company_name,
                age         : req.body.age,
                city        : req.body.city,
                state       : req.body.state,
                zip         : req.body.zip,
                email       : req.body.email,
                web         : req.body.web
            }).then(function(user) {
            res.status(201).send({ });

            }).catch(function(err) { // Here : "User.create().then().then().catch is undefined"
            if (err) 
                return res.status(500).send({
                    status: 'error',
                    message: 'There was a problem registering the user.'+err
                });
        }); 
            }).catch(function(fromReject){
                return res.status(400).send({status: 'error',messgae:fromReject}); 
            })
            
        },
        
    sendUser:function (req, res) {
          let q = url.parse(req.url, true).query;
          const pageNo = parseInt(q.page);
          let limit = parseInt(q.limit);
          if(!limit) limit=5
          const name = q.name; 
          const regularExp = new RegExp(`.*${name}.*`,"i");

          const sor=q.sort.toString();
          const sortParameter=q.sort.substr(1);
          // const pageSize = 5;
          const query = { $or: [ { first_name:regularExp }, { last_name:regularExp } ] };
          if(pageNo < 0 || pageNo === 0) {
                response = {"error" : true,"message" : "invalid page number, should start with 1"};
                return res.status(400).json(response)
          }
          let mysort
          if(q.sort!=null){
            if(q.sort.slice(0,1)=='-'){mysort={[sortParameter]:-1};}
            else{
                mysort={[sor]:1}
            }
          }
          UserModel
          .find(query,{ _id: 0, __v:0 })
          .limit(limit)
          .skip(limit * (pageNo - 1))
          .sort(mysort)
          .exec(function(err, result) {
            if (err) {
                return res.status(500).json({
                message: 'Error when getting User.',
                error: err
                });
                        }
            return res.json(result);
                                                                        });
},  
    sendUserById:function (req, res) {
        const id = req.params.id;
        UserModel.findOne({ id: id},{ _id: 0, __v:0 }, function (err, user) {
            if (err) {
                return res.status(500).json({ message: 'Error when getting User.',error: err });
            }
            if (!user) {
                return res.status(404).json({ message: 'No such User' });
            }
            return res.status(200).json(user);
        });
},
    updateUserById:function(req,res){
        var id = req.params.id;
        UserModel.findOne({id: id}, function (err, User) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting User',
                    error: err
                });
            }
            if (!User) {
                return res.status(404).json({ message: 'User not found' });
            }

            User.first_name = req.body.first_name ? req.body.first_name : User.first_name;
            User.last_name = req.body.last_name ? req.body.last_name : User.last_name;
            User.age = req.body.age ? req.body.age : User.age;
            
            User.save(function (err, User) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating User.',
                        error: err
                    });
                }
                return res.status(200).json({});
            });
        });
    },
    deleteUserById:function (req, res) {
        var myquery={ id:req.params.id };
        UserModel.deleteOne(myquery, function (err, Obj) {
            if (err) {
                return res.status(500).json({ message: 'Error deleting TG.',error: err });
            }
            return res.status(200).json({});
        });
}
    };
