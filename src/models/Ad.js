export default class Ad {
    /**
     * Constructor
     */
    constructor(ad){
        this.tags = ad.tags;
        this._id = ad._id;
        this.name = ad.name;
        this.price = ad.price;
        this.description = ad.description;
        this.photo = ad.photo;
        this.type = ad.type;
    }

    /**
     * test validity of object
     */
    isValid() {
        return  this.name &&
                this.description &&
                this.price > 0 &&
                this.type &&
                this.photo &&
                this.tags &&
                this.tags.length >= 1;
    }
}