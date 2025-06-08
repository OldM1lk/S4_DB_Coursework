use("SportsBase")

db.createCollection("sportFacilities")
db.createCollection("athletes")
db.createCollection("competitions")
db.createCollection("participations")

db.sportsFacilities.insertMany([
    {
        name: "ProFitness",
        type: "Спортивный зал",
        attributes: {
            "is24h": false
        }
    },
    {
        name: "МАУДО СШ №7",
        type: "Манеж",
        attributes: {
            tracks: 4
        }
    },
    {
        name: "Химик",
        type: "Стадион",
        attributes: {
            capacity: 32000
        }
    },
    {
        name: "Куzбасс",
        type: "Корт",
        attributes: {
            surface: "Teraflex"
        }
    },
    {
        name: "Лазурный",
        type: "Бассейн",
        attributes: {
            poolLength: 50
        }
    }
])

db.athletes.insertMany([
    {
        firstName: "Егор",
        lastName: "Нефедов",
        club: "Сибирские хаски",
        sports: [
            {
                name: "Волейбол",
                rank: 1,
                coaches: ["Мартыненко Н.В.", "Жуков Р.С."]
            },
            {
                name: "Баскетбол",
                rank: 1,
                coaches: ["Буданова Е.А."]
            }
        ]
    },
    {
        firstName: "Екатерина",
        lastName: "Волкова",
        club: "Триумф",
        sports: [
            {
                name: "Футбол",
                rank: 2,
                coaches: ["Баканов М.В."]
            },
            {
                name: "Плавание",
                rank: 1,
                coaches: ["Фёдоров А.А.", "Шунина В.И."]
            }
        ]
    },
    {
        firstName: "Максим",
        lastName: "Лебедев",
        club: "Триумф",
        sports: [
            {
                name: "Теннис",
                rank: 2,
                coaches: ["Шатурина Т.Л."]
            }
        ]
    },
    {
        firstName: "Ольга",
        lastName: "Смирнова",
        club: "Спарта",
        sports: [
            {
                name: "Футбол",
                rank: 3,
                coaches: ["Туренков А.Н."]
            },
            {
                name: "Волейбол",
                coaches: ["Родин А.Я."]
            }
        ]
    },
    {
        firstName: "Николай",
        lastName: "Козлов",
        club: "Феникс",
        sports: [
            {
                name: "Баскетбол",
                coaches: ["Конькова Р.В.", "Трефилова Т.Г."]
            }
        ]
    }
])

const proFitness = db.sportsFacilities.findOne({name: "ProFitness"})._id
const kemDush7 = db.sportsFacilities.findOne({name: "МАУДО СШ №7"})._id
const himik = db.sportsFacilities.findOne({name: "Химик"})._id
const tennis42 = db.sportsFacilities.findOne({name: "Куzбасс"})._id
const lazurniy = db.sportsFacilities.findOne({name: "Лазурный"})._id

db.competitions.insertMany([
    {
        name: "Кубок Универа по баскетболу",
        sport: "Баскетбол",
        organizer: "АСБ",
        date: new Date("2025-06-05"),
        facilityId: proFitness
    },
    {
        name: "Летний чемпионат по плаванию",
        sport: "Плавание",
        organizer: "Городской спорткомитет",
        date: new Date("2025-08-15"),
        facilityId: lazurniy
    },
    {
        name: "Зимний теннисный турнир",
        sport: "Теннис",
        organizer: "Ассоциация тенниса",
        date: new Date("2025-01-27"),
        facilityId: tennis42
    },
    {
        name: "Открытый кубок по футболу",
        sport: "Футбол",
        organizer: "Футбольная федерация",
        date: new Date("2025-07-23"),
        facilityId: himik
    },
    {
        name: "Городской турнир по волейболу",
        sport: "Волейбол",
        organizer: "Городской спорткомитет",
        date: new Date("2025-02-18"),
        facilityId: kemDush7
    }
])

const egorNefedov = db.athletes.findOne({firstName: "Егор", lastName: "Нефедов"})._id
const ekaterinaVolkova = db.athletes.findOne({firstName: "Екатерина", lastName: "Волкова"})._id
const maksimLebedev = db.athletes.findOne({firstName: "Максим", lastName: "Лебедев"})._id
const olgaSmirnova = db.athletes.findOne({firstName: "Ольга", lastName: "Смирнова"})._id
const nikolayKozlov = db.athletes.findOne({firstName: "Николай", lastName: "Козлов"})._id

const universityBasketballCup = db.competitions.findOne({name: "Кубок Универа по баскетболу"})._id
const summerSwimmingChampionship = db.competitions.findOne({name: "Летний чемпионат по плаванию"})._id
const winterTennisTournament = db.competitions.findOne({name: "Зимний теннисный турнир"})._id
const openSoccerCup = db.competitions.findOne({name: "Открытый кубок по футболу"})._id
const cityVolleyballTournament = db.competitions.findOne({name: "Городской турнир по волейболу"})._id

db.participations.insertMany([
    {
        athleteId: egorNefedov,
        competitionId: universityBasketballCup,
        place: 3
    },
    {
        athleteId: egorNefedov,
        competitionId: cityVolleyballTournament,
        place: 1
    },
    {
        athleteId: ekaterinaVolkova,
        competitionId: summerSwimmingChampionship,
        place: 2
    },
    {
        athleteId: maksimLebedev,
        competitionId: winterTennisTournament,
        place: 1
    },
    {
        athleteId: olgaSmirnova,
        competitionId: cityVolleyballTournament,
        place: 2
    },
    {
        athleteId: olgaSmirnova,
        competitionId: openSoccerCup,
        place: 3
    }
])

db.sportsFacilities.find()
db.athletes.find()
db.competitions.find()
db.participations.find()
