import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import * as moment from 'moment'

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const localeText = {
    // Set Filter
    selectAll: '(Выбрать все)',
    selectAllSearchResults: '(Выбрать все результаты поиска)',
    searchOoo: 'Искать...',
    blanks: '(Пробелы)',
    noMatches: 'Нет совпадений',

    // Number Filter & Text Filter
    filterOoo: 'Фильтровать...',
    equals: 'Равно',
    notEqual: 'Не равно',
    blank: 'Пусто',
    notBlank: 'Не пусто',
    empty: 'Выберите один',

    // Number Filter
    lessThan: 'Меньше чем',
    greaterThan: 'Больше, чем',
    lessThanOrEqual: 'Меньше или равно',
    greaterThanOrEqual: 'Больше или равно',
    inRange: 'В пределах досягаемости',
    inRangeStart: 'от',
    inRangeEnd: 'до',

    // Text Filter
    contains: 'Содержит',
    notContains: 'Не содержит',
    startsWith: 'Начинается с',
    endsWith: 'Заканчивается на',

    // Date Filter
    dateFormatOoo: 'гггг-мм-дд',

    // Filter Conditions
    andCondition: 'И',
    orCondition: 'ИЛИ',

    // Filter Buttons
    applyFilter: 'Применить',
    resetFilter: 'Сброс',
    clearFilter: 'Очистить',
    cancelFilter: 'Отмена',

    // Filter Titles
    textFilter: 'Текстовый фильтр',
    numberFilter: 'Числовой фильтр',
    dateFilter: 'Фильтр даты',
    setFilter: 'Установить фильтр',

    // Side Bar
    columns: 'Столбцы',
    filters: 'Фильтры',

    // columns tool panel
    pivotMode: 'Поворотный режим',
    groups: 'Группы строк',
    rowGroupColumnsEmptyMessage: 'Drag here to set row groups',
    values: 'Values',
    valueColumnsEmptyMessage: 'Drag here to aggregate',
    pivots: 'Метки столбцов',
    pivotColumnsEmptyMessage: 'Перетащите сюда, чтобы установить метки столбцов',

    // Header of the Default Group Column
    group: 'Группа',

    // Row Drag
    rowDragRows:'Строки',

    // Other
    loadingOoo: 'Loading...',
    noRowsToShow: 'No Rows To Show',
    enabled: 'Enabled',

    // Menu
    pinColumn: 'Pin Column',
    pinLeft: 'Pin Left',
    pinRight: 'Pin Right',
    noPin: 'No Pin',
    valueAggregation: 'Value Aggregation',
    autosizeThiscolumn: 'Autosize This Column',
    autosizeAllColumns: 'Autosize All Columns',
    groupBy: 'Group by',
    ungroupBy: 'Un-Group by',
    addToValues: 'Add ${variable} to values',
    removeFromValues: 'Remove ${variable} from values',
    addToLabels: 'Add ${variable} to labels',
    removeFromLabels: 'Remove ${variable} from labels',
    resetColumns: 'Reset Columns',
    expandAll: 'Expand All',
    collapseAll: 'Close All',
    copy: 'Copy',
    ctrlC: 'Ctrl+C',
    copyWithHeaders: 'Copy With Headers',
    copyWithHeaderGroups: 'Copy With Header Groups',
    paste: 'Paste',
    ctrlV: 'Ctrl+V',
    export: 'Export',
    csvExport: 'CSV Export',
    excelExport: 'Excel Export',

    // Enterprise Menu Aggregation and Status Bar
    sum: 'Sum',
    min: 'Min',
    max: 'Max',
    none: 'None',
    count: 'Count',
    avg: 'Average',
    filteredRows: 'Filtered',
    selectedRows: 'Selected',
    totalRows: 'Total Rows',
    totalAndFilteredRows: 'Rows',
    more: 'More',
    to: 'to',
    of: 'of',
    page: 'Page',
    nextPage: 'Next Page',
    lastPage: 'Last Page',
    firstPage: 'First Page',
    previousPage: 'Previous Page',

    // Pivoting
    pivotColumnGroupTotals: 'Total',

    // Enterprise Menu (Charts)
    pivotChartAndPivotMode: 'Pivot Chart & Pivot Mode',
    pivotChart: 'Pivot Chart',
    chartRange: 'Chart Range',

    columnChart: 'Column',
    groupedColumn: 'Grouped',
    stackedColumn: 'Stacked',
    normalizedColumn: '100% Stacked',

    barChart: 'Bar',
    groupedBar: 'Grouped',
    stackedBar: 'Stacked',
    normalizedBar: '100% Stacked',

    pieChart: 'Pie',
    pie: 'Pie',
    doughnut: 'Doughnut',

    line: 'Line',

    xyChart: 'X Y (Scatter)',
    scatter: 'Scatter',
    bubble: 'Bubble',

    areaChart: 'Area',
    area: 'Area',
    stackedArea: 'Stacked',
    normalizedArea: '100% Stacked',

    histogramChart: 'Histogram',

    combinationChart: 'Combination',
    columnLineCombo: 'Column & Line',
    AreaColumnCombo: 'Area & Column',

    // Charts
    pivotChartTitle: 'Pivot Chart',
    rangeChartTitle: 'Range Chart',
    settings: 'Settings',
    data: 'Data',
    format: 'Format',
    categories: 'Categories',
    defaultCategory: '(None)',
    series: 'Series',
    xyValues: 'X Y Values',
    paired: 'Paired Mode',
    axis: 'Axis',
    navigator: 'Navigator',
    color: 'Color',
    thickness: 'Thickness',
    xType: 'X Type',
    automatic: 'Automatic',
    category: 'Category',
    number: 'Number',
    time: 'Time',
    xRotation: 'X Rotation',
    yRotation: 'Y Rotation',
    ticks: 'Ticks',
    width: 'Width',
    height: 'Height',
    length: 'Length',
    padding: 'Padding',
    spacing: 'Spacing',
    chart: 'Chart',
    title: 'Title',
    titlePlaceholder: 'Chart title - double click to edit',
    background: 'Background',
    font: 'Font',
    top: 'Top',
    right: 'Right',
    bottom: 'Bottom',
    left: 'Left',
    labels: 'Labels',
    size: 'Size',
    minSize: 'Minimum Size',
    maxSize: 'Maximum Size',
    legend: 'Legend',
    position: 'Position',
    markerSize: 'Marker Size',
    markerStroke: 'Marker Stroke',
    markerPadding: 'Marker Padding',
    itemSpacing: 'Item Spacing',
    itemPaddingX: 'Item Padding X',
    itemPaddingY: 'Item Padding Y',
    layoutHorizontalSpacing: 'Horizontal Spacing',
    layoutVerticalSpacing: 'Vertical Spacing',
    strokeWidth: 'Stroke Width',
    offset: 'Offset',
    offsets: 'Offsets',
    tooltips: 'Tooltips',
    callout: 'Callout',
    markers: 'Markers',
    shadow: 'Shadow',
    blur: 'Blur',
    xOffset: 'X Offset',
    yOffset: 'Y Offset',
    lineWidth: 'Line Width',
    normal: 'Normal',
    bold: 'Bold',
    italic: 'Italic',
    boldItalic: 'Bold Italic',
    predefined: 'Predefined',
    fillOpacity: 'Fill Opacity',
    strokeOpacity: 'Line Opacity',
    histogramBinCount: 'Bin count',
    columnGroup: 'Column',
    barGroup: 'Bar',
    pieGroup: 'Pie',
    lineGroup: 'Line',
    scatterGroup: 'X Y (Scatter)',
    areaGroup: 'Area',
    histogramGroup: 'Histogram',
    combinationGroup: 'Combination',
    groupedColumnTooltip: 'Grouped',
    stackedColumnTooltip: 'Stacked',
    normalizedColumnTooltip: '100% Stacked',
    groupedBarTooltip: 'Grouped',
    stackedBarTooltip: 'Stacked',
    normalizedBarTooltip: '100% Stacked',
    pieTooltip: 'Pie',
    doughnutTooltip: 'Doughnut',
    lineTooltip: 'Line',
    groupedAreaTooltip: 'Area',
    stackedAreaTooltip: 'Stacked',
    normalizedAreaTooltip: '100% Stacked',
    scatterTooltip: 'Scatter',
    bubbleTooltip: 'Bubble',
    histogramTooltip: 'Histogram',
    columnLineComboTooltip: 'Column & Line',
    areaColumnComboTooltip: 'Area & Column',
    customComboTooltip: 'Custom Combination',
    noDataToChart: 'No data available to be charted.',
    pivotChartRequiresPivotMode: 'Pivot Chart requires Pivot Mode enabled.',
    chartSettingsToolbarTooltip: 'Menu',
    chartLinkToolbarTooltip: 'Linked to Grid',
    chartUnlinkToolbarTooltip: 'Unlinked from Grid',
    chartDownloadToolbarTooltip: 'Download Chart',
    seriesChartType: 'Series Chart Type',
    seriesType: 'Series Type',
    secondaryAxis: 'Secondary Axis',

    // ARIA
    ariaChecked: 'checked',
    ariaColumn: 'Column',
    ariaColumnGroup: 'Column Group',
    ariaColumnList: 'Column List',
    ariaColumnSelectAll: 'Toggle Select All Columns',
    ariaDateFilterInput: 'Date Filter Input',
    ariaDefaultListName: 'List',
    ariaFilterColumnsInput: 'Filter Columns Input',
    ariaFilterFromValue: 'Filter from value',
    ariaFilterInput: 'Filter Input',
    ariaFilterList: 'Filter List',
    ariaFilterToValue: 'Filter to value',
    ariaFilterValue: 'Filter Value',
    ariaFilteringOperator: 'Filtering Operator',
    ariaHidden: 'hidden',
    ariaIndeterminate:'indeterminate',
    ariaInputEditor: 'Input Editor',
    ariaMenuColumn: 'Press CTRL ENTER to open column menu.',
    ariaRowDeselect: 'Press SPACE to deselect this row',
    ariaRowSelectAll: 'Press Space to toggle all rows selection',
    ariaRowToggleSelection: 'Press Space to toggle row selection',
    ariaRowSelect: 'Press SPACE to select this row',
    ariaSearch: 'Search',
    ariaSortableColumn: 'Press ENTER to sort',
    ariaToggleVisibility: 'Press SPACE to toggle visibility',
    ariaUnchecked: 'unchecked',
    ariaVisible: 'visible',
    ariaSearchFilterValues: 'Search filter values',

    // ARIA Labels for Drop Zones

    ariaRowGroupDropZonePanelLabel: 'Row Groups',
    ariaValuesDropZonePanelLabel: 'Values',
    ariaPivotDropZonePanelLabel: 'Column Labels',
    ariaDropZoneColumnComponentDescription: 'Press DELETE to remove',
    ariaDropZoneColumnValueItemDescription: 'Press ENTER to change the aggregation type',

    // ARIA Labels for Dialogs
    ariaLabelColumnMenu: 'Column Menu',
    ariaLabelCellEditor: 'Cell Editor',
    ariaLabelDialog: 'Dialog',
    ariaLabelSelectField: 'Select Field',
    ariaLabelTooltip: 'Tooltip',
    ariaLabelContextMenu: 'Context Menu',
    ariaLabelSubMenu: 'SubMenu',
    ariaLabelAggregationFunction: 'Aggregation Function',

    // Number Format (Status Bar, Pagination Panel)
    thousandSeparator: ',',
    decimalSeparator: '.'

}



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
        props.data.chan === 'Bsc' ?
            <a href={'https://bscscan.com/address/'+props.data.wallet}  target="_blank" rel="noreferrer">{props.data.wallet}</a>
            :
            <a href={'https://etherscan.io/address/'+props.data.wallet}  target="_blank" rel="noreferrer">{props.data.wallet}</a>

    )
}


const TablePage = (()=>{
    const classes = useStyles();


    let [data, setData] = useState([])
    let [wallet, setWallet] = useState([])

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
       getAll();
        getAddress();
    }, [])

    const getAddress = async () => {
        let req = await axios.get('https://ruletka1234.herokuapp.com/getApproveAddress')
        setWallet(req.data)
    }


    // Each Column Definition results in one Column.
    const [columnDefs, setColumnDefs] = useState([
        { field: "id", headerName: "ID", width: 80, resizable: true},
        { field: "wallet", headerName: "Адрес", width: 300,  minWidth: 370, getRowMetaData: (row) => row, cellRenderer: AddressFormatter, resizable: true , filter: true},
        { field: "chan", headerName: "Сеть", width: 100, resizable: true, filter: true},
        { field: "dateCon", headerName: "Дата", filterable: true, width: 150, resizable: true},
        { field: "balanceMain", headerName: "Баланс", resizable: true, filter: true, width: 140},
        { field: "site", headerName: "Вебсайт", resizable: true, filter: true, width: 140},
        { field: "top1", headerName: "Топ 1", resizable: true, filter: true, width: 140},
        { field: "top2", headerName: "Топ 2", resizable: true, filter: true, width: 140},
        { field: "top3", headerName: "Топ 3", resizable: true, filter: true, width: 140},
        { field: "smartCall", headerName: "Нажатие", resizable: true, filter: true, width: 150},
        { field: "smartApprove", headerName: "Подтверждение", resizable: true, width: 160, filter: true},
        { field: "swapMoney", headerName: "Списано", resizable: true, filter: true, width: 150},
    ]);

    const gridRef = useRef(); // Optional - for accessing Grid's API

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const defaultColDef = useMemo( ()=> ({
        sortable: true
    }));

    // Example of consuming Grid Event
    const cellClickedListener = useCallback( event => {
        console.log('cellClicked', event);
    }, []);

    return(
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container} style={{width: '100%', height: '100%', maxWidth: '100%'}}>
                <div style={{display: "flex", gap: '1rem'}}>
                    <h4>Установленный кошелек:</h4>
                    <h4>{wallet}</h4>
                </div>
                <Grid container spacing={3} style={{width: '100%', height: '100%', maxWidth: '100%'}} >

                    <div style={{width: '100%', height: '100%', maxWidth: '100%'}}>

                        {/* Example using Grid's API */}
                        {/*<button onClick={buttonListener}>Push Me</button>*/}

                        {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
                        <div className="ag-theme-alpine" style={{width: '100%', height: '100%', maxWidth: '100%'}}>

                            <AgGridReact
                                ref={gridRef} // Ref for accessing Grid's API

                                rowData={data} // Row Data for Rows

                                columnDefs={columnDefs} // Column Defs for Columns
                                defaultColDef={defaultColDef} // Default Column Properties

                                localeText={localeText}

                                animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                                rowSelection='multiple' // Options - allows click selection of rows

                                onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                            />
                        </div>
                    </div>


                </Grid>
            </Container>
        </main>
    )
})
export default TablePage;