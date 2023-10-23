const sequlize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequlize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}
})
const Basket = sequlize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},

})
const BasketDevice = sequlize.define('basket_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},

})
const Device = sequlize.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name: {type: DataTypes.STRING, unique: true, allowNull:true},
    price: {type: DataTypes.INTEGER,  allowNull:false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
})
const Type = sequlize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})
const Brand = sequlize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})
const Rating = sequlize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    rate: {type: DataTypes.STRING, unique: true, allowNull: false}
})
const DeviceInfo = sequlize.define('device_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false}
})
const TypeBrand = sequlize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
})


User.hasOne(Basket)
Basket.belongsTo(User)
User.hasMany(Rating)
Rating.belongsTo(User)
Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Type.hasMany(Device)
Device.belongsTo(Brand)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

Device.hasMany(DeviceInfo, {as: 'info'})
DeviceInfo.belongsTo(Device)

Type.belongsToMany(Brand, {through: TypeBrand})
Brand.belongsToMany(Type, {through: TypeBrand})

module.exports = {
    User,
    Basket,
    BasketDevice,
    Device,
    Type,
    Brand,
    Rating,
    TypeBrand,
    DeviceInfo
}



