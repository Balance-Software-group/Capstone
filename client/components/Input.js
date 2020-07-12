import React from 'react'

const Input = ({message, setMessage, sendMessage}) => {
  return (
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="Type your guesses here!"
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyPress={e => (e.key === 'Enter' ? sendMessage(e) : null)}
      />
      <button className="sendButton" onClick={e => sendMessage(e)}>
        Send
      </button>
    </form>
  )
}

export default Input

//Semantic Form

{
  /*<Form>
    //<Form.TextArea>
     <Form.Input 
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null} /> 
        </Form.TextArea>
         <Form.Input value= {message} 
        onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}/> 
        /* <Button
        content="Add Reply"
        labelPosition="left"
        icon="edit"
        primary
        /> */
  /* <Button type="submit" onClick={e => sendMessage(e)}>
        Submit
        </Button>
</Form> */
}
