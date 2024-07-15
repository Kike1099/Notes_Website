const {} = require('uuid');

class note{
    constructor(title, content, tags){
        this.id = uuidv4();
        this.title = title;
        this.content = content;
        this.creationDate = new Date();
        this.updateDate = new Date();
        this.tags = tags;
    }
}

module.exports = note;