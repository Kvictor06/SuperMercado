import axios from "axios";

export const api = axios.create({
    baseURL: 'https://api.jsonbin.io/v3/b/666f29ceacd3cb34a85858dc',
    headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2a$10$Jc30FQOuDFt02TH7CX9SDutiyMRjzAREoc5xKg.MMXxsu.QBNbonm'
    }
})