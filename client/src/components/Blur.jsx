// its a blur gradient of orange, red and pink thats like a ball in the right corner

const Blur = ({coordinates="top-0 right-0"}) => {
  return (
    
    <div className={`absolute ${coordinates} w-96 h-96 bg-gradient-to-tr from-orange-400 via-red-500 to-pink-500 rounded-full filter blur-3xl opacity-30 -z-20`}></div>
  )
}
export default Blur