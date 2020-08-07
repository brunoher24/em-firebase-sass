const STORAGE_NAME = 'brunoher2404_em_firebase_app';

function Storage(type) {
    this.ref =  window[type + 'Storage'];

    if (!this.ref[STORAGE_NAME]) {
        const data = {
            user : {},
        };
        this.ref[STORAGE_NAME] = JSON.stringify(data); 
    }
    
    this.get = () => {    
       return JSON.parse(this.ref[STORAGE_NAME]); 
    };

    this.getItem = prop => {
        const data = this.get();
        return data[prop];
    };
    
    this.set = (prop, value) => {
        const data = this.get();
        data[prop] = value;
        this.ref[STORAGE_NAME] = JSON.stringify(data);

    };  
}

