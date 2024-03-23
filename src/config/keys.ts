export class Keys {
    PORT: string = null;
    MONGO_URL: string = null;
    JWT_SECRET: string = null;
    URL: string = null;
    
    constructor() {
      try {
       
        require('dotenv').config();
      } catch (error) {}
      this.prepareKeys();
    }
  
    prepareKeys() {
      this.PORT = process.env.PORT;
      this.MONGO_URL = process.env.MONGO_URL;
     
      this.JWT_SECRET = process.env.JWT_SECRET;
      
      this.URL = process.env.URL;
      
    }
  }
  