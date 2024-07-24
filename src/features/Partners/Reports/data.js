
data = {
    
    heart_health : {
        totals : {
            "boys" : "9",
            "girls" : "5",
            "total" : "14"
        },
        counts :  {  
            "boys" : "7",
            "girls" : "2",
            "total" : "9"
        }
    },
    body_health : {
        totals : {
            "boys" : "9",
            "girls" : "5",
            "total" : "14"
        },
        counts :  {  
            "boys" : "4",
            "girls" : "3",
            "total" : "7"
        }
    },
    upper_body : {
        totals : {
            "boys" : "10",
            "girls" : "10",
            "total" : "20"
        },
        counts :  {  
            "boys" : "5",
            "girls" : "6",
            "total" : "11"
        }
    },
    adbominal : {
        totals : {
            "boys" : "6",
            "girls" : "2",
            "total" : "8"
        },
        counts :  {  
            "boys" : "2",
            "girls" : "1",
            "total" : "3"
        }
    },
    trunk_extensor : {
        totals : {
            "boys" : "5",
            "girls" : "2",
            "total" : "7"
        },
        counts :  {  
            "boys" : "3",
            "girls" : "1",
            "total" : "4"
        }
    },
    flexibility : {
        totals : {
            "boys" : "3",
            "girls" : "2",
            "total" : "5"
        },
        counts :  {  
            "boys" : "2",
            "girls" : "1",
            "total" : "3"
        }
    } 
    
}

function getChartData(){
    lables = []
    dataset = []

    for(let x in data){

        lables.push(...Object.keys(data[x]['counts']))

        totals = Object.values(data[x]['totals'])
        counts = Object.values(data[x]['counts'])

        for(let i in counts){
            let t = parseFloat(totals[i])
            let c = parseFloat(counts[i])
            let p = (c / t) * 100
            dataset.push(parseInt(p))    
        }
    }

    
}

getChartData()