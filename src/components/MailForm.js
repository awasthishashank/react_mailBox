import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { sendMail } from '../../src/store/mailActions';

const MailForm = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const dispatch = useDispatch();

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const mail = {
      to,
      subject,
      body,
      timestamp: new Date().toISOString(), // Convert Date to ISO string
    };
    dispatch(sendMail(mail));
    setTo('');
    setSubject('');
    setEditorState(EditorState.createEmpty());
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formTo">
        <Form.Label>To</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter recipient email"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formSubject">
        <Form.Label>Subject</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBody">
        <Form.Label>Body</Form.Label>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={handleEditorChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Send
      </Button>
    </Form>
  );
};

export default MailForm;
