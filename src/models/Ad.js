export default class Ad {
    /**
     * Constructor
     */
    constructor(
        user = '',
        oldFirst = false,
        tag1 = '',
        tag2 = '',
        _id = '',
        name = '',
        price_low = 0,
        price_high = 9999,
        description = '',
        photo = '',
        type = true,
        reserved = false,
        sold = false,
    ){
        this.user = user;
        this.oldFirst = oldFirst;
        this.tag1 = tag1;
        this.tag2 = tag2;
        this._id = _id;
        this.name = name;
        this.price_low = price_low;
        this.price_high = price_high;
        this.description = description;
        this.photo = photo;
        this.type = type;
        this.reserved = reserved;
        this.sold = sold;
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