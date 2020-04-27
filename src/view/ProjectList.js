import React, { Component, forwardRef } from 'react';
import MaterialTable from 'material-table';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import projectApi from '../api/project';

class ProjectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            isLoading: true,
            user: {
                userId: this.props.location.state.userId,
                username: this.props.location.state.username
            },
            columns: [{
                title: 'Name',
                field: 'name',
            },
            {
                title: 'Creator',
                field: 'creator',
                editable: 'never'
            },
            ],
            data: [
                { name: 'Mehmet', creator: 'Baran', projectId: '1' },
                { name: 'Zerya Betül', creator: 'Baran', projectId: '2' },
            ],
        }

    }

    componentDidMount() {
        return projectApi.listAllProject(this.state.user.userId, (response) => {
            this.setState({ projects: response.data });
        });
    }

    useStyles = makeStyles((theme) => ({
        container: {
            marginTop: theme.spacing(9)
        },
    }));

    render() {
        const classes = this.useStyles

        const tableIcons = {
            Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
            Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
            Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
            Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
            DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
            Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
            Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
            Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
            FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
            LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
            NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
            PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
            ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
            Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
            SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
            ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
            ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
        };
        let { isLoading, Projects } = this.state;
        const ProjectList = [];

        if (Projects) {
            Projects.forEach(project => {
                this.setState(prevState => ({
                    projects: [{
                        "name": project.projectId,
                        "creator": this.props.location.state.username,
                        "projectId": '1'
                    }, ...prevState.myArray]
                }))
            });
        }

        debugger;
        return (
            <Container maxWidth="sm" className={classes.container} >
                <MaterialTable icons={tableIcons}
                    title="Projects"
                    columns={this.state.columns}
                    data={this.state.data}
                    options={
                        {
                            actionsColumnIndex: -1
                        }
                    }
                    onRowClick={
                        (
                            (event, selectedRow) => {
                                //fetchAPI
                                alert(selectedRow.projectId);
                            })
                    }
                    editable={
                        {
                            onRowAdd: (newData) =>
                                new Promise((resolve) => {
                                    setTimeout(() => {
                                        resolve();
                                        this.setState((prevState) => {
                                            const data = [...prevState.data];
                                            data.push(newData);
                                            //Creator should always be the login user.
                                            data[data.length - 1].creator = "George";
                                            return { ...prevState, data };
                                        });
                                    }, 600);
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve) => {
                                    setTimeout(() => {
                                        resolve();
                                        if (oldData) {
                                            this.setState((prevState) => {
                                                const data = [...prevState.data];
                                                data[data.indexOf(oldData)] = newData;
                                                return { ...prevState, data };
                                            });
                                        }
                                    }, 600);
                                }),
                            onRowDelete: (oldData) =>
                                new Promise((resolve) => {
                                    setTimeout(() => {
                                        resolve();
                                        this.setState((prevState) => {
                                            const data = [...prevState.data];
                                            data.splice(data.indexOf(oldData), 1);
                                            return { ...prevState, data };
                                        });
                                    }, 600);
                                }),
                        }
                    }
                />
            </Container>);
    }
};

export default ProjectList;