const assert = require('assert');
const UserChar = require('../backend/models/user.model');

describe('Saving user', function(){

    it('Saves a record to database', function(done){
        var usr = new UserChar({
            first_name: 'Thuy',
            last_name: 'Tran',
            email: 'lilb3lazy@gmail.com',
            password: 'TrippinTest'
        });

        usr.save().then(function(){
            assert(usr.isNew === false);
            done();
        });

    });
});