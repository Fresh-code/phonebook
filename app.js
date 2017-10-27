var PhoneBook = function() {
    this.contacts = [];
};

PhoneBook.prototype = {
    add: function(contactInfo) {
        // validation
        if(this.contacts.length >= 10000){
            throw new Error("Phone book can't contain more than 10,000 contacts")
        }
        if(typeof(contactInfo) != 'object'){
            throw new Error("No contact info specified")
        }
        if(typeof(contactInfo.name) != 'string' || !contactInfo.name.length){
            throw new Error("No name specified")
        }
        if(contactInfo.name.length >= 100){
            throw new Error("Name should be less than 100 characters")
        }
        if(typeof(contactInfo.phone) != 'string' || !contactInfo.phone){
            throw new Error("No phone number specified")
        }
        var phoneNumberRegex = /^[\d]{2}-[\d]{3}-[\d]{4}$/;
        if(!contactInfo.phone.match(phoneNumberRegex)){
            throw new Error("Invalid phone number. Please use format xx-xxx-xxxx")
        }
        if(typeof(contactInfo.email) != 'string' || !contactInfo.email){
            throw new Error("No E-mail address specified")
        }
        var emailRegex = /\S+@\S+\.\S+/;
        if(!contactInfo.email.match(emailRegex)){
            throw new Error("Invalid E-mail address")
        }

        // add record to contacts
        this.contacts.push(contactInfo);
        // keep contacts sorted by name
        this.contacts.sort(function(c1, c2){
            if(c1.name > c2.name) {
                return 1;
            }
            if(c1.name < c2.name) {
                return -1;
            }
            return 0;
        });
        return this.contacts;
    },
    remove: function(index) {
        if(index < 0 || index >= this.contacts.length){
            throw new Error("Illegal index");
        }
        return this.contacts.splice(index, 1);
    },
    search: function(query) {
        return this.contacts.filter(function(contactInfo){
            return contactInfo.phone == query || contactInfo.name.toLowerCase() == query.toLowerCase();
        });
    },
    list: function(contactsPerPage, page) {
        if(contactsPerPage <= 0 || page < 0){
            throw new Error("Illegal page number or page size");
        }
        var start = page * contactsPerPage,
            end = start + contactsPerPage;

        return this.contacts.slice(start, end);
    }
};

module['exports'] = PhoneBook;