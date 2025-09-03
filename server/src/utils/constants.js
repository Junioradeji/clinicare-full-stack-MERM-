export const roomType = ["Regular", "VIP", "ICU", "Deluxe", "Suite"];
export const roomStatus = ["available", "occupied", "maintenance"];
export const roomInfo = [
  {
    roomNumber: 1,
    roomType: "Regular",
    roomPrice: 10000,
    roomDescription: "Regular room",
    roomCapacity: 2,
    isFilled: false,
  },
  {
    roomNumber: 2,
    roomType: "VIP",
    roomPrice: 20000,
    roomDescription: "VIP room",
    roomCapacity: 2,
    isFilled: false,
  },
  {
    roomNumber: 3,
    roomType: "ICU",
    roomPrice: 30000,
    roomDescription: "ICU room",
    roomCapacity: 2,
    isFilled: false,
  },
  {
    roomNumber: 4,
    roomType: "Deluxe",
    roomPrice: 40000,
    roomDescription: "Deluxe room",
    roomCapacity: 5,
    isFilled: false,
  },
  {
    roomNumber: 5,
    roomType: "Suite",
    roomPrice: 50000,
    roomDescription: "Suite room",
    roomCapacity: 4,
    isFilled: false,
  },
  {
    roomNumber: 6,
    roomType: "Regular",
    roomPrice: 10000,
    roomDescription: "Regular room",
    roomCapacity: 5,
    isFilled: false,
  },
  {
    roomNumber: 7,
    roomType: "VIP",
    roomPrice: 20000,
    roomDescription: "VIP room",
    roomCapacity: 2,
    isFilled: false,
  },
  {
    roomNumber: 8,
    roomType: "ICU",
    roomPrice: 30000,
    roomDescription: "ICU room",
    roomCapacity: 2,
    isFilled: false,
  },
  {
    roomNumber: 9,
    roomType: "Deluxe",
    roomPrice: 40000,
    roomDescription: "Deluxe room",
    roomCapacity: 2,
    isFilled: false,
  },
  {
    roomNumber: 10,
    roomType: "Suite",
    roomPrice: 50000,
    roomDescription: "Suite room",
    roomCapacity: 2,
    isFilled: false,
  },
  {
    roomNumber: 11,
    roomType: "Regular",
    roomPrice: 10000,
    roomDescription: "Regular room",
    roomCapacity: 2,
    isFilled: false,
  },
  {
    roomNumber: 12,
    roomType: "VIP",
    roomPrice: 20000,
    roomDescription: "VIP room",
    roomCapacity: 2,
    isFilled: false,
  },
  {
    roomNumber: 13,
    roomType: "ICU",
    roomPrice: 30000,
    roomDescription: "ICU room",
    roomCapacity: 2,
    isFilled: false,
  },
  {
    roomNumber: 14,
    roomType: "Deluxe",
    roomPrice: 40000,
    roomDescription: "Deluxe room",
    roomCapacity: 2,
    isFilled: false,
  },
  {
    roomNumber: 15,
    roomType: "Suite",
    roomPrice: 50000,
    roomDescription: "Suite room",
    roomCapacity: 2,
    isFilled: false,
  },
];

export const doctorsTableColumns = [
  { name: "DOCTOR NAME", uid: "fullname" },
  { name: "PHONE", uid: "phone" },
  { name: "SPECIALIZATION", uid: "specialization" },
  { name: "STATUS", uid: "availability" },
  { name: "ACTION", uid: "action" },
];

export const doctorsStatusColors = {
  available: "bg-green-200 text-green-700",
  unavailable: "bg-blue-200 text-blue-700",
  "on leave": "bg-yellow-200 text-yellow-700",
  sick: "bg-red-200 text-red-700",
};

export const patientsAppointmentsTableColumns = [
  { name: "APPOINTMENT ID", uid: "appointmentId" },
  { name: "DATE", uid: "appointmentDate" },
  { name: "DOCTOR", uid: "doctor" },
  { name: "TIME", uid: "appointmentTime" },
  { name: "STATUS", uid: "status" },
  { name: "ACTION", uid: "action" },
];

export const appointmentsStatusColors = {
  scheduled: "bg-yellow-200 text-yellow-700",
  confirmed: "bg-green-200 text-green-700",
  cancelled: "bg-red-200 text-red-700",
};

export const appointmentsTableColumns = [
  { name: "APPOINTMENT ID", uid: "appointmentId" },
  { name: "PATIENT", uid: "patientName" },
  { name: "DOCTOR", uid: "doctor" },
  { name: "DATE", uid: "appointmentDate" },
  { name: "TIME", uid: "appointmentTime" },
  { name: "STATUS", uid: "status" },
  { name: "ACTION", uid: "action" },
];

export const paymentsTableColumns = [
  { name: "PATIENT", uid: "patientName" },
  { name: "PAYMENT ID", uid: "paymentId" },
  { name: "PAYMENT TYPE", uid: "paymentType" },
  { name: "AMOUNT", uid: "amount" },
  { name: "STATUS", uid: "status" },
  { name: "PAID AT", uid: "paidAt" },
  { name: "ACTION", uid: "action" },
];

export const paymentStatusColors = {
  pending: "bg-yellow-200 text-yellow-700",
  confirmed: "bg-green-200 text-green-700",
  cancelled: "bg-red-200 text-red-700",
};

export const inpatientsTableColumns = [
  { name: "PATIENT", uid: "patientName" },
  { name: "DOCTOR", uid: "doctorName" },
  { name: "ROOM", uid: "room" },
  { name: "ADMISSION DATE", uid: "admissionDate" },
  { name: "DISCHARGE DATE", uid: "dischargeDate" },
  { name: "STATUS", uid: "status" },
  { name: "ACTION", uid: "action" },
];

export const inpatientStatusColors = {
  admitted: "bg-green-200 text-green-700",
  discharged: "bg-red-200 text-red-700",
  transferred: "bg-yellow-200 text-yellow-700",
};