import {
  Alert,
  Box,
  Button,
  Fab,
  IconButton,
  Modal,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Form, FormVenta } from "./components";
// import { useNavigate } from "react-router-dom";
import useEvento from "./hooks/useEvento";

import { DataGrid } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";
export const Evento = () => {
  const {
    openSnackbar,
    event,
    open,
    handleClose,
    handleCrearEvento,
    handleCloseSnackbar,
    messageSnackbar,
    events,
    handleOpenModal,
    columns,
    openVenta,
    handleCrearVenta,
  } = useEvento();

  return (
    <Box sx={{ p: 2, mt: 3, position: "relative", minHeight: "80vh" }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Eventos
      </Typography>
      {events.length === 0 ? (
        <Typography variant="h6">No hay eventos disponibles.</Typography>
      ) : (
        <Box sx={{ height: 600, width: "100%", maxWidth: 1200 }}>
          <DataGrid
            rows={events}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            disableSelectionOnClick
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            autoHeight={false}
          />
        </Box>
      )}
      <Fab
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        aria-label="Navigate"
        color="primary"
        onClick={handleOpenModal}
      >
        <AddIcon sx={{ mr: 1 }} />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "4px ",
            p: 4,
          }}
        >
          {" "}
          {openVenta ? (
            <FormVenta
              event={event}
              handleCrearVenta={handleCrearVenta}
              handleClose={handleClose}
            />
          ) : (
            <Form
              event={event}
              handleClose={handleClose}
              handleCrearEvento={handleCrearEvento}
            />
          )}
        </Box>
      </Modal>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {messageSnackbar}
        </Alert>
      </Snackbar>
    </Box>
  );
};
