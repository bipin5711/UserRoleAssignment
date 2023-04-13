import { Button, Typography, Box, Modal } from "@mui/material";
import React, { useState } from "react";
import Layout from "../../layout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Formik, Field, Form } from "formik";
import TextField from "../../components/textfield";
import { addUser, updateUser, deleteUser } from "../../redux/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import Select from "../../components/select";
import * as Yup from "yup";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const userSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Name is required"),

  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Username is required"),

  roleKey: Yup.string().required("Role is required"),

  mobile: Yup.string()
    .required("mobile number is required")
    .min(10, "Invalid mobile number")
    .max(10, "Invalid mobile number"),

  email: Yup.string().email().required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password is too short - should be 6 chars minimum"),
});

export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const roles = useSelector((state) => state.roles);
  const [editUserIndex, setEditUserIndex] = useState(null);
  const [showModal, setShowModal] = useState({
    state: false,
    type: "",
    initialValues: {},
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleClose = () => {
    setShowModal({ state: false, type: "" });
    setEditUserIndex(null);
  };
  const handleOpenModal = (type, data) => {
    setShowModal({
      state: true,
      type: type,
      initialValues:
        type === "edit"
          ? data
          : {
              name: "",
              email: "",
              username: "",
              mobile: "",
              roleKey: "",
              password: "",
            },
    });
  };
  const handleSubmit = (values, { setSubmitting }) => {
    if (showModal.type == "edit") {
      dispatch(updateUser({ data: values, index: editUserIndex }));
    } else {
      dispatch(addUser(values));
    }
    handleClose();
  };
  return (
    <Layout>
      <Box className="title-container">
        <Typography variant="h4">Users</Typography>
        <Button onClick={() => handleOpenModal("add")} variant="contained">
          Add User
        </Button>
      </Box>
      {users.length == 0 ? (
        <Typography variant="h6">No Record found</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Name</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="h6">Email</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="h6">Username</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="h6">Mobile</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="h6">Role</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row, index) => (
                <TableRow
                  key={row?.name}
                  // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row?.name}
                  </TableCell>
                  <TableCell align="left">{row?.email}</TableCell>
                  <TableCell align="left">{row?.username}</TableCell>
                  <TableCell align="left">{row?.mobile}</TableCell>
                  <TableCell align="left">{row?.roleKey}</TableCell>
                  <TableCell align="right">
                    <div className="flex-container">
                      <Button
                        onClick={() => {
                          setEditUserIndex(index);
                          handleOpenModal("edit", { ...row, password: "" });
                        }}
                        variant="outlined"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          dispatch(deleteUser(index));
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Modal open={showModal.state} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6">
            {showModal.type == "add" ? "Add User" : "Edit User"}
          </Typography>
          <Formik
            initialValues={showModal.initialValues}
            validationSchema={userSchema}
            enableReinitialize={true}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              isSubmitting,
              setFieldValue,
            }) => {
              return (
                <Form>
                  <Field
                    value={values.name}
                    label="Name"
                    name="name"
                    setFieldValue={setFieldValue}
                    as={TextField}
                    error={errors.name}
                    fullWidth
                  />
                  <Field
                    value={values.username}
                    setFieldValue={setFieldValue}
                    label="Username"
                    name="username"
                    as={TextField}
                    error={errors.username}
                    fullWidth
                  />
                  <Field
                    value={values.email}
                    setFieldValue={setFieldValue}
                    label="Email"
                    name="email"
                    as={TextField}
                    error={errors.email}
                    fullWidth
                  />
                  <Field
                    value={values.roleKey}
                    setFieldValue={setFieldValue}
                    label="Role"
                    options={roles}
                    handleChange={(e, val) => {
                      setFieldValue("roleKey", e.target.value);
                    }}
                    name="roleKey"
                    as={Select}
                    error={errors.roleKey}
                    // fullWidth
                  />
                  <Field
                    value={values.mobile}
                    setFieldValue={setFieldValue}
                    label="Mobile"
                    name="mobile"
                    as={TextField}
                    error={errors.mobile}
                    fullWidth
                  />
                  <Field
                    value={values.password}
                    setFieldValue={setFieldValue}
                    label="Password"
                    name="password"
                    as={TextField}
                    error={errors.password}
                    fullWidth
                  />
                  <div>
                    <Button
                      variant="contained"
                      // className="submit-button"
                      onClick={handleClose}
                      style={{ marginRight: "20px" }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting}
                      className="submit-button"
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Modal>
    </Layout>
  );
}
