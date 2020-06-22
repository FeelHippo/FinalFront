export default class Ad {
    /**
     * Constructor
     */
    constructor(
        tag = '',
        _id = '',
        name = '',
        price_low = 0,
        price_high = 9999,
        description = '',
        photo = '',
        type = true,
    ){
        this.tag = tag;
        this._id = _id;
        this.name = name;
        this.price_low = price_low;
        this.price_high = price_high;
        this.description = description;
        this.photo = photo;
        this.type = type;
    }

    /**
     * test validity of object
     */
    isValid() {
        return  this.name &&
                this.description &&
                this.price_high > this.price_low &&
                this.type &&
                this.photo &&
                this.tag
    }
}