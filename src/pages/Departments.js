import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { DepartmentCard } from "../components/DepartmentCard";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const Departments = () => {
    const axios = useAxiosPrivate();

    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        axios.get('department')
            .then((response) => {
                setDepartments(response.data);
            })
            .catch(error => {

            });

    }, []);

    const handleDelete = (id) => {
        axios.delete('department/' + id)
        .then(response => {
            console.log('Successfully deleted department');
            const newDepartments = departments.filter(dep => dep.DepartmentId != id);
            setDepartments(newDepartments);
        })
        .catch(error => console.log('Failed'));
    }

    return (
        <Container>
            <Grid container spacing={3}>
                {departments.map(department =>
                    <Grid item key={department.DepartmentId} xs={12} sm={6} md={3}>
                        <DepartmentCard department={department} handleDelete={handleDelete}/>
                    </Grid>
                )}
            </Grid>
        </Container>
    )
};