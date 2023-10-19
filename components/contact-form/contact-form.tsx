"use client";

import { useState } from "react";
import { Collapse, Alert, Form, Button, Spinner } from "react-bootstrap";
import { GETFORM_ENDPOINT_URL } from "../../constants/constants";
import "./contact-form.scss";

export default function ContactForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    setError("");
    setSuccess(false);
    setLoading(true);

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const url = GETFORM_ENDPOINT_URL || "";

        if (!url) {
          throw new Error("Coś poszło nie tak.");
        }

        await fetch(url, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            email,
            message,
          }),
          cache: "no-store",
        });

        setSuccess(true);
      } catch (err: any) {
        setError(err.message);
      }
    }

    setLoading(false);
    setValidated(true);
  };

  const changeEmail = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => setEmail(value);

  const changeMessage = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => setMessage(value);

  return (
    <div>
      <h2 className="contact-form__title">Skontaktuj się z nami</h2>
      <Collapse in={Boolean(error)}>
        <div>
          <Alert variant="danger">{error}</Alert>
        </div>
      </Collapse>
      <Collapse in={success}>
        <div>
          <Alert variant="success">
            Wiadomość została wysłana. Dziękujemy!
          </Alert>
        </div>
      </Collapse>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Control
            type="email"
            placeholder="Adres e-mail"
            required
            value={email}
            onChange={changeEmail}
          />
          <Form.Control.Feedback type="invalid">
            Wprowadź poprawny adres e-mail
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="message">
          <Form.Control
            required
            as="textarea"
            placeholder="Co masz nam do powiedzenia?"
            style={{ height: "100px" }}
            value={message}
            onChange={changeMessage}
          />
          <Form.Control.Feedback type="invalid">
            Wiadomość jest wymagana
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          className="contact-form__submit"
          variant="primary"
          type="submit"
        >
          {loading ? <Spinner animation="border" /> : "Wyślij"}
        </Button>
      </Form>
    </div>
  );
}
