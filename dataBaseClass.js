
class DataBase{
    
    constructor(creationDate, redirectCount, originalUrl, shortUrlId) {
        this._creationDate = creationDate;
        this._redirectCount = redirectCount;
        this._originalUrl = originalUrl;
        this._shortUrlId = shortUrlId;

    }
    clicked() {
        this._redirectCount++;
        return this._redirectCount;
    }
}

module.exports = {
    DataBase
}