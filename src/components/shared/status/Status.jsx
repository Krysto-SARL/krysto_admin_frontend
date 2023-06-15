import './status.css'

function Status({text, statusType}) {
  return (
    <div className={`status collect-${statusType}`} >{text}</div>
  )
}

export default Status