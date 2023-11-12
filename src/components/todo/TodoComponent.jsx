import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createTodoApi,
  retrieveTodoApi,
  updateTodoApi,
} from "./api/TodoApiService";
import { AuthContext } from "./security/AuthContext";
import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment/moment";

export default function TodoComponent() {
  const { id } = useParams();
  const { username } = useContext(AuthContext);

  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    retrieveTodos();
  }, [id]);

  function retrieveTodos() {
    if (id !== -1) {
      retrieveTodoApi(username, id)
        .then((response) => {
          setDescription(response.data.description);
          setTargetDate(response.data.targetDate);
        })
        .catch((e) => console.log(e));
    }
  }
  function onSubmit(values) {
    console.log("values : ", values);
    const todo = {
      id,
      username,
      description: values.description,
      targetDate: values.targetDate,
      done: false,
    };
    console.log("todo : ", todo);
    if (id === -1) {
      createTodoApi(username, todo)
        .then((response) => {
          navigate("/todos");
        })
        .catch((e) => console.log(e));
    } else {
      updateTodoApi(username, id, todo)
        .then((response) => {
          console.log(response);
          navigate("/todos");
        })
        .catch((e) => console.log(e));
    }
  }
  function validate(values) {
    //console.log(values);
    let errors = {
      //description: 'Enter a descriptions',
    };
    if (values.description.length < 3) {
      errors.description = "Enter at least 3 characters.";
    }
    if (
      values.targetDate === null ||
      values.targetDate === "" ||
      !moment(values.targetDate).isValid()
    ) {
      errors.targetDate = "Enter targetDate.";
    }
    return errors;
  }
  return (
    <div className="container">
      <h1>Enter Todo Details</h1>
      <div>
        <Formik
          initialValues={{ description, targetDate }}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validate={validate}
          // validateOnChange={false}
          // validateOnBlur={false}
        >
          {(props) => (
            <Form>
              <ErrorMessage
                name="description"
                component="div"
                className="alert alert-warning"
              />
              <ErrorMessage
                name="targetDate"
                component="div"
                className="alert alert-warning"
              />
              <fieldset className="form-group">
                <label>Description</label>
                <Field
                  type="text"
                  className="form-control"
                  name="description"
                />
              </fieldset>
              <fieldset className="form-group">
                <label>Target date</label>
                <Field type="date" className="form-control" name="targetDate" />
              </fieldset>
              <div>
                <button type="submit" className="btn btn-success m-5">
                  save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
