var api = "https://www.extra-life.org/api/participants/{participantId}",
    donationEndPoint = api + "/donations?orderBy=" + encodeURIComponent('createdDateUTC DESC') + '&limit=48',
    incentiveEndPoint = api + "/incentives",
    participantId = 400560

var v = new Vue({
    el: "#app",
    data: {
        donations: [],
        incentives: [],
    },
    methods: {
        getDonations() {
            axios(this.replaceParticipantId(donationEndPoint)).then((response) => {
                this.donations = response.data;
                console.log(this.donations);
            })
        },
        getIncentives() {
            axios(this.replaceParticipantId(incentiveEndPoint)).then(response => {
                this.incentives = response.data;
                console.log(this.incentives);
            })
        },
        replaceParticipantId(url) {
            return url.replace("{participantId}", participantId);
        },
        donationAge(date){
            var local = new Date(date);
            return moment(local).from(Date.now());
        },
        matchIncentive(incentiveId) {
            let incentive = this.incentives.find(i => i.incentiveID == incentiveId);
            return incentive != null ? incentive.description : "None"
        },
    }
})

setInterval(
    () => {
        v.getDonations();
    },
    6000
);

v.getDonations();
v.getIncentives();