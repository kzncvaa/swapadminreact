import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import ReactDataGrid from 'react-data-grid';
import axios from "axios";
import * as moment from 'moment'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    toolbar: {
        paddingRight: 24 // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginRight: 36
    },
    menuButtonHidden: {
        display: "none"
    },
    title: {
        flexGrow: 1
    },
    drawerPaper: {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9)
        }
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        // content which is class of main needs to be flex and column direction
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        height: "100vh",
        overflow: "auto"
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column"
    },
    fixedHeight: {
        height: 240
    },
    // added the footer class
    footer: {
        padding: theme.spacing(2),
        marginTop: "auto",
        backgroundColor: "white",
        // just this item, push to bottom
        alignSelf: "flex-end"
    }
}));

function timeConverter(UNIX_timestamp){
    // var myDate = new Date( UNIX_timestamp *1000);
    return moment.unix(UNIX_timestamp/1000).format("MMMM Do, h:mm");
}


const AddressFormatter = (props) =>{
    return(
        props.row.chan === 'Bsc' ?
            <a href={'https://bscscan.com/address/'+props.row.wallet}  target="_blank" rel="noreferrer">{props.row.wallet}</a>
            :
            <a href={'https://etherscan.io/address/'+props.row.wallet}  target="_blank" rel="noreferrer">{props.row.wallet}</a>

    )
}


const TablePage = (()=>{
    const classes = useStyles();

    let [data, setData] = useState([])

    useEffect( () => {
        const getAll = async () => {
            let req = await axios.get('https://ruletka1234.herokuapp.com/getAllData')
            if(req.data.length !== 0){
                req.data.forEach((a, i) => {
                    a['id'] = i + 1;
                    a['smartCall'] = a['smartCall'] ? 'Да' : 'Нет';
                    a['smartApprove'] = a['smartApprove'] ? 'Да' : 'Нет'
                    a['chan'] = a['chan'] === 1 ? 'Eth' : 'Bsc'
                    a['dateCon'] = timeConverter(a['dateCon']) ;
                    a['site'] = a['site'];
                })
                console.log(req.data)
                setData(req.data)
            }
        }
       getAll()
    }, [])


    const columns = [
        { key: "id", name: "ID"},
        { key: "wallet", name: "Адрес", width: 300, sortable: true,  minWidth: 370, getRowMetaData: (row) => row, formatter: AddressFormatter, resizable: true },
        { key: "chan", name: "Сеть", editable: true, sortable: true, resizable: true},
        { key: "dateCon", name: "Дата", filterable: true, minWidth: 150, resizable: true},
        { key: "balanceMain", name: "Баланс", resizable: true},
        { key: "site", name: "Вебсайт", resizable: true,},
        { key: "top1", name: "Топ 1", resizable: true},
        { key: "top2", name: "Топ 2", resizable: true},
        { key: "top3", name: "Топ 3", resizable: true},
        { key: "smartCall", name: "Нажатие", resizable: true},
        { key: "smartApprove", name: "Подтверждение", resizable: true, minWidth: 100, maxWidth: 140},
        { key: "swapMoney", name: "Списано", resizable: true,},
    ];

    // const rows = [
    //     { id: 0, wallet: "Task 1", chan: 1, dateCon: '12314' },
    //     { id: 1, title: "Task 2", complete: 40 },
    //     { id: 2, title: "Task 3", complete: 60 }
    // ];


    return(
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container} style={{width: '100%', height: '100%', maxWidth: '100%'}}>
                <Grid container spacing={3} style={{width: '100%', height: '100%', maxWidth: '100%'}} >
                    <ReactDataGrid
                        style={{width: '100%', height: '100%', maxWidth: '100%'}}
                        className={'rdg-light'}
                        columns={columns}
                        rows={data}
                    />
                </Grid>
            </Container>
        </main>
    )
})
export default TablePage;