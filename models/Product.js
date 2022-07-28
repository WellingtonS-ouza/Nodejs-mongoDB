const conn = require('../db/conn')

const { ObjectId } = require('mongodb')

class Product {
    constructor(name, price, image, description) {
        this.name = name 
         this.price = price
        this.image = image
        this.description = description

    }

    save() {
        const product = conn.db().collection('products').insertOne({
            name: this.name,
            image: this.image,
            price: this.price,
            description: this.description,
        })
        return product
    }

    static getProducts() {
        const products = conn.db().collection('products').find().toArray()

        return products
    }

    static async getProductById(id) {
        const product = await conn
            .db()
            .collection('products')
            .findOne({ _id: ObjectId(id) })

        return product
    }

    static async removeProductById(id) {
        await conn
            .db()
            .collection('products')
            .deleteOne({ _id: ObjectId(id) })

        return
    }

    updateProduct(id) {
        conn.db().collection('products').updateOne({ _id: ObjectId(id) }, { $set: this })

        return


    }
}
module.exports = Product