export interface User {
  name: String
  email: String
  password: String
  phoneNumber: String
}

export type NewDairyEntry = Omit<DairyEntry, 'id'>
