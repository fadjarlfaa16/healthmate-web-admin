interface Profile {
  fullname?: string;
  domicle?: string;
  age?: number;
  imagePath?: string;
}

export interface User {
  email: string;
  password: string;
  profile: Profile;
  accountCreated: number;
}

export interface UserWithId extends User {
  id: string;
}

export interface Doctor {
  fullname: string;
  age: number;
  based: string;
  contact: string;
  specialist: string;
  appointmentCount?: number;
  profile?: string;
}

export interface DoctorWithId extends Doctor {
  id: string;
}

export interface Appointment {
  based: string;
  /** juga number: hasil Timestamp.toMillis() */
  createdAt: number;
  date: string;
  doctorId: string;
  doctorName: string;
  specialist: string;
  time: string;
  userId: string;
  status: string;
}

export interface AppointmentWithId extends Appointment {
  id: string;
}
