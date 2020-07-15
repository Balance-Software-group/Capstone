import React from 'react'

const TextContainer = ({users}) => {
  return (
    <div>
      {users ? (
        <div>
          <h2>
            {users.map(({name}) => (
              <div key={name} className="activeItem">
                {name}
              </div>
            ))}
          </h2>
        </div>
      ) : null}
    </div>
  )
}

export default TextContainer
