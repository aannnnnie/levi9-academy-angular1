module.exports = {

attributes: {
    date: {
        type: 'date',
        required: true,
        unique: true
    },
    amountOfActions: {
        type: 'integer',
        required: true
    },
    account: { model: 'Account' }
}
};