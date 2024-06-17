import axios from "axios";



class SeatService{

    
    getSeatForId(seatId){

        // return axios.get("https://onlineseatbooking.onrender.com/api/layout/map/floor/"+floor+"/date/"+ this.formatDate(date))
    }
    addNewSeat(seatObj){
        var officeId = seatObj.officeId
        return axios.post("https://onlineseatbooking.onrender.com/api/seat/office/"+officeId,seatObj)
    }  
    deleteSeats(seatId){
        return axios.delete("https://onlineseatbooking.onrender.com/api/seat/"+ seatId)
    } 

    getAllFloors(officeId) {
        return axios.get("https://onlineseatbooking.onrender.com/api/offices/"+officeId+"/getFloors")
    }
}

export default new SeatService()


