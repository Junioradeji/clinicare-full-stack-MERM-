import useMetaArgs from "../../hooks/useMeta";
import { RiUserLine, RiGroupLine, RiHeartPulseLine, RiBuildingLine, RiShieldLine, RiPulseLine, RiCalendarScheduleFill, RiCalendarScheduleLine, RiCalendarCheckFill, RiCalendarEventFill, RiCalendarFill, RiCalendarTodoLine, RiCalendarView, RiCalendar2Fill, RiCalendarCheckLine, RiGenderlessLine, RiUserHeartLine, RiDashboard2Line, RiDashboardFill, RiBarChart2Fill, RiBarChartHorizontalLine, RiBarChart2Line, RiBarChartBoxAiLine, RiBarChartBoxAiFill, RiLineChartLine, RiArrowUpBoxFill, RiDatabase2Line, RiChat2Fill, RiBillLine, RiReceiptLine, RiNotification2Line, RiFileTextLine } from "@remixicon/react";
import { Link } from "react-router";
export default function Home() {

    useMetaArgs({
        title: "Home,Clinic",
        description: "Welcome to Clinicare, your health companion.",
        keywords: "healthcare, Clinic, Hospital, Patient, Doctor",
    });
  return (
    <div>
      <div className="bg-blue-100">
      <div className="container mx-auto flex flex-col items-center justify-end py-5 px-4 max-w-[600px] min-h-[450px]">
        <h1 className="text-4xl md:text-5xl font-bold text-center">Welcome to
        <br/>
        <span className="text-orange-500 text-6xl md:text-7xl">Clinicare</span>
        </h1>
        <p className="mt-8 text-center text-zinc-800">Manage your hospital operations, patient records, and more with our powerful hospital management system.</p>
        {/* button div */}
        <div className="mt-8 flex gap-4 items-center justify-center">
          <Link to="/account/signup" className="btn btn-primary font-normal text-white-100 ">New Patient</Link>
          <Link to="/account/signin" className="btn  text-blue-300 bg-blue-100 ">Login to Clinicare</Link>
          
        </div>
      </div>
        {/* hero img */}
      <div className="container mx-auto px-4  mt-10 md:w-[70%] md:h-[500px]">
          <img src="/ipadHero.png" alt="ipad dashboard " className="h-full w-full rounded-xl "/>
        </div>
        </div>
         {/* Every user */}
    <div className="container mx-auto py-5 px-4 my-10">
    
       <h1 className="text-3xl font-weight-700 font-bold text-[#130A5C] text-center">Key Features to Simplify Hospital Management <span><p className="text-zinc-800 font-normal text-xl md:text-lg p-4">Comprehensive tools designed to enhance efficiency, improve patient care, and <br />streamline hospital operations </p></span> </h1>

       
       {/* user colum */}
       <div className="grid grid-cols-12 mt-8 gap-4 lg:gap-8">
       <div className="flex flex-col justify-center items-center md:items-start col-span-12 md:col-span-4 bg-white p-8 rounded-lg  shadow-lg border-gray-500  border h-[250px]">
       <div className="bg-blue-100 rounded-full w-15 h-15 p-2"><RiCalendarScheduleLine size={40} className="text-blue-400 "/></div>
       <h2 className="text-xl font-bold md:py-3 ">Appointment Scheduling</h2>
       <p className="text-zinc-800 mb-4 text-center md:text-start">Let patients book and reschedule their appointments easily online real-time availability and automated confirmation.</p>
       
       </div>
       <div className="flex flex-col justify-center items-center md:items-start col-span-12 md:col-span-4 bg-white p-8 rounded-lg shadow-lg border-gray-500 text-center border h-[250px]">
         <div className="bg-[#FFD7FF] rounded-full w-15 h-15 p-2"><RiUserHeartLine size={40} className="text-red-300 "/></div>
       <h2 className="text-xl font-bold md:py-3 md:text-start">Doctor & Department Management</h2>
       <p className="text-zinc-800 mb-4 text-center md:text-start">Secure access for doctors to manage patients, appointments, diagnosis etc.</p>
       </div>
       <div className="flex flex-col justify-center items-center  md:items-start col-span-12 md:col-span-4 bg-white p-8 rounded-lg shadow-lg border-gray-500 text-center border h-[250px]">
         <div className="bg-green-100 rounded-full w-15 h-15 p-2"><RiLineChartLine size={40} className="text-[#02DB02] "/></div>
       <h2 className="text-xl font-bold md:py-3 md:text-start">Analytic Dashboard</h2>
       <p className="text-zinc-800 mb-4 text-center md:text-start">Get real-time insights into bookings, patient visits, revenue, and operational performance.</p>
       
       </div>
       <div className="flex flex-col justify-center items-center md:items-start col-span-12 md:col-span-4 bg-white p-8 rounded-lg shadow-lg border-gray-500 text-center border h-[250px]">
         <div className="bg-red-100 rounded-full w-15 h-15 p-2"><RiReceiptLine size={40} className="text-red-400 "/></div>
       <h2 className="text-xl font-bold md:py-3 md:text-start">Billing & Invoicing</h2>
       <p className="text-zinc-800 mb-4 text-center md:text-start">Generate invoices, track payments, and integrate with insurance providers seamlessly.</p>
       </div>
<div className="flex flex-col justify-center items-center md:items-start col-span-12 md:col-span-4 bg-white p-8 rounded-lg shadow-lg border-gray-500 text-center border h-[250px]">
         <div className="bg-orange-100 rounded-full w-15 h-15 p-2"><RiNotification2Line size={40} className="text-[#FFA500] "/></div>
       <h2 className="text-xl font-bold md:py-3 md:text-start">Automated Reminder</h2>
       <p className="text-zinc-800 mb-4 text-center md:text-start">Send SMS and email alerts for appointments, follow-ups, and medication reminders automatically.</p>
       </div>

       <div className="flex flex-col justify-center items-center md:items-start col-span-12 md:col-span-4 bg-white p-8 rounded-lg shadow-lg border-gray-500 text-center border h-[250px]">
         <div className="bg-purple-100 rounded-full w-15 h-15 p-2"><RiFileTextLine size={40} className="text-[#8100FA] "/></div>
       <h2 className="text-xl font-bold md:py-3 md:text-start">Electronic Medical Records</h2>
       <p className="text-zinc-800 mb-4 text-center md:text-start">Store, access, and update patient records securely with comprehensive digital health documentation.</p>
       </div>

       </div>
    </div>
    {/* features */}
    <div className="container mx-auto py-5 px-4 my-14">
      <h1 className="text-xl md:text-2xl font-bold text-center">How it works</h1>
      <p className="text-lg md:text-md font-normal text-center py-3">Simple steps to transform your hospital management and improve patient <br /> experience</p>
      
      <div className="grid grid-cols-12 gap-6 lg:gap-8 mt-8 relative" id="#how">
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-gray-300 transform -translate-x-1/2 z-0" />
          {/* hospital profile */}
          <div className="md:flex justify-center items-center gap-8 bg-white col-span-12 rounded-xl shadow-2xl lg:shadow-none p-2 md:p-0">
            {/* text */}
            <div className=" max-w-xl">
              <div className="bg-[#1055F8] rounded-full w-10 h-10 flex justify-center items-center mb-2">
                <h1 className="font-bold text-white text-xl">1</h1>
              </div>
              <h2 className="text-xl font-semibold mb-2">
                Sign Up and Set Up Your Hospital Profile
              </h2>
              <p className="text-zinc-800 mb-4">
                Add departments, doctors, rooms, and schedules to create a
                comprehensive hospital management system tailored to your
                facility.
              </p>
            </div>
            {/* img */}
            <div>
              <img src="/img1.jpg" alt="img-1" className="w-full" />
            </div>
          </div>

          {/* online booking */}
          <div className="md:flex flex-row-reverse justify-center items-center gap-25 bg-white col-span-12 rounded-xl shadow-2xl lg:shadow-none p-2 md:p-0 ">
            <div className=" max-w-xl">
              <div className="bg-[#1055F8] rounded-full w-10 h-10 flex justify-center items-center mb-2">
                <h1 className="font-bold text-white text-xl">2</h1>
              </div>
              <h2 className="text-xl font-semibold mb-2">
                Enable Online Booking
              </h2>
              <p className="text-zinc-800 mb-4">
                Patients can view doctor availability and schedule appointments
                online through an intuitive booking interface available 24/7.
              </p>
            </div>
            {/* img */}
            <div>
              <img src="/bookingimg.png" alt="img of doctor" className="w-full" />
            </div>
          </div>
          {/* appointment */}
          <div className="md:flex justify-center items-center gap-8 bg-white col-span-12 rounded-xl shadow-2xl lg:shadow-none p-2 md:p-0">
            <div className=" max-w-xl">
              <div className="bg-[#1055F8] rounded-full w-10 h-10 flex justify-center items-center mb-2">
                <h1 className="font-bold text-white text-xl">3</h1>
              </div>
              <h2 className="text-xl font-semibold mb-2">
                Manage Appointments And Record
              </h2>
              <p className="text-zinc-800 mb-4">
                Hospital staff can efficiently manage patient queues, update
                medical records, and send automated reminders from a centralized
                dashboard.
              </p>
            </div>

            {/* img */}
            <div>
              <img src="/nurseHero.jpg" alt="img of nurse" className="w-full" />
            </div>
          </div>
          {/* track everything */}
          <div className="md:flex flex-row-reverse justify-center items-center gap-25 bg-white col-span-12 rounded-xl shadow-2xl lg:shadow-none p-2 md:p-0">
            <div className=" max-w-[520px]">
              <div className="bg-[#1055F8] rounded-full w-10 h-10 flex justify-center items-center mb-2">
                <h1 className="font-bold text-white text-xl">4</h1>
              </div>
              <h2 className="text-xl font-semibold mb-2">
                Track Everything In One Dashboard
              </h2>
              <p className="text-zinc-800 mb-4">
                View comprehensive analytics including appointments, patient
                data, revenue metrics, and performance insights to optimize
                hospital operations.
              </p>
            </div>
            {/* img */}
            <div>
              <img
                src="/laptopHero.jpg"
                alt="img of computer"
                className="w-full"
              />
            </div>
          </div>
        </div>
    </div>
 
    {/*  */}
    <div className="my-20 py-5 px-4 bg-blue-500">
      <div className="container mx-auto grid grid-cols-12 gap-4 lg:gap-8">
      {/* hospital */}
      <div className="flex flex-col justify-center items-center text-white p-4 h-[100px] md:h-[200px] text-center col-span-12 md:col-span-3">
        <h1 className="text-4xl font-bold pb-2">100+</h1>
        <p>Hospital</p>
      </div>
      {/* Healthcare */}
       <div className="flex flex-col justify-center items-center text-white p-4 h-[100px] md:h-[200px] text-center col-span-12 md:col-span-3">
        <h1 className="text-4xl font-bold pb-2">1000+</h1>
        <p>Healthcare Professionals</p>
      </div>
      {/* patients served */}
       <div className="flex flex-col justify-center items-center text-white p-4 h-[100px] md:h-[200px] text-center col-span-12 md:col-span-3">
        <h1 className="text-4xl font-bold pb-2">1M+</h1>
        <p>patients Served</p>
      </div>
      {/* System Uptime */}
       <div className="flex flex-col justify-center items-center text-white p-4 h-[100px] md:h-[200px] text-center col-span-12 md:col-span-3">
        <h1 className="text-4xl font-bold pb-2">99.9%</h1>
        <p>System Uptime</p>
      </div>
      </div>
    </div>
    {/* ready to transform */}
    <div className="container mx-auto py-5 px-4 mt-20 pb-10 flex flex-col justify-center items-center gap-4 text-center">
      <h1 className="text-3xl font-bold">Ready to Transform Your Hospital Experience?</h1>
      <p>Take advantage of our awesome services and enjoy rich healthcare experience at the comfort of your home.</p>
      <Link to="/account/signin" className="btn bg-blue-500 text-white ">Get Started</Link>
    </div>
    </div>
  )
}