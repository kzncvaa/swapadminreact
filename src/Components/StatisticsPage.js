import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React, {useState, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Orders from "./Orders";
import clsx from "clsx";
import axios from "axios";
import ReactDataGrid from "react-data-grid";


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

const StatiscticsPage = (() => {
    const [destination, setDestination] = useState('');
    const [slashtag, setSlashtag] = useState('');
    let [data, setData] = useState([])

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const columns = [
        {key: "id", name: "ID", frozen: true},
        {key: "site", name: "Сайт", frozen: true},
        {key: "link", name: "Короткая ссылка", editable: true},
        {key: "clicks", name: "Количество кликов", filterable: true}
    ];

    useEffect(() => {
        getLinks()
        // const getAll = async () => {
        //     let req = await axios.get('https://ruletka1234.herokuapp.com/getAllData')
        //     if(req.data.length !== 0){
        //         req.data.forEach((a, i) => {
        //             a['id'] = i + 1;
        //             a['smartCall'] = a['smartCall'] ? 'Да' : 'Нет';
        //             a['smartApprove'] = a['smartApprove'] ? 'Да' : 'Нет'
        //             a['chan'] = a['chan'] === 1 ? 'Eth' : 'Bsc'
        //         })
        //         console.log(req.data)
        //         setData(req.data)
        //     }
        // }
        // getAll()
    }, [])


    function getCountOfList() {
        const options = {
            method: 'GET',
            url: 'https://api.rebrandly.com/v1/links/count',
            headers: {Accept: 'application/json', apikey: '338ac7f8595e416f8eeb1f56d687389b'}
        };

        let count;
        axios.request(options).then(function (response) {
            console.log(response.data.count);
            count = response.data.count
        }).catch(function (error) {
            console.error(error);
            return error
        });
        return count;
    }

    let getLinks = async () => {
        const options = {
            method: 'GET',
            url: 'https://api.rebrandly.com/v1/links',
            params: {orderBy: 'createdAt', orderDir: 'desc', limit: '25'},
            headers: {Accept: 'application/json', apikey: '338ac7f8595e416f8eeb1f56d687389b'}
        };

        let newDataTable = [];
        try {
            let response = await axios.request(options);

            response.data.forEach((a, i) => {
                newDataTable.push({
                    id: i + 1,
                    site: a.destination,
                    link: a.shortUrl,
                    clicks: a.clicks,
                    idItem: a.id
                })
            })
        } catch (e) {
        }

        try {
            let currentId = newDataTable[newDataTable.length - 1].idItem
            let currentIdNum = newDataTable[newDataTable.length - 1].id
            while (true) {
                const options = {
                    method: 'GET',
                    url: 'https://api.rebrandly.com/v1/links',
                    params: {
                        orderBy: 'createdAt',
                        orderDir: 'desc',
                        limit: '25',
                        last: currentId
                    },
                    headers: {Accept: 'application/json', apikey: '338ac7f8595e416f8eeb1f56d687389b'}
                };

                let response = await axios.request(options)
                if (response.data.length !== 0) {
                    response.data.forEach((a, i) => {
                        newDataTable.push({
                            id: currentIdNum + i + 1,
                            site: a.destination,
                            link: a.shortUrl,
                            clicks: a.clicks,
                            idItem: a.id
                        })
                    })

                    currentId = newDataTable[newDataTable.length - 1].idItem
                    currentIdNum = newDataTable[newDataTable.length - 1].id

                    if (response.data.length < 25)
                        break
                } else {
                    break
                }
            }
        } catch (e) { }

        setData(newDataTable)
        return newDataTable;
    }

    //
    // function getAll() {
    //     let dataTable = [];
    //     let last;
    //     for (let i=0; i<=getCountOfList(); i+=25){
    //         last ? dataTable.push(getLinks(last)) : dataTable.push(getLinks())
    //         last =  dataTable[dataTable.length].id
    //     }
    //     return dataTable;
    // }
    //
    // function getDataTable() {
    //     let tableData = [];
    //     getLinks().forEach((a,i)=>{
    //         let newStr = {id: null, site: null, link: null, clicks: null}
    //         newStr.id = a[i].id
    //         newStr.site = a[i].id
    //         newStr.link = a[i].id
    //         newStr.clicks = a[i].id
    //         tableData.push(newStr)
    //     })
    //     return tableData;
    // }


    function addNewLink(destination, slashtag) {
        const options = {
            method: 'POST',
            url: 'https://api.rebrandly.com/v1/links',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                apikey: '338ac7f8595e416f8eeb1f56d687389b'
            },
            data: {destination: destination, slashtag: slashtag}
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
            setSlashtag('')
            setDestination('')
            alert('Ссылка успешно добавлена')
            getLinks()

        }).catch(function (error) {
            console.error(error);
            alert('Ошибка добавления. Измените параметры')
        });

    }

    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer}/>
            <Container className={classes.container}>
                <Grid container spacing={3}>
                    {/* Добавить новый */}
                    <Grid item xs={12}>
                        <Paper style={{padding: '1rem'}}>
                            <Grid style={{margin: "1rem"}}>
                                <h3>Добавить новую ссылку</h3>
                                <Grid style={{margin: "1rem 0"}}>
                                    <TextField id="outlined-basic" label="Ссылка" variant="outlined"
                                               style={{width: '100%'}}
                                               value={destination} onInput={e => setDestination(e.target.value)}
                                    />
                                </Grid>
                                <Grid item style={{margin: "1rem 0"}}>
                                    <TextField id="outlined-basic" label="Сокращение" variant="outlined"
                                               style={{width: '100%'}}
                                               value={slashtag} onInput={e => setSlashtag(e.target.value)}
                                    />
                                </Grid>
                                <Grid item style={{margin: "1rem 0"}}>
                                    <Button variant="contained"
                                            onClick={() => addNewLink(destination, slashtag)}>Добавить</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Grid style={{margin: "1rem"}}>
                                <h3>Все ссылки</h3>
                                <ReactDataGrid
                                    className={'rdg-light'}
                                    columns={columns}
                                    rows={data}
                                />
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </main>
    )
})
export default StatiscticsPage;