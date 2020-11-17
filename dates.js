const Dates = {
    DAY: 86400000,

    getToday: function () {
        return new Date();
    },

    countDays: function (toDate, fromDate) {
        if (!fromDate) fromDate = Dates.getToday();

        return Math.floor((toDate - fromDate) / Dates.DAY);
    }
};

module.exports = Dates;