// import React, { useState, useReducer } from 'react';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';

// import Iframe from 'react-iframe'

// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';
// import Divider from "@material-ui/core/Divider";
// import CardHeader from "@material-ui/core/CardHeader";

// import { Alert, AlertTitle } from '@material-ui/lab';
// import LinearProgress from '@material-ui/core/LinearProgress';

// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/HowToReg';
// import Tooltip from '@material-ui/core/Tooltip';
// import Swal from 'sweetalert2'

// import { io } from "socket.io-client";
// const ENDPOINT = /*"localhost:3100";*/"https://server-node-widget.herokuapp.com";

// let valAux = 0;
// let rtaAPI = [];
// export default function Pasarela(param) {
//     const [open, setOpen] = React.useState(false);
//     const [este_dispositivo, setEste_dispositivo] = React.useState();

//     const [xqr1, setXqr1] = React.useState("");

//     //leemos y asignamos las variables
//     // console.log('esto recibio el widget', param);
//     // console.log('esto recibio el widget', param.param);
//     var dataPago;
//     var data = param.param !== undefined ? param.param : param;
//     // console.log('data limpio:', data);

//     if (data.data_pago) {
//         dataPago = eval(data.data_pago);
//     }
//     // console.log('dataPago: ', dataPago);

//     //#region configuracion del socket
//     //const [rtaAPI, setRtaAPI] = useState([]);

//     // console.log('1obj:', rtaAPI);

//     const [, updateState] = React.useState();
//     const forceUpdate = React.useCallback(() => updateState(valAux), []);


//     //let forceUpdate = useForceUpdate(valAux);

//     const interval = setInterval(() => {
//         console.log('entro al setInterval')
//         if (rtaAPI.length === 0) {
//             const socket = io(ENDPOINT, { transports: ['websocket'] })
//             console.log('creamos canal')
//             socket.on(dataPago.numeroreferencia, msj => {
//                 console.log('abrio canal ', msj, Object.keys(msj))
//                 const a = {
//                     valor: 1
//                 };
//                 rtaAPI.push(a)
//                 //setRtaAPI([...rtaAPI, a]);
//                 valAux = 1;
//                 forceUpdate()
//                 console.log('antes del if: ', rtaAPI)

//                 if (Object.keys(msj).length > 0) {
//                     console.log('entro al if del msj: ', { rtaAPI })
//                     if (msj.message === 'Multicash procesado') {
//                         console.log('ok')
//                         const a = {
//                             valor: 2
//                         };
//                         rtaAPI.push(a)
//                         //setRtaAPI([...rtaAPI, a]);
//                         valAux = 1;
//                         forceUpdate()
//                         console.log('valor rtaApi: ', { rtaAPI })
//                         socket.off()
//                         socket.disconnect()
//                         clearInterval(interval)
//                     } else {
//                         console.log('error')
//                         const a = {
//                             valor: 3
//                         };
//                         rtaAPI.push(a)
//                         //setRtaAPI([...rtaAPI, a]);
//                         valAux = 2;
//                         forceUpdate()
//                         console.log('valor rtaApi: ', { rtaAPI })
//                         socket.off()
//                         socket.disconnect()
//                         clearInterval(interval)
//                     }
//                 }
//                 socket.off()
//                 socket.disconnect()
//                 clearInterval(interval)
//             })
//         } else {
//             clearInterval(interval)
//         }
//     }, 20000);


//     // useEffect(() => {
//     //     console.log('2obj:', rtaAPI);
//     //     console.log('numero ref: ', dataPago.numeroreferencia)
//     //     if (Object.keys(rtaAPI).length === 0) {
//     //         console.log('abri canal')
//     //         const socket = io(ENDPOINT, { transports: ['websocket'] })
//     //         socket.on(dataPago.numeroreferencia, msj => {
//     //             console.log('esto llego ', msj)
//     //             setRtaAPI(msj)
//     //             setOpen(false)
//     //             handleClose()
//     //             if (Object.keys(msj).length > 0) {
//     //                 console.log('obj: ', Object.keys(msj))
//     //                 console.log('dentro- open: ', open)
//     //                 setOpen(false)
//     //                 handleClose()
//     //                 if (msj.message === 'Multicash procesado') {
//     //                     Swal.fire({
//     //                         title: "Pago realizado",
//     //                         text: "El multicash se proceso con exito",
//     //                         icon: 'success',
//     //                         confirmButtonText: 'Aceptar',
//     //                         confirmButtonColor: '#5CB85C',
//     //                         reverseButtons: true
//     //                     })
//     //                 } else {
//     //                     Swal.fire({
//     //                         title: "Error",
//     //                         text: "Error al procesar el pago",
//     //                         icon: 'error',
//     //                         confirmButtonText: 'Aceptar',
//     //                         confirmButtonColor: '#D33',
//     //                         reverseButtons: true
//     //                     })
//     //                 }
//     //             }
//     //             setOpen(false)
//     //             handleClose()
//     //         })
//     //         socket.on("closeModal_" + dataPago.numeroreferencia, msj => {
//     //             console.log('sockect cierre modal ', msj)
//     //             setOpen(false)
//     //             handleClose()
//     //         })
//     //         // return () => {
//     //         //     setOpen(false)
//     //         //     handleClose()
//     //         //     socket.off();
//     //         // }
//     //     }
//     // })

//     // useEffect(() => {
//     //     console.log('3obj:', rtaAPI);
//     //     if (Object.keys(rtaAPI).length > 0) {
//     //         console.log('obj: ', Object.keys(rtaAPI))
//     //         setRtaAPI({})
//     //         setOpen(false)
//     //         if (rtaAPI.message === 'Multicash procesado') {
//     //             Swal.fire({
//     //                 title: "Pago realizado",
//     //                 text: "El multicash se proceso con exito",
//     //                 icon: 'success',
//     //                 confirmButtonText: 'Aceptar',
//     //                 confirmButtonColor: '#5CB85C',
//     //                 reverseButtons: true
//     //             })
//     //         } else {
//     //             Swal.fire({
//     //                 title: "Error",
//     //                 text: "Error al procesar el pago",
//     //                 icon: 'error',
//     //                 confirmButtonText: 'Aceptar',
//     //                 confirmButtonColor: '#D33',
//     //                 reverseButtons: true
//     //             })
//     //         }
//     //     }
//     // }, [rtaAPI])
//     //#endregion configuracion del socket

//     let param_titulo = data.titulo;
//     let param_configura = data.configura;

//     if (param_titulo == null) {
//         param_titulo = "PROCESO DE VERIFICACION";
//     }

//     if (param_configura == null) {
//         param_configura = "0||1";
//     }

//     let vconf = param_configura;
//     var vdatos_config = vconf.split("|");
//     console.log(vdatos_config);
//     //vdatos[0] - tipo
//     //vdatos[1] - identificacion
//     //vdatos[2] - enrola si
//     if (vdatos_config[2] === "1") {
//         vdatos_config[2] = true
//     } else {
//         vdatos_config[2] = false
//     }

//     const handleClickOpen = () => {
//         setOpen(true);
//     }

//     const inicio_session = (si_iframe) => {
//         var myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/json");

//         var raw = JSON.stringify({
//             "nombre": dataPago.nombre,
//             "tipoidentificacion": dataPago.tipoidentificacion,
//             "numeroidentificacion": dataPago.numeroidentificacion,
//             "correo": dataPago.correo,
//             "compania": dataPago.compania,
//             "importetotal": dataPago.importetotal,
//             "importesubtotal": dataPago.importesubtotal,
//             "importeiva": dataPago.importeiva,
//             "fechaemision": dataPago.fechaemision,
//             "fechavencimiento": dataPago.fechavencimiento,
//             "numeroreferencia": dataPago.numeroreferencia,
//             "numeroreferenciaorigen": dataPago.numeroreferenciaorigen
//         });

//         var requestOptions = {
//             method: 'POST',
//             headers: myHeaders,
//             body: raw,
//             redirect: 'follow'
//         };

//         fetch("https://app-firmas1.herokuapp.com/link_pago", requestOptions)
//             .then(response => response.text())
//             .then(result => {
//                 let refer = JSON.parse(result);
//                 console.log(refer);
//                 if (refer.Link !== '') {
//                     setXqr1(refer.Link);
//                 }
//             })
//             .catch(error => console.log('error', error));

//     };

//     const handleClose = async () => {
//         setOpen(false);
//         clearInterval(interval)
//     };

//     const Carta = (record) => {
//         return (
//             <Card align='center'>
//                 <CardContent>
//                     <Typography variant="h5" component="h2">
//                         {record.record.titulo}
//                     </Typography>
//                     <Typography align='left' color="textSecondary" gutterBottom>
//                         <br />
//                         <b>Comprador:</b> {record.record.nombreComprador}
//                     </Typography>
//                     <Typography align='left' color="textSecondary" gutterBottom>
//                         <br />
//                         <b>referencia:</b> {record.record.numeroReferencia}
//                     </Typography>
//                     <Typography align='left' color="textSecondary" gutterBottom>
//                         <br />
//                         <b>Email:</b> {record.record.emailComprador}
//                     </Typography>
//                     <Typography align='left' color="textSecondary" gutterBottom>
//                         <br />
//                         <b>Total:</b> {record.record.importeTotal}
//                     </Typography>
//                 </CardContent>
//                 <CardActions align='center'>
//                     <Accion_boton xx2={record.record.campo} />
//                 </CardActions>
//             </Card>
//         )
//     };

//     const a = <Button
//         fullWidth
//         variant="contained"
//         onClick={handleClickOpen}
//         color="primary">
//         {param_titulo}
//     </Button>;

//     const b = <Tooltip title={param_titulo}>
//         <IconButton edge="start" color="inherit" aria-label="firma del documento" onClick={handleClickOpen} >
//             <MenuIcon fontSize="large" />
//         </IconButton>
//     </Tooltip>;

//     // React.useEffect(() => {
//     //     inicio_session(este_dispositivo)
//     // }, [este_dispositivo]);

//     const Boton1 = () => {
//         if (data.tipo_boton === 1)
//             return a;
//         else
//             return b;
//     }

//     const Accion_boton = (record) => {
//         switch (record.xx2) {
//             case "imagenes":
//                 return <Button variant="contained" color="primary" onClick={() => { inicio_session(true); setEste_dispositivo(true); }} fullWidth>
//                     Pagar
//                 </Button>;
//             default:
//                 return <div />;
//         }
//     };

//     function name(e) {
//         dataPago.numeroreferencia = e.target.value;
//         dataPago.numeroreferenciaorigen = e.target.value;
//     }


//     return (
//         <div>
//             <label>Numero referencia</label>
//             <input type="text" onChange={(e) => name(e)} />
//             <Boton1 />
//             {/* {rtaAPI.message} */}
//             <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true} scroll={"body"} >
//                 {xqr1 === "" && (rtaAPI.length !== 2 || rtaAPI.length !== 3) ?
//                     <DialogContent>
//                         <DialogContentText align='center'>
//                             <Typography variant="h5" component="h2">
//                                 Confirmar inicio del proceso de pago
//                             </Typography>
//                             Daremos inicio al proceso de pago con los siguientes datos, por favor confirme si son correctos:
//                         </DialogContentText>

//                         <Carta record={{
//                             titulo: "Datos de la compra",
//                             nombreComprador: dataPago.nombre,
//                             emailComprador: dataPago.correo,
//                             importeTotal: dataPago.importetotal,
//                             numeroReferencia: dataPago.numeroreferencia,
//                             campo: "imagenes",
//                             qr: false
//                         }} />
//                     </DialogContent>
//                     : xqr1 !== "" && (rtaAPI.length !== 2 || rtaAPI.length !== 3) ?
//                         <DialogContent>
//                             <Iframe url={xqr1}
//                                 width="100%"
//                                 height="550px"
//                                 id="myId"
//                                 styles={{ background: "#856767", border: "none" }}
//                                 position="relative" />
//                         </DialogContent>
//                         : xqr1 !== "" && rtaAPI.length === 2 ?
//                             <DialogContent>
//                                 <Typography variant="h5" component="h2">
//                                     Pago exitoso
//                                 </Typography>
//                             </DialogContent>
//                             : xqr1 !== "" && rtaAPI.length === 3 ?
//                                 <DialogContent>
//                                     <Typography variant="h5" component="h2">
//                                         Pago fallido
//                                     </Typography>
//                                 </DialogContent>
//                                 : null
//                 }
//                 <DialogActions>
//                     <Button onClick={handleClose} color="primary">
//                         {xqr1 === "" ? 'Cancelar' : 'Salir'}
//                     </Button>
//                 </DialogActions>
//             </Dialog>


//         </div>
//     );
// }


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
    const [openFinal, setOpenFinal] = React.useState(false);
    const [este_dispositivo, setEste_dispositivo] = React.useState();

    const [xqr1, setXqr1] = React.useState("");

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
    const [rtaAPI, setRtaAPI] = useState(0);

    console.log('1obj:', rtaAPI);

    const asd = setInterval(() => {
        console.log('entro al timeout')
        if (rtaAPI === 0) {
            console.log('abri canal')
            const socket = io(ENDPOINT, { transports: ['websocket'] })
            socket.on(dataPago.numeroreferencia, msj => {
                console.log('esto llego ', msj)
                setRtaAPI(1)
                // setOpen(false)
                // handleClose()
                if (Object.keys(msj).length > 0) {
                    console.log('obj: ', Object.keys(msj))
                    console.log('dentro- open: ', open)
                    // setOpen(false)
                    // handleClose()
                    if (msj.message === 'Multicash procesado') {
                        console.log('ok')
                        setRtaAPI(2)
                        setOpenFinal(true)
                        socket.off()
                        socket.disconnect()
                        clearInterval(asd)
                        // Swal.fire({
                        //     title: "Pago realizado",
                        //     text: "El multicash se proceso con exito",
                        //     icon: 'success',
                        //     confirmButtonText: 'Aceptar',
                        //     confirmButtonColor: '#5CB85C',
                        //     reverseButtons: true
                        // })
                    } else {
                        console.log('error')
                        setRtaAPI(3)
                        socket.off()
                        socket.disconnect()
                        clearInterval(asd)

                        // Swal.fire({
                        //     title: "Error",
                        //     text: "Error al procesar el pago",
                        //     icon: 'error',
                        //     confirmButtonText: 'Aceptar',
                        //     confirmButtonColor: '#D33',
                        //     reverseButtons: true
                        // })
                    }
                    socket.off()
                    socket.disconnect()
                    clearInterval(asd)
                }
                // setOpen(false)
                // handleClose()
                clearInterval(asd)
            })
            //socket.off();
        } else {
            clearInterval(asd)
        }
    }, 10000);


    // useEffect(() => {
    //     console.log('2obj:', rtaAPI);

    //     console.log('numero ref: ', dataPago.numeroreferencia)
    //     if (Object.keys(rtaAPI).length === 0) {
    //         console.log('abri canal')
    //         const socket = io(ENDPOINT, { transports: ['websocket'] })
    //         socket.on(dataPago.numeroreferencia, msj => {
    //             console.log('esto llego ', msj)
    //             setRtaAPI(msj)
    //             setOpen(false)
    //             handleClose()
    //             if (Object.keys(msj).length > 0) {
    //                 console.log('obj: ', Object.keys(msj))
    //                 console.log('dentro- open: ', open)
    //                 setOpen(false)
    //                 handleClose()
    //                 if (msj.message === 'Multicash procesado') {
    //                     Swal.fire({
    //                         title: "Pago realizado",
    //                         text: "El multicash se proceso con exito",
    //                         icon: 'success',
    //                         confirmButtonText: 'Aceptar',
    //                         confirmButtonColor: '#5CB85C',
    //                         reverseButtons: true
    //                     })
    //                 } else {
    //                     Swal.fire({
    //                         title: "Error",
    //                         text: "Error al procesar el pago",
    //                         icon: 'error',
    //                         confirmButtonText: 'Aceptar',
    //                         confirmButtonColor: '#D33',
    //                         reverseButtons: true
    //                     })
    //                 }
    //             }
    //             setOpen(false)
    //             handleClose()
    //         })

    //         socket.on("closeModal_" + dataPago.numeroreferencia, msj => {
    //             console.log('sockect cierre modal ', msj)
    //             setOpen(false)
    //             handleClose()
    //         })

    //         // return () => {
    //         //     setOpen(false)
    //         //     handleClose()
    //         //     socket.off();
    //         // }
    //     }
    // })

    function crack(data) {
        console.log('3obj:', data);
        console.log('open: ', open)
        if (Object.keys(data).length > 0) {
            console.log('obj: ', Object.keys(data))
            console.log('dentro- open: ', open)

            setOpen(false)
            if (data.message === 'Multicash procesado') {
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
    }

    // useEffect(() => {
    //     console.log('3obj:', rtaAPI);
    //     if (Object.keys(rtaAPI).length > 0) {
    //         console.log('obj: ', Object.keys(rtaAPI))
    //         setRtaAPI({})
    //         setOpen(false)
    //         if (rtaAPI.message === 'Multicash procesado') {
    //             Swal.fire({
    //                 title: "Pago realizado",
    //                 text: "El multicash se proceso con exito",
    //                 icon: 'success',
    //                 confirmButtonText: 'Aceptar',
    //                 confirmButtonColor: '#5CB85C',
    //                 reverseButtons: true
    //             })
    //         } else {
    //             Swal.fire({
    //                 title: "Error",
    //                 text: "Error al procesar el pago",
    //                 icon: 'error',
    //                 confirmButtonText: 'Aceptar',
    //                 confirmButtonColor: '#D33',
    //                 reverseButtons: true
    //             })
    //         }
    //     }
    // }, [rtaAPI])
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
                }
            })
            .catch(error => console.log('error', error));

    };

    const handleClose = async () => {
        setOpen(false);
        clearInterval(asd)
    };

    const test = async () => {
        setOpenFinal(false)
        clearInterval(asd)
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

    // React.useEffect(() => {
    //     inicio_session(este_dispositivo)
    // }, [este_dispositivo]);

    const Boton1 = () => {
        if (data.tipo_boton === 1)
            return a;
        else
            return b;
    }

    const Accion_boton = (record) => {
        switch (record.xx2) {
            case "imagenes":
                return <Button variant="contained" color="primary" onClick={() => { inicio_session(true); setEste_dispositivo(true); }} fullWidth>
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
            {/* {rtaAPI.message} */}
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true} scroll={"body"} >
                {xqr1 === "" && rtaAPI !== 2 ?
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
                    : xqr1 !== "" && rtaAPI !== 2 ?
                        <DialogContent>
                            <Iframe url={xqr1}
                                width="100%"
                                height="550px"
                                id="myId"
                                styles={{ background: "#856767", border: "none" }}
                                position="relative" />
                        </DialogContent>
                        : xqr1 !== "" && rtaAPI === 2 ?
                            <DialogContent>
                                <DialogContentText align='center'>
                                    <Typography variant="h5" component="h2">
                                        Pago exitoso
                                    </Typography>
                                </DialogContentText>


                            </DialogContent> : null
                }
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {xqr1 === "" ? 'Cancelar' : 'Salir'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
