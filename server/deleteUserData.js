let Asset = require('./models/asset.model')
let Income = require('./models/income.model')
let Principal = require('./models/principal.model')

deleteUserData = async(user_id) => {
    Asset.deleteMany({
        user_id: user_id
    }, (err, assets) => {
        console.log('asset deleted')
    })

    Income.deleteMany({
        user_id: user_id
    }, (err, incomes) => {
        console.log('income deleted')
    })

    Principal.deleteMany({
        user_id: user_id
    }, (err, principals) => {
        console.log('principal deleted')
    })
}

module.exports = deleteUserData