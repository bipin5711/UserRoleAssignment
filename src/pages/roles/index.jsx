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
import { addRole, updateRole, deleteRole } from "../../redux/slice/roleSlice";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./index.css";
import * as Yup from "yup";

const roleSchema = Yup.object().shape({
  roleKey: Yup.string().required("Role key is required"),
  roleLabel: Yup.string().required("Role label is required"),
});

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
export default function Roles() {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.roles);
  const [editRoleIndex, setEditRoleIndex] = useState(null);
  const [showModal, setShowModal] = useState({
    state: false,
    type: "",
    initialValues: {},
  });
  const handleClose = () => {
    setShowModal({ state: false, type: "" });
    setEditRoleIndex(null);
  };
  const handleOpenModal = (type, data) => {
    setShowModal({
      state: true,
      type: type,
      initialValues: type === "edit" ? data : { roleLabel: "", roleKey: "" },
    });
  };

  return (
    <Layout>
      <Box className="title-container">
        <Typography variant="h4">Roles</Typography>
        <Button onClick={() => handleOpenModal("add")} variant="contained">
          Add Role
        </Button>
      </Box>
      {roles.length == 0 ? (
        <Typography variant="h6">No Record found</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Role Label </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="h6">Role Key</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((row, index) => (
                <TableRow
                  key={row?.roleKey}
                  // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row?.roleLabel}
                  </TableCell>
                  <TableCell>{row?.roleKey}</TableCell>
                  <TableCell align="right" className="flex-container">
                    <EditIcon
                      onClick={() => {
                        setEditRoleIndex(index);
                        handleOpenModal("edit", row);
                      }}
                    />
                    <DeleteIcon
                      onClick={() => {
                        dispatch(deleteRole(index));
                      }}
                    />
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
            {showModal.type == "add" ? "Add Role" : "Edit Role"}
          </Typography>
          <Formik
            initialValues={showModal.initialValues}
            validationSchema={roleSchema}
            enableReinitialize={true}
            onSubmit={(values, { setSubmitting }) => {
              if (showModal.type == "edit") {
                dispatch(updateRole({ data: values, index: editRoleIndex }));
              } else {
                dispatch(addRole(values));
              }
              handleClose();
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
              setFieldValue,
            }) => (
              <Form>
                <Field
                  value={values.roleLabel}
                  label="Role Label"
                  name="roleLabel"
                  setFieldValue={setFieldValue}
                  as={TextField}
                  error={errors.roleLabel}
                  fullWidth
                />

                <Field
                  value={values.roleKey}
                  setFieldValue={setFieldValue}
                  label="Role Key"
                  name="roleKey"
                  as={TextField}
                  error={errors.roleKey}
                  fullWidth
                />
                <div>
                  <Button
                    variant="contained"
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
            )}
          </Formik>
        </Box>
      </Modal>
    </Layout>
  );
}
