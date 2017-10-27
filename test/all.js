var PhoneBook = require('../app.js');
var should = require('should');
var faker = require('faker');

function genContactInfo(name, phone, email){
    return {
        name: name || faker.name.firstName(),
        phone: phone || faker.phone.phoneNumberFormat(2).slice(3),
        email: email || faker.internet.email()
    };
}

console.log('test create')
var myPhoneBook = new PhoneBook();
var contacts = myPhoneBook.list(10, 0);
contacts.should.be.empty;

console.log('test add');
myPhoneBook.add(genContactInfo());
contacts = myPhoneBook.list(10, 0);
contacts.should.have.length(1);

should(function(){myPhoneBook.add()})
    .throw("No contact info specified");
should(function(){myPhoneBook.add(genContactInfo(faker.lorem.words(100)))})
    .throw("Name should be less than 100 characters");
should(function(){myPhoneBook.add(genContactInfo(faker.name.firstName(), '123-321-345'))})
    .throw("Invalid phone number. Please use format xx-xxx-xxxx");
should(function(){myPhoneBook.add(genContactInfo(faker.name.firstName(), '12-321-3456', 'not-valid.mail'))})
    .throw("Invalid E-mail address");

console.log('test remove');
myPhoneBook.remove(0);
contacts = myPhoneBook.list(10, 0);
contacts.should.be.empty;

console.log('test query');
myPhoneBook = new PhoneBook();
myPhoneBook.add(genContactInfo('John Smith', '01-234-5678'));
myPhoneBook.add(genContactInfo('Bill Bailey', '12-345-6789'));
myPhoneBook.add(genContactInfo('Dylan Moran', '23-456-7890'));
contacts = myPhoneBook.search('john smith'); // maybe add support for case insensitive search
contacts.should.have.length(1);
contacts[0].should.have.property('name', 'John Smith');
contacts = myPhoneBook.search('12-345-6789'); // maybe add support for case insensitive search
contacts.should.have.length(1);
contacts[0].should.have.property('phone', '12-345-6789');

console.log('test sorting by name');
myPhoneBook = new PhoneBook();
for(var i = 9; i > 0; i--){
    myPhoneBook.add(genContactInfo('' + i))
}
contacts = myPhoneBook.list(3, 0);
contacts.should.have.length(3);
contacts[0].should.have.property('name', '1');
contacts[1].should.have.property('name', '2');
contacts[2].should.have.property('name', '3');

contacts = myPhoneBook.list(2, 2);
contacts.should.have.length(2);
contacts[0].should.have.property('name', '5');
contacts[1].should.have.property('name', '6');

console.log('test overflow condition');
myPhoneBook = new PhoneBook();
for(var i = 0; i < 10000; i++){
    myPhoneBook.add(genContactInfo('name', '00-000-0000', 'a@a.a'));
}
should(function(){myPhoneBook.add(genContactInfo())}).throw("Phone book can't contain more than 10,000 contacts");

console.log('All tests passed!');