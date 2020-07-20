import React from 'react'
import {Form} from 'semantic-ui-react'

const Input = ({message, setMessage, sendMessage}) => {
  return (
    <Form className="form">
      <input
        className="input"
        type="text"
        placeholder="Start chatting!"
        value={message}
        onChange={({target: {value}}) => setMessage(value)}
        onKeyPress={e => (e.key === 'Enter' ? sendMessage(e) : null)}
      />
      {/* <button className="sendButton" type="submit" onClick={e => sendMessage(e) && setMessage('')}>
        Send
      </button> */}
    </Form>
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
