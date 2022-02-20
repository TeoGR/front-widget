import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Card, CardActions, CardContent, Typography, IconButton, MenuIcon, Tooltip } from '@material-ui/core';
import Iframe from 'react-iframe'
import { io } from "socket.io-client";

const ENDPOINT = "https://server-node-widget.herokuapp.com";

export default function Pasarela(param) {
    const [open, setOpen] = React.useState(false);
    const [urlPasarela, setUrlPasarela] = React.useState("");

    //leemos y asignamos las variables
    //console.log('esto recibio el widget', param);
    //console.log('esto recibio el widget', param.param);
    var dataPago;

    var data = param.param !== undefined ? param.param : param;
    //console.log('data limpio:', data);

    if (data.data_pago) {
        dataPago = eval(data.data_pago);
    }
    //console.log('dataPago: ', dataPago);

    //#region configuracion del socket
    const [rtaAPI, setRtaAPI] = useState(0);

    //console.log('1obj:', rtaAPI);

    const intervalo = setInterval(() => {
        if (rtaAPI === 0 && urlPasarela !== "") {
            const socket = io(ENDPOINT, { transports: ['websocket'] })
            socket.on(dataPago.numeroreferencia, msj => {
                setRtaAPI(1)
                if (Object.keys(msj).length > 0) {
                    if (msj.message === 'Multicash procesado') {
                        setRtaAPI(2)
                        socket.off()
                        socket.disconnect()
                        clearInterval(intervalo)
                    } else {
                        setRtaAPI(3)
                        socket.off()
                        socket.disconnect()
                        clearInterval(intervalo)
                    }
                    socket.off()
                    socket.disconnect()
                    clearInterval(intervalo)
                }
                socket.off()
                socket.disconnect()
                clearInterval(intervalo)
            })
        } else {
            clearInterval(intervalo)
        }
    }, 10000);

    //#endregion configuracion del socket

    let param_titulo = data.titulo;
    let param_configura = data.configura;

    if (param_titulo == null) {
        param_titulo = "PROCESO DE VERIFICACION";
    }

    if (param_configura == null) {
        param_configura = "0||1";
    }

    let vconf = param_configura;
    var vdatos_config = vconf.split("|");
    //console.log(vdatos_config);
    //vdatos[0] - tipo
    //vdatos[1] - identificacion
    //vdatos[2] - enrola si
    if (vdatos_config[2] === "1") {
        vdatos_config[2] = true
    } else {
        vdatos_config[2] = false
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const inicio_session = (si_iframe) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "nombre": dataPago.nombre,
            "tipoidentificacion": dataPago.tipoidentificacion,
            "numeroidentificacion": dataPago.numeroidentificacion,
            "correo": dataPago.correo,
            "compania": dataPago.compania,
            "importetotal": dataPago.importetotal,
            "importesubtotal": dataPago.importesubtotal,
            "importeiva": dataPago.importeiva,
            "fechaemision": dataPago.fechaemision,
            "fechavencimiento": dataPago.fechavencimiento,
            "numeroreferencia": dataPago.numeroreferencia,
            "numeroreferenciaorigen": dataPago.numeroreferenciaorigen
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://app-firmas1.herokuapp.com/link_pago", requestOptions)
            .then(response => response.text())
            .then(result => {
                let refer = JSON.parse(result);
                console.log(refer);
                if (refer.Link !== '') {
                    setUrlPasarela(refer.Link);
                }
            })
            .catch(error => console.log('error', error));

    };

    const handleClose = async () => {
        setOpen(false);
        setUrlPasarela("");
        setRtaAPI(0);
        clearInterval(intervalo)
    };

    const Carta = (record) => {
        return (
            <Card align='center'>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {record.record.titulo}
                    </Typography>
                    <Typography align='left' color="textSecondary" gutterBottom>
                        <br />
                        <b>Comprador:</b> {record.record.nombreComprador}
                    </Typography>
                    <Typography align='left' color="textSecondary" gutterBottom>
                        <br />
                        <b>referencia:</b> {record.record.numeroReferencia}
                    </Typography>
                    <Typography align='left' color="textSecondary" gutterBottom>
                        <br />
                        <b>Email:</b> {record.record.emailComprador}
                    </Typography>
                    <Typography align='left' color="textSecondary" gutterBottom>
                        <br />
                        <b>Total:</b> {record.record.importeTotal}
                    </Typography>
                </CardContent>
                <CardActions align='center'>
                    <Accion_boton xx2={record.record.campo} />
                </CardActions>
            </Card>
        )
    };

    const a = <Button
        fullWidth
        variant="contained"
        onClick={handleClickOpen}
        color="primary">
        {param_titulo}
    </Button>;

    const b = <Tooltip title={param_titulo}>
        <IconButton edge="start" color="inherit" aria-label="firma del documento" onClick={handleClickOpen} >
            <MenuIcon fontSize="large" />
        </IconButton>
    </Tooltip>;

    const Boton1 = () => {
        if (data.tipo_boton === 1)
            return a;
        else
            return b;
    }

    const Accion_boton = (record) => {
        switch (record.xx2) {
            case "imagenes":
                return <Button variant="contained" color="primary" onClick={() => { inicio_session(true); }} fullWidth>
                    Pagar
                </Button>;
            default:
                return <div />;
        }
    };

    function name(e) {
        dataPago.numeroreferencia = e.target.value;
        dataPago.numeroreferenciaorigen = e.target.value;
    }

    return (
        <div>
            <label>Numero referencia</label>
            <input type="text" onChange={(e) => name(e)} />
            <Boton1 />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true} scroll={"body"} >
                {urlPasarela === "" && rtaAPI === 0 ?
                    <DialogContent>
                        <DialogContentText align='center'>
                            <Typography variant="h5" component="h2">
                                Confirmar inicio del proceso de pago
                            </Typography>
                            Daremos inicio al proceso de pago con los siguientes datos, por favor confirme si son correctos:
                        </DialogContentText>
                        <Carta record={{
                            titulo: "Datos de la compra",
                            nombreComprador: dataPago.nombre,
                            emailComprador: dataPago.correo,
                            importeTotal: dataPago.importetotal,
                            numeroReferencia: dataPago.numeroreferencia,
                            campo: "imagenes",
                            qr: false
                        }} />
                    </DialogContent>
                    : urlPasarela !== "" && (rtaAPI !== 2) ?
                        <DialogContent>
                            <Iframe url={urlPasarela}
                                width="100%"
                                height="550px"
                                id="myId"
                                styles={{ background: "#856767", border: "none" }}
                                position="relative" />
                        </DialogContent>
                        : urlPasarela !== "" && rtaAPI === 2 ?
                            <DialogContent>
                                <DialogContentText align='center'>
                                    <Typography variant="h5" component="h2">
                                        Pago exitoso
                                    </Typography>
                                </DialogContentText>
                            </DialogContent>
                            : urlPasarela !== "" && rtaAPI === 3 ?
                                <DialogContent>
                                    <DialogContentText align='center'>
                                        <Typography variant="h5" component="h2">
                                            No fue posible realizar el pago
                                        </Typography>
                                    </DialogContentText>
                                </DialogContent>
                                : null
                }
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {urlPasarela === "" ? 'Cancelar' : 'Salir'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}