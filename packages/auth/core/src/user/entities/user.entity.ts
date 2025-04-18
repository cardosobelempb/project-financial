enum Roles {
  ADMIN,
  USER,
  CLIENT,
  SUPPLIER
}

export default interface User {
  id:        string    
  name:      string    
  email:     string    
  password?:  string
  role?:      Roles     
  createdAt: Date 
  updatedAt?: Date
}