
const Card = ({children,bg='bg-indigo-100'}) => {
  return (
    <div className={`p-6 ${bg} rounded-lg shadow-md`}>{children}</div>
  )
}

export default Card 