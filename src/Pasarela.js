import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Iframe from 'react-iframe'

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";
import CardHeader from "@material-ui/core/CardHeader";

import { Alert, AlertTitle } from '@material-ui/lab';
import LinearProgress from '@material-ui/core/LinearProgress';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/HowToReg';
import Tooltip from '@material-ui/core/Tooltip';
import Swal from 'sweetalert2'

import { io } from "socket.io-client";
const ENDPOINT = /*"localhost:3100";*/"https://server-node-widget.herokuapp.com";

export default function Pasarela(param) {
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(0);
    const [tmensaje, setTmensaje] = React.useState("");
    const [tmensaje_ok, setTmensaje_ok] = React.useState({});
    const [este_dispositivo, setEste_dispositivo] = React.useState();

    const [xqr1, setXqr1] = React.useState("");
    const [foto, setFoto] = React.useState("");
    const [autent, setAutent] = React.useState("");
    const [response, setResponse] = React.useState("");

    //leemos y asignamos las variables
    console.log('esto recibio el widget', param);
    console.log('esto recibio el widget', param.param);
    var dataPago;

    var data = param.param !== undefined ? param.param : param;
    console.log('data limpio:', data);

    if (data.data_pago) {
        dataPago = eval(data.data_pago);
    }
    console.log('dataPago: ', dataPago);

    //#region configuracion del socket
    const [rtaAPI, setRtaAPI] = useState({});
    const [flagCanal, setFlagCanal] = useState(false);

    console.log('1obj:', rtaAPI);
    useEffect(() => {
        console.log('2obj:', rtaAPI);

        console.log('numero ref: ', dataPago.numeroreferencia)
        if (Object.keys(rtaAPI).length === 0) {
            const socket = io(ENDPOINT, { transports: ['websocket'] })
            socket.on(dataPago.numeroreferencia, msj => {
                console.log('esto llego ', msj)
                setRtaAPI(msj)
            })

            setFlagCanal(false)
            return () => {
                socket.off();
            }
        }
    }, [ENDPOINT, flagCanal])

    useEffect(() => {
        console.log('3obj:', rtaAPI);
        if (Object.keys(rtaAPI).length > 0) {
            console.log('obj: ', Object.keys(rtaAPI))
            setRtaAPI({})
            setOpen(false)
            setOpen1(false)
            if (rtaAPI.message === 'Multicash procesado') {
                Swal.fire({
                    title: "Pago realizado",
                    text: "El multicash se proceso con exito",
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#5CB85C',
                    reverseButtons: true
                })
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Error al procesar el pago",
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#D33',
                    reverseButtons: true
                })
            }
        }
    }, [rtaAPI])
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
    console.log(vdatos_config);
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
                    setXqr1(refer.Link);
                    setOpen1(4)
                }
            })
            .catch(error => console.log('error', error));

    };

    const handleClose = () => {
        setOpen(false);
        setOpen1(0)

        // channel.unbind_all();
        // //channel.unsubscribe();
        // pusher.disconnect();
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

    React.useEffect(() => {
        inicio_session(este_dispositivo)
    }, [este_dispositivo]);

    const Boton1 = () => {
        if (data.tipo_boton === 1)
            return a;
        else
            return b;
    }

    const conmutador = () => {
        return (0)
        // if (open1 === 0) {
        //     return (0)
        // } else {
        //     if (este_dispositivo)
        //         return (4)
        //     else
        //         return open1
        // }
    }

    const Accion_boton = (record) => {
        switch (record.xx2) {
            case "imagenes":
                return <Button variant="contained" color="primary" onClick={() => { setFlagCanal(true); setEste_dispositivo(true); /*setOpen1(4);*/ }} fullWidth>
                    Pagar
                </Button>;
            default:
                return <div />;
        }
    };

    function name(e) {
        dataPago.numeroreferencia = e.target.value;
    }

    switch (conmutador()) {
        case 0:
            console.log('entro al switch 0')
            return (
                <div>
                    <label>Numero referencia</label>
                    <input type="text" onChange={(e) => name(e)} />
                    <Boton1 />
                    {rtaAPI.message}
                    <Dialog open={open} disableBackdropClick onClose={handleClose} aria-labelledby="form-dialog-title"  >
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
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancelar
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            );
        case 1:
            console.log('entro al switch 1')
            return (
                <div>
                    <Boton1 />
                    <Dialog open={open} disableBackdropClick onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true} >
                        <DialogTitle id="form-dialog-title">Verificacion Biometrica</DialogTitle>
                        <DialogContent>
                            <Card >
                                <CardContent>
                                    <Alert severity="error">
                                        <AlertTitle>Error</AlertTitle>
                                        <br />
                                        {tmensaje}
                                        <br />
                                        _____________________________________________
                                        <br />
                                        Comuniquese con el soporte.....
                                    </Alert>
                                </CardContent>
                            </Card>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Salir
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            );
        case 2:
            console.log('entro al switch 2')
            return (
                <div>
                    <Boton1 />
                    <Dialog open={open} disableBackdropClick onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
                        <DialogTitle id="form-dialog-title">Verificacion Biometrica</DialogTitle>
                        <DialogContent>
                            <Card >
                                <CardContent>
                                    <div width="100%">
                                        <Alert severity="info" >
                                            <AlertTitle>Info</AlertTitle>
                                            <br />
                                            Inicio el proceso de verificacion en otro dispositivo, por favor espera.....
                                        </Alert>
                                        <br />
                                        <LinearProgress />
                                    </div>
                                </CardContent>
                            </Card>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Salir
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            );
        case 3:
            console.log('entro al switch 3')
            return (
                <div>
                    <Boton1 />
                    <Dialog open={open} disableBackdropClick onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true} >
                        <DialogTitle id="form-dialog-title">Verificacion Biometrica</DialogTitle>
                        <DialogContent>
                            <Card >
                                <CardContent>
                                    <Alert severity="success" >
                                        <AlertTitle>Verificacion Exitosa</AlertTitle>
                                        <Divider variant="fullWidth" />
                                        <CardHeader
                                            title={tmensaje_ok.documentNumber}
                                            subheader={tmensaje_ok.fullName}
                                            avatar={<img alt="img" src={foto} width="150" height="150" />}
                                        />
                                        <br />
                                        {"Origen del documento: " + tmensaje_ok.nationality_full}
                                        <br />
                                        {"El documento enrolado es: " + autent}
                                        <br />
                                        {tmensaje_ok.documentNumber}
                                        <br />
                                        <br />
                                        {"Ha completado con éxito el proceso de verificación de identidad. Ahora puede cerrar esta ventana."}
                                    </Alert>
                                </CardContent>

                            </Card>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Salir
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            );
        case 4:
            console.log('entro al switch 4')
            return (
                <div>
                    <Boton1 />
                    <Dialog open={open} disableBackdropClick onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true} scroll={"body"}>
                        <DialogTitle id="form-dialog-title">Pasarela de pago</DialogTitle>
                        <DialogContent>
                            <Iframe url={xqr1}
                                width="100%"
                                height="550px"
                                id="myId"
                                styles={{ background: "#856767", border: "none" }}
                                position="relative" />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Salir
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            );
        default:
            return <div />;
    }
}