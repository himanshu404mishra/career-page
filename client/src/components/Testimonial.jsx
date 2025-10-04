import Blur from './Blur'

const Testimonial = () => {
  return (
    <div>
        <section className="h-screen flex items-center justify-center flex-col gap-10 relative">
        <Blur coordinates={"left-0 bottom-0"}/>

        <p className="montserrat-semiBold text-center text-4xl tracking-normal">
          The Company truly values work life balance and flexibility. We work hard and deliver, but at the end of the day you can switch off.
        </p>
       <div className="flex flex-col items-center justify-center gap-2">
         <img src="https://media.istockphoto.com/id/1389348844/photo/studio-shot-of-a-beautiful-young-woman-smiling-while-standing-against-a-grey-background.jpg?s=612x612&w=0&k=20&c=anRTfD_CkOxRdyFtvsiPopOluzKbhBNEQdh4okZImQc=" width={80} alt="" srcSet="" className="rounded-full size-28" />
        <div className="flex flex-col items-center">
          <p className="montserrat-bold">Jecika Sullivan</p>
        <span>Web Developer</span>
        </div>
       </div>
      </section></div>
  )
}

export default Testimonial