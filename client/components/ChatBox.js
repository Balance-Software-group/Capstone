import React from 'react'
import {Button, Comment, Form, Header} from 'semantic-ui-react'

export const ChatBox = () => {
  return (
    <div>
      <Comment.Group>
        <Header as="h3" dividing>
          Type your guesses here and chat with your friends!
        </Header>
        <Form reply>
          <Form.TextArea />
          <Button
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            primary
          />
        </Form>
      </Comment.Group>
    </div>
  )
}

export default ChatBox
